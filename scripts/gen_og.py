"""Generate OG image for Cadence Crate (1200x630)."""
from PIL import Image, ImageDraw, ImageFont
import os

PUBLIC = r"C:\Users\ADMIN\.openclaw\workspace\projects\cadence-crate\public"
W, H = 1200, 630
BG = "#050510"
PULSE = "#A3FF12"
SURGE = "#00D4FF"
WHITE = "#FFFFFF"

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Background radial effect — concentric circles
for i, r in enumerate(range(600, 100, -25)):
    alpha = max(5, 30 - i)
    color = SURGE if i % 3 == 0 else PULSE
    hex_alpha = hex(alpha)[2:].zfill(2)
    draw.ellipse(
        [W//2 - r, H//2 - r, W//2 + r, H//2 + r],
        outline=color + hex_alpha,
        width=1,
    )

# Center footprint
cx, cy = W // 2, H // 2 - 30
try:
    font_title = ImageFont.truetype("segoeui.ttf", 72)
    font_sub = ImageFont.truetype("segoeui.ttf", 36)
    font_bpm = ImageFont.truetype("segoeui.ttf", 48)
except:
    font_title = ImageFont.load_default()
    font_sub = font_title
    font_bpm = font_title

# Footprint
def draw_fp(d, cx, cy, s, color):
    w, h = int(s * 0.55), int(s * 1.15)
    d.rounded_rectangle(
        [cx - w//2, cy - h//2, cx + w//2, cy + h//2],
        radius=int(s * 0.22), fill=color,
    )
    d.ellipse([cx - int(s*0.12), cy - int(s*0.45), cx + int(s*0.08), cy - int(s*0.12)], fill=BG)
    d.ellipse([cx - int(s*0.2), cy + int(s*0.05), cx + int(s*0.08), cy + int(s*0.35)], fill=BG)

draw_fp(draw, cx, cy - 20, 100, PULSE)

# Text
title = "Cadence Crate"
bbox = draw.textbbox((0, 0), title, font=font_title)
tw = bbox[2] - bbox[0]
draw.text((W//2 - tw//2, cy + 80), title, fill=WHITE, font=font_title)

sub = "Find Your Rhythm. Hit Your Stride."
bbox2 = draw.textbbox((0, 0), sub, font=font_sub)
sw = bbox2[2] - bbox2[0]
draw.text((W//2 - sw//2, cy + 160), sub, fill=SURGE, font=font_sub)

bpm_text = "160 – 170 BPM"
bbox3 = draw.textbbox((0, 0), bpm_text, font=font_bpm)
bw = bbox3[2] - bbox3[0]
draw.text((W//2 - bw//2, cy + 220), bpm_text, fill=PULSE, font=font_bpm)

# Small footer
try:
    footer_font = ImageFont.truetype("segoeui.ttf", 20)
except:
    footer_font = ImageFont.load_default()
footer = "cadence-crate.vercel.app"
bbox4 = draw.textbbox((0, 0), footer, font=footer_font)
fw = bbox4[2] - bbox4[0]
draw.text((W//2 - fw//2, H - 40), footer, fill=WHITE + "44", font=footer_font)

out = os.path.join(PUBLIC, "og-image.png")
img.save(out, "PNG")
print(f"OG image saved: {out} ({W}x{H})")
