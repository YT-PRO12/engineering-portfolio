"""Update the official recruiter PDF to open safe, public project demos.

Preserve the uploaded one-page layout. No rewriting experience or certifications.
The two new links are explicitly labeled synthetic guest previews (not production apps).
"""
from pathlib import Path
import fitz

ROOT=Path(__file__).resolve().parents[1]
path=ROOT/"public/resume/Yatharth_Goyal_Resume.pdf"
document=fitz.open(path)
assert len(document)==1,"Official resume must remain one page"
page=document[0]
items=[
    (fitz.Rect(48.2,328.85,242.7,339.95),
     "Guest demo (no login): AegisED",
     "https://yatharth-engineering-portfolio.vercel.app/demos/aegised.html"),
    (fitz.Rect(48.2,432.25,348.0,443.4),
     "Guest demo (no login): EvalForge",
     "https://yatharth-engineering-portfolio.vercel.app/demos/evalforge.html"),
]
existing=page.get_text()
assert "Case study: AegisED architecture" in existing and "Case study: EvalForge system design" in existing, "Expected original reviewed resume not found"
for rect,label,url in items:
    for link in list(page.get_links()):
        if fitz.Rect(link["from"]).intersects(rect):
            page.delete_link(link)
    page.add_redact_annot(rect,fill=(1,1,1))
page.apply_redactions(images=0,graphics=0,text=0)
for rect,label,url in items:
    assert fitz.get_text_length(label,fontsize=8,fontname="helv")<rect.width
    page.insert_text((rect.x0+0.15,rect.y1-2.3),label,fontsize=8,fontname="helv",color=(0.11,0.27,0.40))
    page.insert_link({"kind":fitz.LINK_URI,"from":rect,"uri":url})
document.set_metadata({**document.metadata,"title":"Yatharth Goyal - Software Engineer Resume | Interactive Demos"})
staging=path.with_name("resume_guest_review.pdf")
document.save(staging,garbage=4,deflate=True)
document.close()
check=fitz.open(staging)
urls=[v.get("uri","") for v in check[0].get_links()]
text=check[0].get_text()
assert len(check)==1 and len(urls)>=18
for exact in ["https://yatharth-engineering-portfolio.vercel.app/demos/aegised.html",
              "https://yatharth-engineering-portfolio.vercel.app/demos/evalforge.html",
              "https://chimerical-praline-ff8e07.netlify.app/",
              "https://edu-predict-ai-64gq.vercel.app/"]:
    assert exact in urls, f"Missing demo {exact}"
for mark in ["Guest demo (no login): AegisED","Guest demo (no login): EvalForge","9.00/10.00"]:
    assert mark in text
assert not any("drive.google.com" in u for u in urls)
check.close()
staging.replace(path)
print(f"PASS: {len(urls)} clickable links, exactly one page, 4 accessible demo destinations. Saved {path}")
