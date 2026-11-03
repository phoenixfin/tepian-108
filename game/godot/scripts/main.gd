extends Control
## Prototipe abu-abu Babak 1. Teks dan tombol saja, tanpa seni.
## Tujuan: menguji apakah lingkar inti (temui, bantu, rekrut, fasilitas terbuka, tekanan) menyenangkan.
## BELUM DIUJI di Godot. Perbaiki bila ada galat, dan catat perubahan di game/README.md.

const NOMOR_PROTOTIPE := [9, 12, 13, 17, 46, 56, 61, 83, 88, 93]  ## tokoh Babak 1 yang bisa direkrut (sesuaikan)
const FASILITAS := {
	"Dapur umum": [12, 93],
	"Klinik": [56],
	"Bengkel": [13, 88],
}
const HARI_AKHIR := 10

var semua: Dictionary = {}          ## no -> data tokoh
var direkrut: Array[int] = [1]      ## Damar sudah ada
var makanan := 10
var uang := 5
var rasa_aman := 3
var kepercayaan := 3
var hari := 1

var log_label: RichTextLabel
var status_label: Label
var kotak_tombol: VBoxContainer

func _ready() -> void:
	for b in DataLoader.muat_bintang():
		semua[int(b["no"])] = b
	_bangun_ui()
	_tulis("Hari 1. Pabrik Cakung. Dapur umum baru saja menyala.")
	_segarkan()

func _bangun_ui() -> void:
	var akar := VBoxContainer.new()
	akar.set_anchors_preset(Control.PRESET_FULL_RECT)
	add_child(akar)
	status_label = Label.new()
	akar.add_child(status_label)
	log_label = RichTextLabel.new()
	log_label.custom_minimum_size = Vector2(0, 220)
	log_label.scroll_following = true
	akar.add_child(log_label)
	var sc := ScrollContainer.new()
	sc.size_flags_vertical = Control.SIZE_EXPAND_FILL
	akar.add_child(sc)
	kotak_tombol = VBoxContainer.new()
	sc.add_child(kotak_tombol)

func _tulis(teks: String) -> void:
	log_label.append_text(teks + "\n")

func _fasilitas_terbuka() -> Array:
	var terbuka: Array = []
	for nama in FASILITAS:
		for no in FASILITAS[nama]:
			if no in direkrut:
				terbuka.append(nama)
				break
	return terbuka

func _segarkan() -> void:
	status_label.text = "Hari %d/%d | Makanan %d | Uang %d | Rasa aman %d | Kepercayaan %d | Orang %d | Fasilitas: %s" % [
		hari, HARI_AKHIR, makanan, uang, rasa_aman, kepercayaan, direkrut.size(), ", ".join(_fasilitas_terbuka())]
	for c in kotak_tombol.get_children():
		c.queue_free()
	for no in NOMOR_PROTOTIPE:
		if no in direkrut or not semua.has(no):
			continue
		var b: Dictionary = semua[no]
		var t := Button.new()
		t.text = "Bantu dan ajak: %s (%s). Biaya 2 makanan" % [DataLoader.label(b), b["peran"]]
		t.pressed.connect(_rekrut.bind(no))
		kotak_tombol.add_child(t)
	var akhir := Button.new()
	akhir.text = "Akhiri hari"
	akhir.pressed.connect(_akhiri_hari)
	kotak_tombol.add_child(akhir)

func _rekrut(no: int) -> void:
	if makanan < 2:
		_tulis("Makanan tidak cukup untuk membantu orang baru.")
		return
	makanan -= 2
	direkrut.append(no)
	kepercayaan += 1
	_tulis("%s bergabung." % DataLoader.label(semua[no]))
	_segarkan()

func _akhiri_hari() -> void:
	# Penghasilan harian bergantung pada fasilitas yang terbuka.
	var f := _fasilitas_terbuka()
	makanan += 2 + (6 if "Dapur umum" in f else 0)
	uang += 1 + (2 if "Bengkel" in f else 0)
	rasa_aman += (1 if "Klinik" in f else 0)
	makanan -= int(ceil(direkrut.size() / 2.0))
	hari += 1
	# Tekanan: cek izin dan audit setiap tiga hari.
	if hari % 3 == 0:
		if rasa_aman >= 4:
			_tulis("Cek izin datang. Warga bersepakat dan petugas pulang.")
		else:
			kepercayaan -= 1
			_tulis("Cek izin datang dan kalian tidak siap. Kepercayaan turun.")
	if hari > HARI_AKHIR:
		_selesai()
		return
	_segarkan()

func _selesai() -> void:
	for c in kotak_tombol.get_children():
		c.queue_free()
	var cukup := direkrut.size() >= 8 and makanan >= 20 and kepercayaan >= 3
	_tulis("Malam ke-10. " + ("Empat puluh orang buka puasa bersama di pabrik ini." if cukup else "Dapur sepi malam ini."))
	status_label.text = "Prototipe selesai. Edit scripts/main.gd untuk mengubah aturannya."
