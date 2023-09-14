// Menyimpan buku baru
function submitBook() {
  let judul = document.getElementById("inputBookTitle").value;
  let penulis = document.getElementById("inputBookAuthor").value;
  let tahun = document.getElementById("inputBookYear").value;
  let selesai = document.getElementById("inputBookIsComplete").checked;

  console.log(judul);
  console.log(penulis);
  console.log(tahun);
  console.log(selesai);

  let date = new Date();
  const bookData = {
    id: String(date.getDate()) + String(date.getFullYear()) + String(date.getHours()) + String(date.getMilliseconds()),
    title: judul,
    author: penulis,
    year: parseInt(tahun),
    isComplete: selesai ? true : false,
  };
  putBook(bookData);
  renderBookshelf();
  alert("Buku berhasil disimpan");
}

// Menghapus tampilan
function clear() {
  let completeBookshelfList = document.getElementById("completeBookshelfList");
  let incompleteBookshelfList = document.getElementById("incompleteBookshelfList");

  while (completeBookshelfList.firstElementChild) {
    completeBookshelfList.firstElementChild.remove();
    completeBookshelfList = document.getElementById("completeBookshelfList");
  }

  while (incompleteBookshelfList.firstElementChild) {
    incompleteBookshelfList.firstElementChild.remove();
    incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  }
}

// Memastikan konten ditampilkan secara realtime
document.addEventListener("DOMContentLoaded", () => {
  renderBookshelf();
});

// Tombol untuk menyimpan buku
const submitButton = document.querySelector("#inputBook");
submitButton.addEventListener("submit", (e) => {
  clear();
  e.preventDefault();
  submitBook();
});
