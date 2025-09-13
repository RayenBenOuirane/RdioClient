import streamlit as st
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import re
import time
import base64
import pandas as pd

# ---------------------- CONFIG ----------------------
GENAI_API_KEY = "AIzaSyAv289f8cR2vgVQqb9-YzORGaY3vDVurYg"  # Remplace par ta clé
DID_API_KEY = "YmVuaGVuZGEud2FsaWRAZ21haWwuY29t:P-I6fGzKiTFaZTthwyfa0"  # clé D-ID


# Configuration Gemini
genai.configure(api_key=GENAI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash-latest")

# Encodage Base64 clé D-ID pour Basic Auth (PAS de ':' supplémentaire)
DID_API_KEY_B64 = base64.b64encode(DID_API_KEY.encode()).decode()
DID_HEADERS = {
    "Authorization": f"Basic {DID_API_KEY_B64}",
    "Content-Type": "application/json"
}

# ---------------------- FUNCTIONS ----------------------
def evaluate_content(generated_text, source_text):
    """Évalue le texte généré avec Gemini."""
    judge_prompt = f"""
Tu es un critique expert. Évalue le contenu suivant selon 3 critères :
1. Clarté
2. Créativité
3. Pertinence par rapport au texte source

Format attendu :
- Clarté : note/10 + justification
- Créativité : note/10 + justification
- Pertinence : note/10 + justification

Contenu généré :
{generated_text}

Texte source :
{source_text}
"""
    response = model.generate_content(judge_prompt)
    notes = re.findall(r":\s*(\d+(?:[.,]\d*)?)", response.text)
    if len(notes) >= 3:
        scores = [float(n.replace(",", ".")) for n in notes[:3]]
        moyenne = sum(scores) / 3
    else:
        moyenne = 0
    return response.text, moyenne


def generate_did_video(text, image_url):
    """Génère une vidéo avatar avec D-ID."""
    # Vérification de l'URL de l'avatar
    try:
        img_resp = requests.head(image_url, timeout=5)
        if img_resp.status_code != 200:
            raise Exception(f"L'URL d'avatar est inaccessible : {img_resp.status_code}")
        if not any(image_url.lower().endswith(ext) for ext in (".png", ".jpg", ".jpeg")):
            raise Exception("L'URL d'avatar doit être un lien direct vers un PNG ou JPG.")
    except Exception as err:
        raise Exception(f"Erreur avatar : {err}")

    payload = {
        "script": {
            "type": "text",
            "subtitles": False,
            "provider": {
                "type": "microsoft",
                "voice_id": "fr-FR-DeniseNeural"
            },
            "ssml": False,
            "input": text
        },
        "source_url": image_url,
        "config": {"fluent": False}
    }

    r = requests.post("https://api.d-id.com/talks", headers=DID_HEADERS, json=payload)

    if r.status_code not in (200, 201):
        raise Exception(f"Erreur création vidéo D-ID ({r.status_code}): {r.text}")

    resp_json = r.json()
    talk_id = resp_json.get("id")
    if not talk_id:
        raise Exception(f"Aucun ID de vidéo renvoyé : {resp_json}")

    # Attente du rendu
    while True:
        time.sleep(3)
        status_resp = requests.get(f"https://api.d-id.com/talks/{talk_id}", headers=DID_HEADERS)
        if status_resp.status_code != 200:
            raise Exception(f"Erreur récupération statut ({status_resp.status_code}): {status_resp.text}")

        status_json = status_resp.json()
        if status_json.get("status") == "done":
            return status_json["result_url"]
        elif status_json.get("status") == "error":
            raise Exception(f"Erreur vidéo : {status_json}")


# ---------------------- STREAMLIT UI ----------------------
st.set_page_config(page_title="🎙️ Radio IA + Avatar D-ID", layout="centered")
st.title("🎙️ Radio IA avec Avatar D-ID")

url = st.text_input("🌐 URL du site web", placeholder="https://exemple.com")
avatar_url = st.text_input(
    "🖼️ URL de l’avatar (PNG/JPG direct)",
    placeholder="https://raw.githubusercontent.com/d-id-samples/avatars/main/woman1.png"
)
mode = st.selectbox("🎭 Format", ["Monologue", "Dialogue entre intervenants"])

if st.button("📄 Générer et créer vidéo"):
    try:
        if not avatar_url or not avatar_url.lower().endswith((".png", ".jpg", ".jpeg")):
            st.error("🚫 Veuillez fournir une URL d’avatar valide (terminant par .png, .jpg ou .jpeg).")
        elif not url:
            st.error("🚫 Veuillez fournir l'URL du site web.")
        else:
            # Extraction du texte du site
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')
            for tag in soup(["script", "style", "noscript"]):
                tag.decompose()
            page_text = soup.get_text(separator="\n", strip=True)
            st.success("✅ Contenu extrait.")
            st.text_area("📝 Texte brut :", value=page_text, height=300)

            # Téléchargement CSV
            csv_data = pd.DataFrame([{"Texte extrait": page_text}])
            st.download_button(
                label="📥 Télécharger le texte en CSV",
                data=csv_data.to_csv(index=False).encode("utf-8"),
                file_name="texte_extrait.csv",
                mime="text/csv"
            )

            # Génération et validation IA
            valid_score = 0
            essais = 0
            max_essais = 5

            while valid_score < 7 and essais < max_essais:
                essais += 1
                st.info(f"🌀 Génération IA - Tentative {essais}...")
                prompt = f"""
Tu es un animateur radio. Crée {"un dialogue entre plusieurs intervenants" if "Dialogue" in mode else "un monologue immersif"} à partir de ce texte.
Chaque ligne doit être formatée : Nom : phrase
Utilise des balises comme [INTRO_MUSIC], [APPLAUSE], [OUTRO_MUSIC].

Texte source :
{page_text}"""
                ai_response = model.generate_content(prompt)
                generated_text = ai_response.text
                evaluation, valid_score = evaluate_content(generated_text, page_text)

            if valid_score >= 7:
                st.success(f"✅ Contenu validé (score moyen {valid_score:.1f}/10)")
                st.subheader("📝 Contenu IA généré")
                st.text_area("Contenu généré :", value=generated_text, height=500)

                st.subheader("📋 Évaluation IA")
                st.text(evaluation)

                # Génération vidéo D-ID
                st.info("🎬 Création de la vidéo avatar...")
                video_url = generate_did_video(generated_text, avatar_url)
                st.video(video_url)
                st.success("✔️ Vidéo prête !")
            else:
                st.error("❌ Impossible de générer un contenu acceptable après plusieurs tentatives.")

    except Exception as e:
        st.error(f"🚫 Erreur : {e}")
