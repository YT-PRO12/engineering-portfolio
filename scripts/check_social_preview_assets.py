"""Validate local social-preview assets without accessing live hosting."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ("aegised", "evalforge", "grid-flex", "edupredict")


def main():
    for slug in PROJECTS:
        page = (ROOT / "projects" / f"{slug}.html").read_text(encoding="utf-8")
        match = re.search(
            r'<meta\s+property="og:image"\s+content="(/assets/[^"]+)"\s*/>',
            page,
        )
        assert match, f"Missing local Open Graph preview: {slug}"
        asset = ROOT / "public" / match.group(1).lstrip("/")
        assert asset.is_file(), f"Missing social image for {slug}: {asset.name}"
        assert asset.stat().st_size > 0, f"Empty social image for {slug}"
    print(f"PASS: all {len(PROJECTS)} case-study preview assets exist")


if __name__ == "__main__":
    main()
