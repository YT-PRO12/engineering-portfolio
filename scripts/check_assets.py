"""Verify recruiter-facing official PDF and repository-hosted public evidence."""
from pathlib import Path
from pypdf import PdfReader

ROOT=Path(__file__).resolve().parents[1]
path=ROOT/'public/resume/Yatharth_Goyal_Resume.pdf'
assert path.is_file() and path.stat().st_size>20_000, "Official PDF absent or too small"
pdf=PdfReader(path)
assert len(pdf.pages)==1,"Official resume must have exactly one page"
page=pdf.pages[0]
text=' '.join((page.extract_text() or '').split())
for required in ['Software Engineer','PROFESSIONAL EXPERIENCE','Grras Solutions','AegisED','EvalForge','Grid Flex','EduPredict AI','CGPA: 9.00/10.00','Cert Prep']:
    assert required in text, f"Missing official content: {required}"
assert 'RouteGuard' not in text
annotations=page.get('/Annots', [])
uris=[]
for annotation in annotations:
    action=annotation.get_object().get('/A', {})
    if action.get('/URI'):
        uris.append(str(action['/URI']))
assert len(uris)>=14, f"Expected clickable portfolio, projects and certificates, got {len(uris)}"
assert not any('drive.google.com/' in uri for uri in uris), "Private Google Drive link remains"
assert not any('evalforge-demo-free.onrender.com' in uri for uri in uris), "Unavailable EvalForge demo linked"
assert not any(uri.endswith('/EvalForge') for uri in uris), "Private EvalForge repository linked"
for filename in ['microsoft-ai102-course-prep.pdf','microsoft-ai900-course-prep.pdf','microsoft-linkedin-career-essentials-genai.pdf','google-simplilearn-generative-ai.pdf','ibm-python-101.pdf','analytics-vidhya-introduction-python.pdf','scaler-java-fundamentals.pdf']:
    assert (ROOT/'public/certificates'/filename).is_file(), f"Missing certificate: {filename}"
    assert any('/certificates/'+filename in uri for uri in uris), f"Certificate not linked: {filename}"
print(f'PASS official recruiter PDF: one page, {len(uris)} clickable public links, seven stored completion PDFs')
