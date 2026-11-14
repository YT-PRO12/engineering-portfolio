"""Static HTML checks; not a live deployment or accessibility audit."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ("aegised", "evalforge", "grid-flex", "edupredict")


def main():
    for slug in PROJECTS:
        path = ROOT / "projects" / f"{slug}.html"
        content = path.read_text(encoding="utf-8")
        assert "<title>" in content, f"Missing page title: {slug}"
        description = re.search(
            r'<meta\s+name="description"\s+content="([^"]+)"', content, re.S
        )
        assert description, f"Missing description: {slug}"
        assert 30 <= len(description.group(1).strip()) <= 180, (
            f"Description length outside expected range: {slug}"
        )
        assert 'class="skip-link" href="#main"' in content, f"Missing skip link: {slug}"
        assert '<meta name="viewport"' in content, f"Missing responsive viewport: {slug}"
        assert 'property="og:image"' in content, f"Missing social preview image: {slug}"
        assert 'name="twitter:card"' in content, f"Missing social card metadata: {slug}"
        assert 'href="/assets/favicon.svg"' in content, f"Missing favicon: {slug}"
        assert '/resume/Yatharth_Goyal_Resume.pdf' in content, f"Missing noscript resume: {slug}"
    print(f"PASS: {len(PROJECTS)} case-study HTML entries have metadata and skip links")


if __name__ == "__main__":
    main()
