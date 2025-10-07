const text = "Web Developer";
const element = document.getElementById("typing-text");
let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting) {
    // Mengetik huruf
    element.textContent = text.slice(0, index++);
    if (index > text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 3000); // jeda sebelum hapus
      return;
    }
  } else {
    // Menghapus huruf
    index--;
    if (index <= 0) {
      element.textContent = ""; // kosongkan
      index = 0;
      isDeleting = false;
      setTimeout(typeEffect, 1500); // jeda sebelum ketik ulang
      return;
    } else {
      element.textContent = text.slice(0, index);
    }
  }

  setTimeout(typeEffect, 100); // kecepatan ketik/hapus
}

typeEffect();
