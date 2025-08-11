import streamlit as st
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from gtts import gTTS
import re
import tempfile
import os
import time
from pydub import AudioSegment
from pydub.utils import which
import base64
import pandas as pd  # 📌 Import ajouté pour gérer le CSV

# --- Vérification de FFMPEG ---
AudioSegment.converter = which("ffmpeg")
AudioSegment.ffprobe = which("ffprobe")
if not AudioSegment.converter or not AudioSegment.ffprobe:
    st.warning("⚠️ FFMPEG requis. Télécharge-le depuis https://ffmpeg.org/download.html et ajoute-le au PATH.")

# --- Configuration Gemini ---
genai.configure(api_key="AIzaSyAv289f8cR2vgVQqb9-YzORGaY3vDVurYg")  # Remplace par ta vraie clé
model = genai.GenerativeModel("gemini-1.5-flash-latest")

# --- Sons spéciaux ---
sound_map = {
    "[INTRO_MUSIC]": "intro.mp3",
    "[APPLAUSE]": "applause.mp3",
    "[OUTRO_MUSIC]": "outro.mp3"
}

# --- Voix différentes avec gTTS ---
voice_accents = ["fr", "fr-ca", "fr", "fr", "fr-ca"]
speaker_voice_map = {}

def get_gtts_voice_for_speaker(speaker_name):
    if speaker_name not in speaker_voice_map:
        idx = len(speaker_voice_map) % len(voice_accents)
        speaker_voice_map[speaker_name] = voice_accents[idx]
    return speaker_voice_map[speaker_name]

def synthesize_with_gtts(text, lang_code):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tts = gTTS(text=text, lang=lang_code)
        tts.save(tmp.name)
        tmp_path = tmp.name
    time.sleep(1)
    audio = AudioSegment.from_file(tmp_path)
    os.remove(tmp_path)
    return audio

def load_sound(filepath):
    return AudioSegment.from_file(filepath) if os.path.exists(filepath) else AudioSegment.silent(duration=0)

def process_and_concatenate_audio(text):
    lines = text.splitlines()
    combined = AudioSegment.silent(duration=500)
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line in sound_map:
            combined += load_sound(sound_map[line]) + AudioSegment.silent(duration=300)
            continue
        match = re.match(r"(.+?):\s*(.+)", line)
        if match:
            speaker = match.group(1).strip()
            speech = match.group(2).strip()
            lang_code = get_gtts_voice_for_speaker(speaker)
        else:
            speaker = "Narrateur"
            speech = line
            lang_code = "fr"
        try:
            audio = synthesize_with_gtts(speech, lang_code)
            combined += audio + AudioSegment.silent(duration=400)
        except Exception as e:
            st.warning(f"Erreur synthèse pour « {speech[:30]}... »: {e}")
    final_audio = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    combined.export(final_audio.name, format="mp3")
    return final_audio.name

def evaluate_content(generated_text, source_text):
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
        moyenne = 0  # Si le format ne contient pas de notes valides
    return response.text, moyenne

# --- Interface Streamlit ---
st.set_page_config(page_title="🎙️ Radio IA (LLM Judge)", layout="centered")
st.title("🎙️ Radio IA avec évaluation automatique")

url = st.text_input("🌐 URL du site web", placeholder="https://exemple.com")
mode = st.selectbox("🎭 Format", ["Monologue", "Dialogue entre intervenants"])

if st.button("📄 Générer et jouer"):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        for tag in soup(["script", "style", "noscript"]):
            tag.decompose()
        page_text = soup.get_text(separator="\n", strip=True)
        st.success("✅ Contenu extrait.")
        st.text_area("📝 Texte brut :", value=page_text, height=300)

        # 📥 Bouton de téléchargement CSV
        csv_data = pd.DataFrame([{"Texte extrait": page_text}])
        csv_bytes = csv_data.to_csv(index=False).encode("utf-8")
        st.download_button(
            label="📥 Télécharger le texte en CSV",
            data=csv_bytes,
            file_name="texte_extrait.csv",
            mime="text/csv"
        )

        valid_score = 0
        essais = 0
        max_essais = 5  # limite de sécurité pour éviter une boucle infinie

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

            st.info("🔊 Synthèse audio en cours...")
            audio_path = process_and_concatenate_audio(generated_text)
            with open(audio_path, 'rb') as f:
                audio_bytes = f.read()
                b64_audio = base64.b64encode(audio_bytes).decode()
                audio_tag = f"""
<audio controls autoplay>
    <source src="data:audio/mp3;base64,{b64_audio}" type="audio/mp3">
    Votre navigateur ne supporte pas l'audio.
</audio>
"""
                st.markdown(audio_tag, unsafe_allow_html=True)
            os.remove(audio_path)
            st.success("✔️ Lecture terminée.")
        else:
            st.error("❌ Impossible de générer un contenu acceptable après plusieurs tentatives.")

    except Exception as e:
        st.error(f"🚫 Erreur : {e}")
