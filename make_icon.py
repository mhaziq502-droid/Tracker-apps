"""Generate app icons with no third-party deps.

Draws a 1024x1024 master icon (dark rounded square + checkmark motif), then
nearest-neighbour downsamples it to every size Tauri needs and writes valid
PNGs plus a Windows .ico — all using only the Python standard library.
"""
import struct, zlib

MASTER = 1024


def new_canvas(size):
    return bytearray([0, 0, 0, 0] * size * size), size


def px(buf, size, x, y, r, g, b, a=255):
    if 0 <= x < size and 0 <= y < size:
        i = (y * size + x) * 4
        sa = a / 255
        buf[i] = int(r * sa + buf[i] * (1 - sa))
        buf[i + 1] = int(g * sa + buf[i + 1] * (1 - sa))
        buf[i + 2] = int(b * sa + buf[i + 2] * (1 - sa))
        buf[i + 3] = max(buf[i + 3], a)


def rounded_rect(buf, size, x0, y0, x1, y1, radius, color):
    r, g, b = color
    for y in range(y0, y1):
        for x in range(x0, x1):
            dx = dy = 0
            if x < x0 + radius and y < y0 + radius:
                dx, dy = x0 + radius - x, y0 + radius - y
            elif x >= x1 - radius and y < y0 + radius:
                dx, dy = x - (x1 - radius) + 1, y0 + radius - y
            elif x < x0 + radius and y >= y1 - radius:
                dx, dy = x0 + radius - x, y - (y1 - radius) + 1
            elif x >= x1 - radius and y >= y1 - radius:
                dx, dy = x - (x1 - radius) + 1, y - (y1 - radius) + 1
            if dx * dx + dy * dy <= radius * radius or (dx == 0 and dy == 0):
                px(buf, size, x, y, r, g, b)


def thick_line(buf, size, x0, y0, x1, y1, width, color):
    r, g, b = color
    steps = int(max(abs(x1 - x0), abs(y1 - y0)) * 2) + 1
    for s in range(steps + 1):
        t = s / steps
        cx = x0 + (x1 - x0) * t
        cy = y0 + (y1 - y0) * t
        rad = width / 2
        for yy in range(int(cy - rad), int(cy + rad) + 1):
            for xx in range(int(cx - rad), int(cx + rad) + 1):
                if (xx - cx) ** 2 + (yy - cy) ** 2 <= rad * rad:
                    px(buf, size, xx, yy, r, g, b)


def draw_master():
    buf, size = new_canvas(MASTER)
    rounded_rect(buf, size, 40, 40, size - 40, size - 40, 180, (23, 26, 33))
    rounded_rect(buf, size, 120, 120, size - 120, size - 120, 120, (31, 46, 80))
    thick_line(buf, size, 330, 530, 470, 670, 70, (79, 140, 255))
    thick_line(buf, size, 470, 670, 720, 360, 70, (53, 194, 138))
    return buf


MASTER_BUF = draw_master()


def resize(dst_size):
    """Nearest-neighbour resample of the master canvas to dst_size."""
    out = bytearray(dst_size * dst_size * 4)
    for y in range(dst_size):
        sy = y * MASTER // dst_size
        for x in range(dst_size):
            sx = x * MASTER // dst_size
            si = (sy * MASTER + sx) * 4
            di = (y * dst_size + x) * 4
            out[di:di + 4] = MASTER_BUF[si:si + 4]
    return out


def png_bytes(buf, size):
    raw = bytearray()
    for y in range(size):
        raw.append(0)
        raw.extend(buf[y * size * 4:(y + 1) * size * 4])
    compressed = zlib.compress(bytes(raw), 9)

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        c += struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        return c

    out = b"\x89PNG\r\n\x1a\n"
    out += chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0))
    out += chunk(b"IDAT", compressed)
    out += chunk(b"IEND", b"")
    return out


def write_png(path, size):
    with open(path, "wb") as f:
        f.write(png_bytes(resize(size), size))
    print("wrote", path)


def write_ico(path, sizes):
    """Build a .ico embedding PNG-encoded images at the given sizes."""
    images = []
    for s in sizes:
        images.append((s, png_bytes(resize(s), s)))
    n = len(images)
    header = struct.pack("<HHH", 0, 1, n)  # reserved, type=1 (icon), count
    entries = b""
    offset = 6 + n * 16
    datas = b""
    for s, data in images:
        w = 0 if s >= 256 else s
        h = 0 if s >= 256 else s
        entries += struct.pack("<BBBBHHII", w, h, 0, 0, 1, 32, len(data), offset)
        offset += len(data)
        datas += data
    with open(path, "wb") as f:
        f.write(header + entries + datas)
    print("wrote", path)


import os
os.makedirs("src-tauri/icons", exist_ok=True)

# Required by tauri.conf.json
write_png("src-tauri/icons/32x32.png", 32)
write_png("src-tauri/icons/128x128.png", 128)
write_png("src-tauri/icons/128x128@2x.png", 256)
write_png("src-tauri/icons/icon.png", 512)
# Store Logo variants Tauri's generator usually emits (harmless extras)
write_png("src-tauri/icons/Square150x150Logo.png", 150)
write_png("src-tauri/icons/Square44x44Logo.png", 44)
write_png("src-tauri/icons/StoreLogo.png", 50)
# Windows ICO with common sizes
write_ico("src-tauri/icons/icon.ico", [16, 32, 48, 64, 128, 256])
# Master
write_png("app-icon.png", 512)
print("done")
