const CACHE_KEY = "Bookshelf";

function checkStorage() {
  return typeof Storage !== "undefined";
}

// Menyimpan data buku
function putBook(data) {
  if (checkStorage()) {
    let bookData = null;

    if (localStorage.getItem(CACHE_KEY) === null) {
      bookData = [];
    } else {
      bookData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    bookData.unshift(data);

    if (bookData.length > 16) {
      bookData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(bookData));
  }
}

// Mengambil data dari storage
function showBookShelf() {
  if (checkStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY));
  } else {
    return [];
  }
}

// komponen card buku belum dibaca
function renderCardUndone(id, judul, penulis, tahun, isComplete) {
  return `
    <div class="book_item">
      <h3>${judul}</h3>
      <p>${penulis}</p>
      <p>Tahun ${tahun}</p>
      <div class="action">
        <button class="done" onclick="changeCompleteMark('${id}')">Done</button>
        <button class="delete" onclick="deleteBook('${id}')">Delete</button>
      </div>
    </div>
  `;
}

// komponen card buku sudah dibaca
function renderCardDone(id, judul, penulis, tahun, isComplete) {
  return `
    <div class="book_item">
      <h3>${judul}</h3>
      <p>${penulis}</p>
      <p>Tahun ${tahun}</p>
      <div class="action">
        <button class="done" onclick="changeCompleteMark('${id}')">Re-Read</button>
        <button class="delete" onclick="deleteBook('${id}')">Delete</button>
      </div>
    </div>
  `;
}

// Merender buku
function renderBookshelf() {
  const bookData = showBookShelf();

  let bookList1 = document.querySelector(".book_list#completeBookshelfList");
  let bookList2 = document.querySelector(".book_list#incompleteBookshelfList");

  try {
    for (let book of bookData) {
      if (book.isComplete == true) {
        let node = document.createElement("div");
        node.innerHTML = renderCardDone(book.id, book.title, book.author, book.year);
        bookList1.appendChild(node);
      }
    }
    for (let book of bookData) {
      if (book.isComplete == false) {
        let node = document.createElement("div");
        node.innerHTML = renderCardUndone(book.id, book.title, book.author, book.year);
        bookList2.appendChild(node);
      }
    }
  } catch {
    console.log("Data kosong");
  }
}

// Mengubah status baca buku
function changeCompleteMark(id) {
  const dataBook = showBookShelf();
  const updatedDataBook = dataBook.map((book) => {
    if (book.id === id) {
      book.isComplete = !book.isComplete;
    }
    return book;
  });

  localStorage.setItem(CACHE_KEY, JSON.stringify(updatedDataBook));
  clear();
  renderBookshelf();
}

// Menghapus buku
function deleteBook(id) {
  const dataBook = showBookShelf();
  const deletedDataBook = dataBook.filter((book) => book.id !== id);
  localStorage.setItem(CACHE_KEY, JSON.stringify(deletedDataBook));
  clear();
  renderBookshelf();
}

// Merender Tampilan Buku terfilter
function renderFilteredBook(filteredBook) {
  let bookList1 = document.querySelector(".book_list#completeBookshelfList");
  let bookList2 = document.querySelector(".book_list#incompleteBookshelfList");

  try {
    for (let book of filteredBook) {
      if (book.isComplete == true) {
        let node = document.createElement("div");
        node.innerHTML = renderCardDone(book.id, book.title, book.author, book.year);
        bookList1.appendChild(node);
      }
    }
    for (let book of filteredBook) {
      if (book.isComplete == false) {
        let node = document.createElement("div");
        node.innerHTML = renderCardUndone(book.id, book.title, book.author, book.year);
        bookList2.appendChild(node);
      }
    }
  } catch {
    console.log("Data tidak tersedia");
  }
}

// Mencari Buku
function searchBook() {
  const query = document.getElementById("searchBookTitle").value.toLowerCase();
  const bookData = showBookShelf();

  const filteredDataBooks = bookData.filter((book) => {
    const title = book.title.toLowerCase();
    return title.includes(query);
  });

  clear();
  renderFilteredBook(filteredDataBooks);
}

// Tombol untuk input pencarian
const searchInput = document.getElementById("searchBookTitle");

searchInput.addEventListener("input", searchBook);
const searchButton = document.querySelector("#searchSubmit");
searchButton.addEventListener("click", (e) => {
  clear();
  searchBook();
});
