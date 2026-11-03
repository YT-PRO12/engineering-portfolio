"""Fail if resume page count, factual boundaries or editable structure regress."""
from pathlib import Path
from pypdf import PdfReader
from docx import Document
ROOT=Path(__file__).resolve().parents[1]
for name in ['Yatharth_Goyal_Resume','Yatharth_Goyal_AI_ML_Resume']:
    pdf=PdfReader(ROOT/'public/resume'/f'{name}.pdf')
    assert len(pdf.pages)==1, f'{name}: expected one page'
    text=' '.join(pdf.pages[0].extract_text().split())
    for required in ['AegisED','EvalForge','Grid Flex','RouteGuard','JECRC','Information Technology','2028','CGPA: 9.00/10.00','95%+','Target not achieved.']:
        assert required in text, (name,required)
    for forbidden in ['8.96','AI-900','AI-102','LIVE DEMO','Credentials withheld','WORK EXPERIENCE']:
        assert forbidden not in text, (name,forbidden)
    assert text.index('EDUCATION & CERTIFICATIONS')>text.index('RouteGuard')
    links=[a.get_object().get('/A',{}).get('/URI') for a in pdf.pages[0].get('/Annots',[])]
    assert len([u for u in links if u])>=5
    doc=Document(ROOT/'public/resume'/f'{name}.docx')
    assert not doc.tables and len(doc.paragraphs)>20
    assert doc.styles['Normal'].font.size.pt>=10
    assert doc.paragraphs[-1].text.endswith('CGPA: 9.00/10.00')
    print(f'PASS {name}: 1 page, searchable text, {len(links)} hyperlinks, editable single column, factual boundaries')
