const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const noteInput = document.getElementById("noteInput");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const toggleBtn = document.getElementById("themeToggle");

let todos = [];

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") document.body.classList.add("dark");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "🌙";
  } else {
    toggleBtn.textContent = "☀️";
  }
});


document.getElementById("addBtn").onclick = () => {
  modal.style.display = "flex";
  noteInput.value = "";
};

document.getElementById("cancelBtn").onclick = () => {
  modal.style.display = "none";
};

document.getElementById("applyBtn").onclick = () => {
  if (!noteInput.value.trim()) return;

  todos.push({
    text: noteInput.value,
    completed: false
  });

  modal.style.display = "none";
  render();
};


function render() {
  todoList.innerHTML = "";

  let filtered = todos.filter(todo => {
    if (filterSelect.value === "complete") return todo.completed;
    if (filterSelect.value === "incomplete") return !todo.completed;
    return true;
  });

  filtered = filtered.filter(todo =>
    todo.text.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  emptyState.style.display = filtered.length ? "none" : "block";

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("div");
    checkbox.className = "custom-checkbox";
    if (todo.completed) checkbox.classList.add("checked");
    checkbox.innerHTML = todo.completed ? "✓" : "";

    checkbox.onclick = () => {
      todo.completed = !todo.completed;
      render();
    };

    const span = document.createElement("span");
    span.textContent = todo.text;

    li.appendChild(checkbox);
    li.appendChild(span);
    todoList.appendChild(li);
  });
}

searchInput.oninput = render;
filterSelect.onchange = render;
