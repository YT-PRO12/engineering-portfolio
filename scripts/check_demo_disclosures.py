"""Static guest-demo disclosure checks, not a live deployment test."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def check(path):
    html = path.read_text(encoding="utf-8").lower()
    required = (
        "read-only interactive product walkthrough",
        "illustrative synthetic records",
        "not the authenticated production app",
        "no backend operations are performed",
        "guest access: sample ui only",
    )
    for phrase in required:
        assert phrase in html, f"{path.name}: missing {phrase!r}"


def main():
    for name in ("aegised.html", "evalforge.html"):
        file = ROOT / "public" / "demos" / name
        assert file.is_file(), f"Guest preview missing: {file}"
        check(file)
    print("PASS: two guest demos disclose synthetic, read-only access")


if __name__ == "__main__":
    main()
