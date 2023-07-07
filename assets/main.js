const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");


todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodos);

document.addEventListener("DOMContentLoaded", getLocalTodos);



function addTodo(event) {
    event.preventDefault(); //برای اینکه سابمیت رفرش نکند
    console.log(event);

          //SWEET
    if (todoInput.value == "") {
        todoInput.focus();
        Swal.fire("لطفا از پر بودن فیلد ورودی اطمینان حاصل نمایید")
        return false
    }

    const todoDiv = document.createElement("div"); // 1.create
    todoDiv.classList.add("todo")
    // 2.content
    const newTodo = `
    <li>${todoInput.value}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span>`;

    todoDiv.innerHTML = newTodo;


    todoList.appendChild(todoDiv); // 3.where to display?
    saveLocalTodos(todoInput.value);   //مربوط به فانکشن مربوط به سیو کردن تودوی جدید 
    todoInput.value = "";
}




function checkRemove(event) {
    const classList = [...event.target.classList]; //دسترسی به کلاس 
    const item = event.target;
    console.log(item.parentElement.parentElement);

    if (classList[1] === "fa-check-square") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed")
    } else if (classList[1] === "fa-trash-alt") {
        const todo = item.parentElement.parentElement;
           removeLocalTodos(todo);   // مربوط به فانکشن ریمو از لوکال استورج 
        todo.remove()
    }
}




function filterTodos(event) {
    // console.log(event.target.value)
    console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];

    todos.forEach((todo) => {
        switch (event.target.value) {

            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}





              //داده های جدید را در لوکال استورج ذخیره میکند

function saveLocalTodos(todo) {

    // localStorage.getItem('todos')     داده هایی که ذخیره کرده ایم را میاورد
    // localStorage.setItem('todos', JSON.stringify(todos))    اسم چیزی که میخواهیم ذخیره کنیم.چیزی که میخواهیم ذخیره کنیم
    
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))  //به استرینگ تبدیل میکند
    : [];

    savedTodos.push(todo); //  داده جدید را به داده های قبلی اضافه میکند  

    localStorage.setItem("todos", JSON.stringify(savedTodos));
 }
 // (38)  saveLocalTodos(todoInput.value);
 
 
 
 
 //زمانی که مرورگر لود میشود داده هایی که در لوکال استورج هستند را در دام نشان دهد
 
function getLocalTodos() { 

    let savedTodos = localStorage.getItem("todos")
   ? JSON.parse(localStorage.getItem("todos"))
   : [];

   savedTodos.forEach((todo) => {
         const todoDiv = document.createElement("div");   // 1.create
         todoDiv.classList.add("todo");
                                                  // 2.content
         const newTodo = `
         <li>${todo}</li>
         <span><i class="far fa-check-square"></i></span>
         <span><i class="far fa-trash-alt"></i></span>`;
         todoDiv.innerHTML = newTodo;

         todoList.appendChild(todoDiv);      // 3.where to display?
   });
}
 
 

 
  // داده هایی که دیلیت میکنیم از لوکال استورج هم پاک شوند تا وقتی رفرش میکنیم دوباره آن داده ها نیایند
  
       // (55)    removeLocalTodos(todo);
function removeLocalTodos(todo) {

     console.log(todo.children[0].innerText);

    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    
    const filteredTodos = savedTodos.filter(
        (tod) => tod !== todo.children[0].innerText
    );

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
}