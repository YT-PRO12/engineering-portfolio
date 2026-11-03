#!/usr/bin/env python3
"""Generate synchronized, one-page, editable resumes and their PDFs.

No third-party claims are inserted here without explicit evidence. CGPA is user-confirmed.
The generated files are public when committed. Never place private credentials in this script.
"""
from pathlib import Path
from subprocess import run
from tempfile import TemporaryDirectory
import shutil
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK, WD_TAB_ALIGNMENT
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'resume'
OUT.mkdir(parents=True, exist_ok=True)
NAVY = RGBColor(22, 48, 67)
GRAY = RGBColor(80, 92, 101)
BLACK = RGBColor(28, 35, 39)

def hyperlink(para, text, target):
    rid = para.part.relate_to(target, RT.HYPERLINK, is_external=True)
    h = OxmlElement('w:hyperlink'); h.set(qn('r:id'),rid)
    r = OxmlElement('w:r'); rp = OxmlElement('w:rPr')
    for tag, val in [('color','354F29'),('sz','20')]:
        el=OxmlElement('w:'+tag);el.set(qn('w:val'),val);rp.append(el)
    r.append(rp); t=OxmlElement('w:t'); t.text=text; r.append(t); h.append(r)
    para._p.append(h)

def border_under(para):
    ppr=para._p.get_or_add_pPr(); borders=OxmlElement('w:pBdr'); b=OxmlElement('w:bottom')
    for k,v in [('val','single'),('sz','5'),('color','AAB7BD'),('space','3')]:b.set(qn('w:'+k),v)
    borders.append(b);ppr.append(borders)

def make_resume(kind, filename):
    d=Document(); sec=d.sections[0]
    for style in d.styles:
        for border in list(style.element.iter(qn('w:pBdr'))):
            border.getparent().remove(border)
    sec.page_width=Inches(8.27); sec.page_height=Inches(11.69)
    sec.top_margin=Inches(.57); sec.bottom_margin=Inches(.55)
    sec.left_margin=Inches(.62); sec.right_margin=Inches(.62)
    normal=d.styles['Normal']; normal.font.name='Liberation Sans'; normal.font.size=Pt(10.5); normal.font.color.rgb=RGBColor(35,38,34)
    normal.paragraph_format.space_after=Pt(3)
    normal.paragraph_format.line_spacing=1.08
    for name in ['Title','Heading 1','Heading 2']:
        d.styles[name].font.name='Liberation Sans'; d.styles[name].font.color.rgb=RGBColor(0,0,0)
    def para(text='',before=0,after=3,keep=False,style=None):
        p=d.add_paragraph(style=style); f=p.paragraph_format
        f.space_before=Pt(before); f.space_after=Pt(after); f.keep_with_next=keep
        if text:p.add_run(text)
        return p
    def heading(text):
        p=para(text.upper(),before=12,after=6,keep=True,style='Heading 1')
        for r in p.runs:r.bold=True; r.font.size=Pt(10)
        border_under(p)
    p=para('Yatharth Goyal',after=2,keep=True,style='Title')
    for r in p.runs:r.font.size=Pt(26);r.bold=True
    role='SOFTWARE ENGINEER  |  JAVA · FULL STACK · BACKEND SYSTEMS' if kind=='sde' else 'AI / ML  |  MODEL EVALUATION · COMPUTER VISION · OPTIMIZATION'
    p=para(role,after=7,keep=True)
    for r in p.runs:r.font.size=Pt(9);r.bold=True;r.font.color.rgb=GRAY
    p=para(after=2,keep=True);p.add_run('Jaipur, India  |  ')
    hyperlink(p,'yatharthgoyal657@gmail.com','mailto:yatharthgoyal657@gmail.com')
    p=para(after=1,keep=True)
    for i,(label,url) in enumerate([('GitHub','https://github.com/YT-PRO12'),('LinkedIn','https://www.linkedin.com/in/yatharth-goyal-ab0b8326/'),('Java DSA','https://github.com/YT-PRO12/DSA-Java-Interview-Prep'),('Portfolio','https://yatharth-engineering-portfolio.vercel.app/')]):
        if i:p.add_run('   /   ')
        hyperlink(p,label,url)
    heading('Technical Skills')
    skills={
      'sde': [('Languages','Java, JavaScript, Python, SQL'),('Backend','Node.js, Express, PostgreSQL, Redis/BullMQ, REST APIs, RBAC'),('Frontend & Delivery','React, Vite, JavaScript, Git, Docker, CI, Playwright'),('Foundations','Data structures and algorithms; 16-topic Java practice roadmap')],
      'ml': [('Languages','Python, Java, SQL, JavaScript'),('ML and data','scikit-learn, YOLO, pandas, NumPy, SciPy/HiGHS, MILP'),('Systems','FastAPI, Express, PostgreSQL/PostGIS, Redis/BullMQ, React'),('Validation','pytest, Git, Docker; data audits, model evaluation; Java DSA')]
    }
    for label,value in skills[kind]:
        p=para(after=3);p.add_run(label+'  ').bold=True;p.add_run(value)
    heading('Selected Projects & Engineering Contributions')
    bullets={
      'sde': {
       'aegised': ['Built React-driven intake, doctor/bed assignment and discharge flows backed by Express APIs, role checks and audit trails.','Protected shared doctor and bed allocations with PostgreSQL transactions, row-level locks and rollback handling for competing requests.'],
       'evalforge': ['Designed durable grading jobs with PostgreSQL persistence, BullMQ workers and idempotent processing; linked rubric scores to exact answer evidence.','Documented 15/15 backend and 7/7 evaluator local checks; hosted CI and full browser acceptance remain pending.'],
       'grid': ['Built SciPy/HiGHS energy scheduling with cost, balanced and carbon objectives; independently audited power balance, battery state and deadlines.','Documented 52/52 local regression tests on synthetic scenarios; AWS SAM templates are prepared, not deployed.'],
       'edupredict': ['Built React/Vite student dashboards and assessment workflows backed by FastAPI endpoints and persistent student history.','Added server-generated assessment IDs and student-scoped intervention updates; database regressions cover isolation and rollback.']},
      'ml': {
       'aegised': ['Integrated a FastAPI/scikit-learn triage-support service with human review and recorded overrides in an emergency-operations platform.','Documented macro-F1 of 0.7893 on 900 held-out synthetic cases; this is non-clinical evaluation, not clinical validation.'],
       'evalforge': ['Built rubric-grounded evaluation with exact response spans, output validation and instructor overrides; separated workers from durable PostgreSQL jobs.','Documented 7/7 evaluator and 15/15 backend local checks; no externally validated scoring accuracy or public deployment is claimed.'],
       'grid': ['Formulated synthetic energy scheduling as a SciPy/HiGHS MILP with cost, balanced and carbon objectives; added independent constraint audits.','Documented 52/52 local tests and scenario stress analysis; results are modeled, not measured industrial savings. AWS SAM is not deployed.'],
       'edupredict': ['Implemented an education risk-review interface with student assessment history, explanation views and intervention tracking.','Connected React workflows to FastAPI services and SQLite records; risk signals are decision support, not validated real-world outcomes.']}}
    order=['aegised','evalforge','grid','edupredict'] if kind=='sde' else ['aegised','edupredict','evalforge','grid']
    titles={'aegised':'AegisED','evalforge':'EvalForge','grid':'Grid Flex','edupredict':'EduPredict AI'}
    status={'aegised':'FULL-STACK · PUBLIC SOURCE','evalforge':'PRIVATE · RELEASE PENDING','grid':'LOCAL PROTOTYPE','edupredict':'PUBLIC SOURCE · DEMO DOCUMENTED'}
    for i,key in enumerate(order):
        p=para(before=8 if i else 0,after=3,keep=True,style='Heading 2')
        p.paragraph_format.tab_stops.add_tab_stop(Inches(7.03),WD_TAB_ALIGNMENT.RIGHT)
        r=p.add_run(titles[key]);r.bold=True;r.font.size=Pt(12)
        r=p.add_run('\t'+status[key]);r.font.size=Pt(8);r.font.color.rgb=GRAY
        for b in bullets[kind][key]:
            p=para(after=3);p.paragraph_format.left_indent=Inches(.12);p.paragraph_format.first_line_indent=Inches(-.12);p.paragraph_format.keep_together=True
            p.add_run('• '+b)
    heading('Education & Certifications')
    p=para(after=3,keep=True);p.add_run('JECRC  |  B.Tech Information Technology').bold=True
    p=para('Expected graduation: 2028  |  CGPA: 9.00/10.00',after=0)
    d.core_properties.title='Yatharth Goyal '+('SDE Backend' if kind=='sde' else 'AI ML')+' Resume'
    d.core_properties.subject='Engineering projects and technical skills'
    d.core_properties.author='Yatharth Goyal'
    dest=OUT/filename;d.save(dest);return dest


def main():
    docs=[make_resume('sde','Yatharth_Goyal_Resume.docx')]
    libreoffice=shutil.which('libreoffice') or shutil.which('soffice')
    if not libreoffice: raise RuntimeError('LibreOffice is required to produce matching PDFs')
    with TemporaryDirectory(prefix='yg-pdf-') as temp:
        cmd=[libreoffice,'-env:UserInstallation=file://'+str(Path(temp)/'lo'), '--headless','--convert-to','pdf', '--outdir',str(OUT),*[str(p) for p in docs]]
        result=run(cmd,capture_output=True,text=True,timeout=120)
        if result.returncode: raise RuntimeError(f'PDF export failed: {result.stdout} {result.stderr}')
    for p in docs:
        pdf=p.with_suffix('.pdf')
        if not pdf.is_file() or pdf.stat().st_size<5000:raise RuntimeError('Missing PDF for '+str(p))
        print(p.relative_to(ROOT),p.stat().st_size,pdf.stat().st_size)

if __name__=='__main__':main()
