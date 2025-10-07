document.getElementById("daftarForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const nim = document.getElementById("nim").value.trim();
  const hp = document.getElementById("hp").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nama || !nim || !hp || !email) {
    alert("Semua field wajib diisi!");
    return;
  }

  if (!/^[0-9]{10,}$/.test(hp)) {
    alert("Nomor HP harus minimal 10 digit angka.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Format email tidak valid!");
    return;
  }

  alert("Pendaftaran berhasil! Terima kasih sudah mendaftar.");
  document.getElementById("daftarForm").reset();
});
