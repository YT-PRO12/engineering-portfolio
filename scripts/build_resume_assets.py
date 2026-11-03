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

PROJECTS = {
 'aegised': {
  'title':'AegisED | Emergency Operations & Decision Support',
  'status':'LIVE DEMO',
  'stack':'React · Express · PostgreSQL · FastAPI · scikit-learn · Render',
  'links': [('SOURCE','https://github.com/YT-PRO12/AegisED'),('DEMO','https://careflow-app.onrender.com')],
  'sde': [
   'Engineered transactional intake, doctor/bed allocation, treatment and discharge flows; used PostgreSQL row locks and rollback to protect resource consistency under concurrent requests.',
   'Implemented backend RBAC, session safeguards and audit logging; connected an Express gateway to a human-reviewed FastAPI ML service with override tracking.',
   'Compared four triage model candidates; documented 0.789 macro-F1 on 900 held-out synthetic cases (non-clinical), alongside API and Python validation.'
  ],
  'ml': [
   'Integrated a FastAPI/scikit-learn triage-support service into a React/Express emergency operations platform; recommendations require human review and allow recorded overrides.',
   'Compared four candidate models and evaluated on 900 held-out synthetic scenarios: macro-F1 0.789; these results are not clinical validation.',
   'Implemented PostgreSQL-backed workflows with row-level locking, authorization and auditable patient/resource transitions.'
  ]
 },
 'evalforge': {
  'title':'EvalForge | Evidence-Based Assessment Intelligence',
  'status':'PRIVATE · NOT DEPLOYED',
  'stack':'React · Express · PostgreSQL · Redis/BullMQ · FastAPI · Docker',
  'links':[],
  'sde': [
   'Developed versioned assessment rubrics, criterion-linked evidence, instructor approvals/overrides, appeals and organization-scoped access checks.',
   'Designed durable asynchronous grading: PostgreSQL job persistence, Redis/BullMQ dispatch, idempotent writes, bounded retries and dead-letter recovery.',
   'Documented 15/15 backend and 7/7 evaluator tests in local checks; production deployment, hosted CI and full real-service E2E remain pending.'
  ],
  'ml': [
   'Built a rubric-based evaluation workflow that anchors positive scores to exact response evidence spans and keeps instructor review in control.',
   'Separated Express orchestration, PostgreSQL durable jobs, BullMQ workers and the Python/FastAPI evaluator; guarded invalid or incomplete evaluator outputs.',
   'Documented 15/15 backend tests and 7/7 evaluator tests locally; no public deployment or externally validated scoring accuracy is claimed.'
  ]
 },
 'grid': {
  'title':'Grid Flex | Industrial Energy Scheduling Optimizer',
  'status':'LOCAL PROTOTYPE',
  'stack':'Python · SciPy/HiGHS · MILP · JavaScript · AWS SAM',
  'links': [('SOURCE','https://github.com/YT-PRO12/Grid-Flex')],
  'sde': [
   'Formulated a mixed-integer scheduling model for five synthetic production jobs, solar supply, battery dispatch and grid limits; computed cost, balanced and carbon-priority plans.',
   'Implemented independent post-solve audits for power balance, state-of-charge, deadlines and reported costs; added outage and solar-stress analysis.',
   'Passed 52/52 documented local regression tests and desktop/mobile UI checks; AWS Lambda/API Gateway/DynamoDB integration is templated, not deployed.'
  ],
  'ml': [
   'Modeled synthetic industrial energy scheduling as a mixed-integer linear program using SciPy/HiGHS across cost, balanced and carbon objectives.',
   'Developed independent constraint verification and deterministic solar-shortfall, grid-outage and battery-wear sensitivity analyses.',
   'Documented 52/52 passing local regression tests; results are modeled scenarios, not measured emissions or deployed AWS outcomes.'
  ]
 },
 'routeguard': {
  'title':'RouteGuard 2.0 | Road-Hazard Intelligence',
  'status':'IN PROGRESS',
  'stack':'Python · YOLO · React/Leaflet · Express · PostGIS · TomTom',
  'links':[],
  'sde': [
   'Developing hazard-informed route comparison with a React/Leaflet driver interface, Express APIs, PostGIS and TomTom routing; conducting dataset-label audits for road-damage detection.',
   'Research target (not achieved): ≥95% precision and recall per severe-hazard class on independent test data; experiments are not production safety claims.'
  ],
  'ml': [
   'Evaluating YOLO road-damage models with dataset-integrity checks, empty-label reviews, split-leakage audits and reproducible experiments.',
   'Integrating experimental computer vision with PostGIS-backed hazard intelligence and route comparison; research target ≥95% severe-hazard precision and recall remains unmet.'
  ]
 }
}

SKILLS = {
 'sde':[
  ('Languages','Java, JavaScript, Python, SQL, HTML, CSS'),
  ('Frameworks & Libraries','React, Vite, Node.js, Express.js, FastAPI, REST APIs'),
  ('Databases','PostgreSQL, PostGIS, SQLite, Redis / BullMQ'),
  ('Cloud & Infrastructure','Docker, Render, Neon, AWS SAM (deployment templates)'),
  ('Developer Tools','Git, GitHub Actions, Playwright, pytest; Java DSA: 16-topic practice repository'),
  ('Machine Learning & AI','scikit-learn, YOLO, pandas, NumPy, SciPy / HiGHS')
 ],
 'ml':[
  ('Languages','Java, Python, JavaScript, SQL, HTML, CSS'),
  ('Frameworks & Libraries','FastAPI, scikit-learn, React, Express.js, REST APIs'),
  ('Databases','PostgreSQL, PostGIS, SQLite, Redis / BullMQ'),
  ('Cloud & Infrastructure','Docker, Render, Neon, AWS SAM (deployment templates)'),
  ('Developer Tools','Git, GitHub Actions, pytest, Playwright; Java DSA: 16-topic repository'),
  ('Machine Learning & AI','YOLO, computer vision evaluation, pandas, NumPy, SciPy / HiGHS, MILP')
 ]
}

def hyperlink(para, text, target):
    rid = para.part.relate_to(target, RT.HYPERLINK, is_external=True)
    h = OxmlElement('w:hyperlink'); h.set(qn('r:id'),rid)
    r = OxmlElement('w:r'); rp = OxmlElement('w:rPr')
    for tag, val in [('color','16416B'),('sz','16')]:
        el=OxmlElement('w:'+tag);el.set(qn('w:val'),val);rp.append(el)
    r.append(rp); t=OxmlElement('w:t'); t.text=text; r.append(t); h.append(r)
    para._p.append(h)

def border_under(para):
    ppr=para._p.get_or_add_pPr(); borders=OxmlElement('w:pBdr'); b=OxmlElement('w:bottom')
    for k,v in [('val','single'),('sz','5'),('color','AAB7BD'),('space','3')]:b.set(qn('w:'+k),v)
    borders.append(b);ppr.append(borders)

def make_resume(kind, filename):
    d=Document(); s=d.sections[0]
    s.page_width=Inches(8.27);s.page_height=Inches(11.69)
    s.top_margin=Inches(.55);s.bottom_margin=Inches(.52)
    s.left_margin=Inches(.67);s.right_margin=Inches(.67)
    s.header_distance=Inches(.3);s.footer_distance=Inches(.3)
    styles=d.styles
    normal=styles['Normal'];normal.font.name='Inter';normal.font.size=Pt(9.15);normal.font.color.rgb=BLACK
    normal.paragraph_format.space_before=Pt(0);normal.paragraph_format.space_after=Pt(0);normal.paragraph_format.line_spacing=1.08
    def para(text='',before=0,after=0,keep=False):
        p=d.add_paragraph();p.paragraph_format.space_before=Pt(before);p.paragraph_format.space_after=Pt(after)
        p.paragraph_format.keep_with_next=keep
        if text:p.add_run(text)
        return p
    def heading(text):
        p=para(before=9.0,after=5.2,keep=True)
        r=p.add_run(text.upper());r.bold=True;r.font.name='Inter';r.font.size=Pt(9.2);r.font.color.rgb=NAVY
        border_under(p)
        return p
    p=para(after=1.8,keep=True);p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    r=p.add_run('YATHARTH GOYAL');r.bold=True;r.font.size=Pt(18.5);r.font.color.rgb=NAVY
    role='SOFTWARE ENGINEERING · BACKEND SYSTEMS · JAVA' if kind=='sde' else 'APPLIED AI · COMPUTER VISION · ML ENGINEERING'
    p=para(after=3.2,keep=True);p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    r=p.add_run(role);r.font.size=Pt(8.0);r.font.bold=True;r.font.color.rgb=GRAY
    p=para(after=3.5,keep=True);p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    p.add_run('Jaipur, Rajasthan, India   |   ')
    hyperlink(p,'yatharthgoyal657@gmail.com','mailto:yatharthgoyal657@gmail.com')
    p.add_run('   |   ');hyperlink(p,'GitHub','https://github.com/YT-PRO12')
    p.add_run('   |   ');hyperlink(p,'LinkedIn','https://www.linkedin.com/in/yatharth-goyal-ab0b8326/')
    p.add_run('   |   ');hyperlink(p,'LeetCode','https://leetcode.com/u/yatharth_goyal/')
    p.add_run('   |   ');hyperlink(p,'Portfolio code','https://github.com/YT-PRO12/engineering-portfolio')
    heading('Technical Skills')
    for label, value in SKILLS[kind]:
        p=para(after=2.2)
        r=p.add_run(label+'  ');r.bold=True;r.font.size=Pt(8.95)
        r=p.add_run(value);r.font.size=Pt(8.95)
    heading('Selected Projects & Engineering Contributions')
    order=['aegised','evalforge','grid','routeguard'] if kind=='sde' else ['routeguard','aegised','evalforge','grid']
    for idx,key in enumerate(order):
        info=PROJECTS[key]
        p=para(before=4.6 if idx else 0,after=1.4,keep=True)
        title=p.add_run(info['title']);title.bold=True;title.font.color.rgb=NAVY;title.font.size=Pt(9.2)
        p.add_run('   ·   ')
        st=p.add_run(info['status']);st.bold=True;st.font.size=Pt(7.4);st.font.color.rgb=GRAY
        for label, url in info['links']:
            p.add_run('   |   ');hyperlink(p,label,url)
        p=para(after=1.8,keep=True)
        st=p.add_run(info['stack']);st.italic=True;st.font.size=Pt(8.1);st.font.color.rgb=GRAY
        for i,b in enumerate(info[kind]):
            p=para(after=2.1)
            p.paragraph_format.left_indent=Inches(.13);p.paragraph_format.first_line_indent=Inches(-.13)
            p.paragraph_format.keep_together=True
            r=p.add_run('•  '+b);r.font.size=Pt(8.85)
    heading('Education & Certifications')
    p=para(after=2.1,keep=True)
    r=p.add_run('Bachelor of Technology (B.Tech), Information Technology');r.bold=True;r.font.size=Pt(9.05)
    r=p.add_run('   |   JECRC, Jaipur   |   Expected 2028');r.font.size=Pt(8.85)
    p=para(after=2.3,keep=True)
    r=p.add_run('CGPA: 9.00/10.00');r.bold=True;r.font.size=Pt(9.1);r.font.color.rgb=NAVY
    p=para(after=0)
    r=p.add_run('Certifications  ');r.bold=True;r.font.size=Pt(8.75)
    r=p.add_run('Credentials withheld pending issuer-issued verification; no exam passes claimed.')
    r.font.size=Pt(8.6);r.font.color.rgb=GRAY
    d.core_properties.title=f'Yatharth Goyal | {"Software Engineering" if kind=="sde" else "AI/ML"} Resume'
    d.core_properties.subject='User-confirmed CGPA: 9.00/10.00. Certifications evidence pending.'
    d.core_properties.author='Yatharth Goyal'
    dest=OUT/filename
    d.save(dest)
    return dest


def main():
    docs=[make_resume('sde','Yatharth_Goyal_Resume.docx'),make_resume('ml','Yatharth_Goyal_AI_ML_Resume.docx')]
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
