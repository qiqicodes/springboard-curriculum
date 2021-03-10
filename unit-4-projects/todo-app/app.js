As a user, you should be able to:

  1. Add a new todo (by submitting a form)
  2. Mark a todo as completed (cross out the text of the todo)
  3. Remove a todo

  Part 2
  With a functioning todo app, save todos in localStorage
  
  Part 3
  1. throw error: todo has to have value
  2. checkbox (eventListener) change text property crossover
  3. click (eventListener) button/li edit function
  4. Day/night mode -->



document.addEventListener("DOMContentLoaded", function() {
    let todoForm = document.getElementById("newTodo");
    let todoList = document.getElementById("todoList");
  
    todoForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      let removeButton = document.createElement("button");
      removeButton.innerText = "X";
  
      let newTodo = document.createElement("li");
      newTodo.innerText = document.getElementById("task").value;
  
      todoList.appendChild(newTodo);
      newTodo.appendChild(removeButton);
  
      todoForm.reset();
    });
  
    todoList.addEventListener("click", function(event) {
      const targetTagToLowerCase = event.target.tagName.toLowerCase();
      if (targetTagToLowerCase === "li") {
        event.target.style.textDecoration = "line-through";
      } else if (targetTagToLowerCase === "button") {
        event.target.parentNode.remove();
      }
    });
  });
  
  // 3.4 light/dark mode
  const toggleSwitch = document.querySelector('input[stype="checkbox"]');
  toggleSwitch.addEventListener("click", function(event){
    document.body.className = toggleSwitch.checked ? "dark-mode" : "" ;
  })