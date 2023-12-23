const form = document.querySelector("#new-item-form");
const formSubmitBtn = document.querySelector("#new-item-submit");
const input = document.querySelector("#new-item-input");
const itemsList = document.querySelector(".items-list");
const listItem = document.querySelector(".list-item");
const itemText = document.querySelector(".item-text");
const deleteBtn = document.querySelector(".delete-button");

function clearInput() {
  input.value = "";
}

// Add the new item to the DOM (without .innerHTML)
function createItem() {
  const newItem = input.value;

  if (!newItem || newItem === "") {
    alert("Please enter a valid input.");
    return;
  }

  const newListItem = document.createElement("li");
  newListItem.classList.add("list-item");
  itemsList.appendChild(newListItem);

  const itemTextInput = document.createElement("input");
  itemTextInput.type = "text";
  itemTextInput.classList.add("item-text");
  itemTextInput.value = newItem;
  itemTextInput.setAttribute("readonly", "readonly");
  newListItem.appendChild(itemTextInput);

  const itemButtonsContainer = document.createElement("div");
  itemButtonsContainer.classList.add("buttons");
  newListItem.appendChild(itemButtonsContainer);

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.textContent = "Edit";
  itemButtonsContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  itemButtonsContainer.appendChild(deleteButton);
}

// ----------EVENT LISTENERS---------

// On page load, retrieve items from local storage, and clear the input field
document.addEventListener("DOMContentLoaded", () => {
  clearInput();
});

// On form submit, add new item, save the item to local storage, and clear the input field
form.addEventListener("submit", (e) => {
  e.preventDefault();
  createItem();
  clearInput();
});
