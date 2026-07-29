"""Generate PWA icons and OG image for Cadence Crate."""
from PIL import Image, ImageDraw, ImageFont
import math, os

PUBLIC = r"C:\Users\ADMIN\.openclaw\workspace\projects\cadence-crate\public"
os.makedirs(PUBLIC, exist_ok=True)

BG = "#050510"
PULSE = "#A3FF12"
SURGE = "#00D4FF"
WHITE = "#FFFFFF"

def draw_footprint(draw, cx, cy, size, color):
    """Draw a stylized running shoe silhouette using geometry"""
    w = size * 0.55
    h = size * 1.15
    # Main body (shoe sole shape) — rounded rectangle
    draw.rounded_rectangle(
        [cx - w//2, cy - h//2, cx + w//2, cy + h//2],
        radius=int(size * 0.22),
        fill=color,
    )
    # Heel indent
    draw.ellipse(
        [cx - size * 0.12, cy - size * 0.45, cx + size * 0.08, cy - size * 0.12],
        fill=BG,
    )
    # Arch cutout
    draw.ellipse(
        [cx - size * 0.2, cy + size * 0.05, cx + size * 0.08, cy + size * 0.35],
        fill=BG,
    )

def draw_ring(draw, cx, cy, r, color, width=2, opacity=255):
    """Draw a circle outline"""
    alpha_c = color + hex(opacity)[2:].zfill(2) if len(color) == 7 else color
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=width)

def make_icon(size, filename, with_rings=True, with_text=True):
    img = Image.new("RGBA", (size, size), BG + "FF")
    draw = ImageDraw.Draw(img)
    cx, cy = size // 2, size // 2

    if with_rings:
        scale = size / 512
        ring_sizes = [int(230 * scale), int(195 * scale), int(160 * scale)]
        for i, r in enumerate(ring_sizes):
            alpha = 60 - i * 15
            draw_ring(draw, cx, cy, r, PULSE, width=max(1, int(2 * scale)))

    # Footprint
    fp_size = int(size * 0.28)
    draw_footprint(draw, cx, cy, fp_size, PULSE)

    # BPM numbers
    if with_text and size >= 192:
        try:
            font = ImageFont.truetype("segoeui.ttf", int(size * 0.07))
        except:
            font = ImageFont.load_default()
        bbox_left = draw.textbbox((0, 0), "160", font=font)
        tw = bbox_left[2] - bbox_left[0]
        bx = cx - int(size * 0.32)
        by = cy - int(size * 0.42)
        draw.text((bx - tw//2, by), "160", fill=SURGE + "CC", font=font)
        bbox_right = draw.textbbox((0, 0), "170", font=font)
        rw = bbox_right[2] - bbox_right[0]
        rx = cx + int(size * 0.32)
        draw.text((rx - rw//2, by), "170", fill=SURGE + "CC", font=font)

    out = os.path.join(PUBLIC, filename)
    img.save(out, "PNG")
    print(f"  {filename} ({size}x{size})")

# Icons
for name, sz in [("icon-192.png", 192), ("icon-512.png", 512), ("apple-touch-icon.png", 180)]:
    make_icon(sz, name, with_rings=(sz >= 180), with_text=(sz >= 180))

# Favicon (small, no text)
make_icon(64, "favicon.png", with_rings=False, with_text=False)
# Also save as .ico (just copy PNG)
img = Image.open(os.path.join(PUBLIC, "favicon.png"))
img.save(os.path.join(PUBLIC, "favicon.ico"), "ICO", sizes=[(64, 64)])
print("  favicon.ico (64x64)")

# Apple splash
splash = Image.new("RGB", (2048, 2048), BG)
draw = ImageDraw.Draw(splash)
scx, scy = 1024, 900
fp_size = 160
draw_footprint(draw, scx, scy, fp_size, PULSE)
for i, r in enumerate([300, 260, 220]):
    alpha = 70 - i * 20
    draw_ring(draw, scx, scy, r, PULSE, width=2)
try:
    font = ImageFont.truetype("segoeui.ttf", 72)
except:
    font = ImageFont.load_default()
draw.text((1024, 1200), "Cadence Crate", fill=WHITE, font=font, anchor="mt")
draw.text((1024, 1280), "Find Your Rhythm", fill=SURGE, font=font, anchor="mt")
splash.save(os.path.join(PUBLIC, "apple-splash-2048.png"), "PNG")
print("  apple-splash-2048.png (2048x2048)")

print(f"\nDone. All icons in: {PUBLIC}")
