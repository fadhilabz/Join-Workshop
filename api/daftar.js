// api/daftar.js
import XLSX from "xlsx";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nama, nim, email, hp, asal, motivasi } = req.body;
  const FILE_PATH = path.join(process.cwd(), "data.xlsx");
  let data = [];

  // Baca data jika file Excel sudah ada
  if (fs.existsSync(FILE_PATH)) {
    const workbook = XLSX.readFile(FILE_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(sheet);
  }

  // Cek jumlah peserta maksimal 50
  if (data.length >= 50) {
    return res.status(400).json({ message: "⚠️ Pendaftaran sudah penuh (50 peserta)!" });
  }

  // Cek duplikat NIM atau HP
  const duplicate = data.find(d => d.NIM === nim || d.HP === hp);
  if (duplicate) {
    return res.status(400).json({ message: "⚠️ Anda sudah terdaftar sebelumnya!" });
  }

  // Tambahkan data baru
  data.push({ Nama: nama, NIM: nim, Email: email, HP: hp, Asal: asal, Motivasi: motivasi });

  // Simpan kembali ke Excel
  const newWB = XLSX.utils.book_new();
  const newWS = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(newWB, newWS, "Pendaftar");
  XLSX.writeFile(newWB, FILE_PATH);

  return res.status(200).json({ message: "✅ Pendaftaran berhasil!" });
}
