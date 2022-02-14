"use strict";

const entries = JSON.parse(localStorage.getItem("entries") || "[]");

const initialModal1 = document.querySelector(".initialModal1");
const initialModal2 = document.querySelector(".initialModal2");
const initialModal2content = document.querySelector(".initialModal2content");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");

const addButton = document.querySelector(".addButton");
const clearButton = document.querySelector(".clearButton");
const submitButton1 = document.querySelector(".submitButton1");
const submitButton2 = document.querySelector(".submitButton2");
const submitButton3 = document.querySelector(".submitButton3");
const submitButton4 = document.querySelector(".submitButton4");

const controls = document.getElementById("controls");

const header = document.getElementById("header");

const table = document.getElementById("table");
const tableRows = document.getElementById("tableRows");
const tableBody = document.getElementById("tableBody");
const tableFoot = document.getElementById("tableFoot");

let tableInitialized = false;
let modalOpen = false;

let title = JSON.parse(localStorage.getItem("title")) || "";
let rows = parseInt(JSON.parse(localStorage.getItem("rows"))) || "";
let rowNames = JSON.parse(localStorage.getItem("rowNames") || "[]");
let showItems = JSON.parse(localStorage.getItem("showItems")) || "";

function showModal2() {
  title = document.getElementById("title").value;
  localStorage.setItem("title", JSON.stringify(title));

  rows = parseInt(document.getElementById("rows").value);
  localStorage.setItem("rows", JSON.stringify(rows));

  if ((title, rows) && rows > 0) {
    initialModal1.style.display = "none";

    for (let i = 1; i <= rows; i++) {
      initialModal2content.innerHTML += `
        <div class="input-field">
        <label for="rowType${i}">Type of Row ${i}</label>
        <input class="input" id="rowType${i}" name="rowType${i}" type="text" />
        </div>
        </div>
        `;
    }

    initialModal2.style.display = "block";
  } else {
    alert(
      "Please enter all data (the event should have a name and there must be at least two rows)"
    );
  }
}

submitButton1.addEventListener("click", function () {
  showModal2();
});

// If local storage exists and Table has already been created we Load the data
function load() {
  for (let i = 0; i < rows; i++) {
    tableRows.innerHTML += `<td>${rowNames[i]}</td>`;

    modalContent.innerHTML += `<div class="input-field">
                <label for="${rowNames[i]}">${rowNames[i]}</label>
                <input class="input" id="${rowNames[i]}" name="${rowNames[i]}" type="text" />
              </div>`;
  }

  header.innerHTML = `<h1>${title}</h1>`

  initialModal2.style.display = "none";
  controls.style.display = "block";
  table.style.display = "block";
  tableInitialized = true;
}

// We check if local storage exists and if yes we call load()
if (window.localStorage.entries) {
  initialModal1.style.display = "none";
  controls.style.display = "block";
  load();
  render(entries);
}

// If local storage doesn't exist we initialize the table using our values
function initialize() {
  for (let i = 1; i <= rows; i++) {
    rowNames[i - 1] = document.getElementById(`rowType${i}`).value;
  }
  localStorage.setItem("rowNames", JSON.stringify(rowNames));

  header.innerHTML = `<h1>${title}</h1>`
  
  for (let i = 0; i < rows; i++) {
    tableRows.innerHTML += `<td>${rowNames[i]}</td>`;

    modalContent.innerHTML += `<div class="input-field">
                <label for="${rowNames[i]}">${rowNames[i]}</label>
                <input class="input" id="${rowNames[i]}" name="${rowNames[i]}" type="text" />
              </div>`;
  }

  initialModal2.style.display = "none";
  controls.style.display = "block";
  table.style.display = "block";
  tableInitialized = true;
}

submitButton2.addEventListener("click", function () {
  if (!tableInitialized) {
    initialize();
  }
});

addButton.addEventListener("click", function () {
  if (!modalOpen) {
    modal.style.display = "block";
    modalOpen = !modalOpen;
  }
});

clearButton.addEventListener("click", function () {
  window.localStorage.clear();
  location.reload();
});

let data;

function addEntry() {
  entries[entries.length] = [];
  let size = entries.length;

  for (let i = 0; i < rows; i++) {
    data = document.getElementById(`${rowNames[i]}`).value;
    entries[size - 1].push(data);
  }
  localStorage.setItem("entries", JSON.stringify(entries));

  modal.style.display = "none";
  modalOpen = !modalOpen;
}

submitButton3.addEventListener("click", function () {
  addEntry();
  render(entries);
});

// Filter button
submitButton4.addEventListener("click", function (event) {
  event.preventDefault();
  showItems = parseInt(
    document.querySelector('input[name="show"]:checked').value
  );
  localStorage.setItem("showItems", JSON.stringify(showItems));
  render(entries);
});

function render(arr) {
  if (!window.localStorage.showItems) {
    tableBody.innerHTML = "";
    let row = "";

    for (let i = 0; i < entries.length; i++) {
      for (let j = 0; j < rows; j++) {
        row += `<td>${arr[i][j]}</td>`;
      }
      tableBody.innerHTML += `<tr>${row}</tr>`;
      row = "";
    }
  } else {
    if (showItems <= entries.length) {
      tableBody.innerHTML = "";
      let row = "";

      for (let i = 0; i < showItems; i++) {
        for (let j = 0; j < rows; j++) {
          row += `<td>${arr[i][j]}</td>`;
        }
        tableBody.innerHTML += `<tr>${row}</tr>`;
        row = "";
      }
    } else {
      tableBody.innerHTML = "";
      let row = "";

      for (let i = 0; i < entries.length; i++) {
        for (let j = 0; j < rows; j++) {
          row += `<td>${arr[i][j]}</td>`;
        }
        tableBody.innerHTML += `<tr>${row}</tr>`;
        row = "";
      }
    }
  }
}
