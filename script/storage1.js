// Membuat || menyimpan localstorage
const CACHE_KEY1 = "inCompleteBook";
const CACHE_KEY2 = "CompleteBook";

// fungsi cek kompatibilitas storage dari browser
function checkStorage() {
  return typeof Storage !== "undefined";
}

// fungsi menyimpan data belum dibaca
function putIncompletedBook(data) {
  if (checkStorage()) {
    let bookData = null;

    if (localStorage.getItem(CACHE_KEY1) === null) {
      bookData = [];
    } else {
      bookData = JSON.parse(localStorage.getItem(CACHE_KEY1));
    }

    bookData.unshift(data);

    if (bookData.length > 5) {
      bookData.pop();
    }

    localStorage.setItem(CACHE_KEY1, JSON.stringify(bookData));
  }
}

// fungsi menyimpan data sudah dibaca
function putCompletedBook(data) {
  if (checkStorage()) {
    let bookData = null;

    if (localStorage.getItem(CACHE_KEY2) === null) {
      bookData = [];
    } else {
      bookData = JSON.parse(localStorage.getItem(CACHE_KEY2));
    }

    bookData.unshift(data);

    if (bookData.length > 5) {
      bookData.pop();
    }

    localStorage.setItem(CACHE_KEY2, JSON.stringify(bookData));
  }
}

// fungsi mengambil data dari storage
function showInCompleteBookShelf() {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY1));
  } else {
    return [];
  }
}

function showCompleteBookShelf() {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY2));
  } else {
    return [];
  }
}

function renderBookshelf() {
  const bookData1 = showInCompleteBookShelf();
  const bookData2 = showCompleteBookShelf();

  let bookList1 = document.querySelector(".book_list#incompleteBookshelfList");
  let bookList2 = document.querySelector(".book_list#completeBookshelfList");

  bookList1.innerHTML = "";
  bookList2.innerHTML = "";

  for (let book of bookData1) {
    let row = document.createElement("article");
    row.setAttribute("class", "book_item");
    row.innerHTML = "<h3>" + book.title + "</h3>";
    row.innerHTML += "<p>Penulis: " + book.author + "</p>";
    row.innerHTML += "<p>Tahun: " + book.year + "</p>";

    bookList1.appendChild(row);
  }

  for (let book of bookData2) {
    let row1 = document.createElement("article");
    row1.setAttribute("class", "book_item");
    row1.innerHTML = "<h3>" + book.title + "</h3>";
    row1.innerHTML += "<p>Penulis: " + book.author + "</p>";
    row1.innerHTML += "<p>Tahun: " + book.year + "</p>";

    bookList2.appendChild(row1);
  }
}

// Fitur Search

function searchBook() {
  const bookData1 = showInCompleteBookShelf();
  const bookData2 = showCompleteBookShelf();

  let bookList1 = document.querySelector(".book_list#incompleteBookshelfList");
  let bookList2 = document.querySelector(".book_list#completeBookshelfList");

  bookList1.innerHTML = "";
  bookList2.innerHTML = "";

  let buku = document.querySelector("#searchBookTitle").value;

  for (let book of bookData1) {
    if (book.title == buku || book.author == buku || book.year == buku) {
      let row = document.createElement("article");
      row.setAttribute("class", "book_item");
      row.innerHTML = "<h3>" + book.title + "</h3>";
      row.innerHTML += "<p>Penulis: " + book.author + "</p>";
      row.innerHTML += "<p>Tahun: " + book.year + "</p>";

      bookList1.appendChild(row);
    }
  }

  for (let book of bookData2) {
    if (book.title == buku || book.author == buku || book.year == buku) {
      let row1 = document.createElement("article");
      row1.setAttribute("class", "book_item");
      row1.innerHTML = "<h3>" + book.title + "</h3>";
      row1.innerHTML += "<p>Penulis: " + book.author + "</p>";
      row1.innerHTML += "<p>Tahun: " + book.year + "</p>";

      bookList2.appendChild(row1);
    }
  }
}
