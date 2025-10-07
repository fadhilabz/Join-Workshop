from flask import Flask, render_template, request, redirect, url_for, make_response
import os, csv, uuid

app = Flask(__name__)

CSV_FILE = "pendaftaran.csv"
# DEVICE_FOLDER = "static/device_ids"
BATAS_PENDAFTARAN = 50
# os.makedirs(DEVICE_FOLDER, exist_ok=True)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/pendaftaran", methods=["GET", "POST"])
def pendaftaran():
    device_id = request.cookies.get("device_id")

    # kalau belum punya ID, buat baru
    if not device_id:
        device_id = str(uuid.uuid4())

    # device_file = os.path.join(DEVICE_FOLDER, f"{device_id}.txt")

    # kalau sudah daftar
    # if os.path.exists(device_file):
        return "<h3 style='text-align:center;color:red;'>⚠️ Kamu sudah pernah mendaftar!</h3>"

    # cek kuota penuh
    if os.path.exists(CSV_FILE):
        with open(CSV_FILE, newline='') as f:
            total = sum(1 for _ in f) - 1
        if total >= BATAS_PENDAFTARAN:
            return "<h3 style='text-align:center;color:red;'>❌ Pendaftaran sudah penuh (50 orang)</h3>"

    if request.method == "POST":
        nama = request.form["nama"]
        nim = request.form["nim"]
        nohp = request.form["nohp"]
        email = request.form["email"]

        # tulis ke CSV
        baru = not os.path.exists(CSV_FILE)
        with open(CSV_FILE, "a", newline='', encoding="utf-8") as f:
            writer = csv.writer(f)
            if baru:
                writer.writerow(["Nama", "NIM", "No HP", "Email"])
            writer.writerow([nama, nim, nohp, email])

        # tandai device sudah daftar
        # open(device_file, "w").write("sudah daftar")

        # set cookie dan tampilkan pesan sukses
        res = make_response("<h3 style='text-align:center;color:green;'>✅ Pendaftaran Berhasil!</h3>")
        res.set_cookie("device_id", device_id, max_age=60*60*24*365)
        return res

    res = make_response(render_template("pendaftaran.html"))
    res.set_cookie("device_id", device_id, max_age=60*60*24*365)
    return res

if __name__ == "__main__":
    app.run(debug=True)
