import requests
from bs4 import BeautifulSoup
import re
from utils.gemini_client import get_model
from models.script_request import URLScriptRequest, URLScriptResponse

def extract_text_from_url(url: str) -> str:
    resp = requests.get(url)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()
    return soup.get_text(separator="\n", strip=True)

def evaluate_content(generated_text: str, source_text: str):
    model = get_model()
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
    resp = model.generate_content(judge_prompt)
    evaluation_text = resp.text
    notes = re.findall(r":\s*(\d+(?:[.,]\d*)?)", evaluation_text)
    scores = [float(n.replace(",", ".")) for n in notes[:3]] if len(notes) >= 3 else [0, 0, 0]
    moyenne = sum(scores) / len(scores) if scores else 0
    return evaluation_text, moyenne

def generate_script_from_url_service(req: URLScriptRequest) -> URLScriptResponse:
    page_text = extract_text_from_url(req.url)
    essais, generated_text, score, evaluation = 0, "", 0, ""
    max_essais = 5
    model = get_model()

    while score < req.min_score and essais < max_essais:
        essais += 1
        prompt = f"""
Tu es un animateur radio. Crée {"un dialogue entre plusieurs intervenants" if "Dialogue" in req.mode else "un monologue immersif"} à partir de ce texte.
Chaque ligne doit être formatée : Nom : phrase
Utilise des balises comme [INTRO_MUSIC], [APPLAUSE], [OUTRO_MUSIC].

Texte source :
{page_text}"""
        ai_resp = model.generate_content(prompt)
        generated_text = ai_resp.text
        evaluation, score = evaluate_content(generated_text, page_text)

    if score < req.min_score:
        raise ValueError("Impossible de générer un contenu acceptable.")
    
    return URLScriptResponse(script=generated_text, evaluation=evaluation, score=score)
