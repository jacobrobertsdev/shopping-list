const form = document.querySelector("#new-item-form");
const formSubmitBtn = document.querySelector("#new-item-submit");
const input = document.querySelector("#new-item-input");
const itemsList = document.querySelector(".items-list");
const listItem = document.querySelectorAll(".list-item");
const itemText = document.querySelectorAll(".item-text");
const allItems = [];

// Add the new item to the DOM (without .innerHTML)
function createItem() {
  const uniqueId = crypto.randomUUID().toString();
  const newItem = {
    id: uniqueId,
    text: input.value,
  };

  allItems.push(newItem);

  const newListItem = document.createElement("li");
  newListItem.classList.add("list-item");
  itemsList.appendChild(newListItem);

  const itemCheckbox = document.createElement("input");
  itemCheckbox.type = "checkbox";
  itemCheckbox.classList.add("checkbox");
  newListItem.appendChild(itemCheckbox);

  const itemTextInput = document.createElement("input");
  itemTextInput.type = "text";
  itemTextInput.classList.add("item-text");
  itemTextInput.setAttribute("id", uniqueId);
  itemTextInput.value = newItem.text;
  itemTextInput.setAttribute("readonly", "readonly");
  newListItem.appendChild(itemTextInput);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  newListItem.appendChild(deleteButton);

  saveLocalStorage();
}

// Clear the input field
function clearInput() {
  input.value = "";
}

//------------------Local storage-------------------//
// Load local storage
function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("items")) || [];

  if (data) {
    for (item of data) {
      input.value = item.text;
      createItem();
    }
    clearInput();
  }
}

// Save to local storage
function saveLocalStorage() {
  localStorage.setItem("items", JSON.stringify(allItems));
}

// Remove items from dom and local storage
itemsList.addEventListener("click", (e) => {
  const data = JSON.parse(localStorage.getItem("items")) || [];

  const target = e.target;
  const listItem = e.target.closest("li");
  const input = listItem.querySelector(".item-text");
  const inputId = input.getAttribute("id").toString();

  if (target.classList.contains("delete-button")) {
    const newArray = data.filter((currentItem) => inputId != currentItem.id);
    listItem.remove();
    localStorage.setItem("items", JSON.stringify(newArray));
  }
});

// ----------EVENT LISTENERS---------

// Retrieve items from local storage & clear the input field
document.addEventListener("DOMContentLoaded", () => {
  allItems.length = 0; // Clear the array before populating it
  getLocalStorage();
  clearInput();
});

// Add new item, save the item to local storage, & clear the input field
form.addEventListener("submit", (e) => {
  if (!input.value || input.value === "") {
    alert("Please enter a valid input.");
    return;
  }

  e.preventDefault();
  createItem();
  clearInput();
});
