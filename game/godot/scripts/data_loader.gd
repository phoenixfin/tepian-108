class_name DataLoader
extends RefCounted
## Membaca data/bintang.json dari akar repositori (dua tingkat di atas proyek ini).
## Saat dijalankan dari editor Godot, res:// menunjuk ke game/godot/.

static func muat_bintang() -> Array:
	var jalur := ProjectSettings.globalize_path("res://").path_join("../../data/bintang.json").simplify_path()
	if not FileAccess.file_exists(jalur):
		push_error("data/bintang.json tidak ditemukan di %s" % jalur)
		return []
	var f := FileAccess.open(jalur, FileAccess.READ)
	var data = JSON.parse_string(f.get_as_text())
	return data if data is Array else []

static func label(b: Dictionary) -> String:
	var nama: String = b.get("nama", "")
	if nama != "":
		return nama
	return "Tokoh %03d (%s)" % [int(b["no"]), b["bintang"]]
