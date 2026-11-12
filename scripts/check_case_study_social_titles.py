"""Check static SEO titles; this is not a live hosting or search ranking test."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
LABELS = {
    "aegised": "AegisED",
    "evalforge": "EvalForge",
    "grid-flex": "Grid Flex",
    "edupredict": "EduPredict",
}


def main():
    seen = set()
    for slug, expected in LABELS.items():
        html = (ROOT / "projects" / f"{slug}.html").read_text(encoding="utf-8")
        title = re.search(r"<title>([^<]+)</title>", html)
        social = re.search(
            r'<meta\s+property="og:title"\s+content="([^"]+)"', html
        )
        assert title and social, f"Missing title metadata: {slug}"
        assert expected.lower() in title.group(1).lower(), slug
        assert expected.lower() in social.group(1).lower(), slug
        assert title.group(1) == social.group(1), f"Social title mismatch: {slug}"
        assert title.group(1) not in seen, f"Duplicate title: {slug}"
        seen.add(title.group(1))
    print(f"PASS: {len(seen)} case-study pages have distinct matching titles")


if __name__ == "__main__":
    main()
