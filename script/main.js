// Main

function submitBook() {
  let judul = document.getElementById("inputBookTitle").value;
  let penulis = document.getElementById("inputBookAuthor").value;
  let tahun = document.getElementById("inputBookYear").value;
  let selesai = document.getElementById("inputBookIsComplete");

  if (selesai.checked) {
    const bookData = {
      title: judul,
      author: penulis,
      year: tahun,
    };

    putCompletedBook(bookData);
    renderBookshelf();
    console.log("Buku berhasil disimpan");
  } else {
    const bookData = {
      title: judul,
      author: penulis,
      year: tahun,
    };

    putIncompletedBook(bookData);
    renderBookshelf();
    console.log("Buku berhasil disimpan");
  }
}

const submitButton = document.querySelector("#inputBook");
submitButton.addEventListener("submit", (e) => {
  submitBook();
  e.preventDefault();
});

const searchButton = document.querySelector("#searchBook");
searchButton.addEventListener("submit", (e) => {
  searchBook();
  e.preventDefault();
});
