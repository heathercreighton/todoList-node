const fs = require('fs');


// read all todo list items
const readTodos = () =>{
    const todoList = JSON.parse(fs.readFileSync("./data/todo.json", "utf-8"));
    return todoList;
}

// read a todo list item by id
const readTodoById = (id) => {
    const todoList = readTodos();
    for (t of todoList) {
        if (t.id === id ){
            return t;
        };
    };
    return `No record found with id ${id}`;
}

// create a todo list item
const createTodo = (todoName, due, priority,) => {
    const todoList = readTodos();
    const sortTodo = todoList.sort((a, b) => {
        return b.id - a.id;
    });
    const newIndex = sortTodo[0].id + 1;
    const newTodo = {
        id: newIndex,
        name: todoName,
        due_date: due,
        priority: priority,
        completed: false
    };
    todoList.push(newTodo);
    todoList.sort((a, b) => {
        return a.id - b.id;
    });
    const sendTodos = JSON.stringify(todoList);
    fs.writeFileSync("./data/todo.json", sendTodos);
    return `The following item was added to the list ${JSON.stringify(newTodo)}`
}

// update todo list item by id, providing property and update data
const updateToDo = (id, prop, data) => {
    let todo;
    let property = prop
    const todoList = readTodos();
    for (t of todoList) {
        if (t.id === id ){
            t[property] = data;
            todo = t
        };
    };
    if (todo) {
        const sendTodos = JSON.stringify(todoList);
        fs.writeFileSync("./data/todo.json", sendTodos);
    }
    return todo ? `Todo with id ${todo.id.toString()} has been updated: ${property} is now ${data}` : `No record found with id ${id}`;
}


// delete a task based on id
const deleteToDo = (id) => {
    const todoList = readTodos();
    const index = todoList.findIndex(t => t.id === id);
    if (index != -1) {
        todoList.splice(index, 1);
        const sendTodos = JSON.stringify(todoList);
        fs.writeFileSync("./data/todo.json", sendTodos);
        return `Todo with id ${id} has been deleted`
    }
    return `No record found with id ${id}`;
}


const completedTodo = (isComplete) => {
    const todoList = readTodos();
    const todos = todoList.filter(t => t.completed === isComplete);
    return todos;
}

const sortPriority = (sortOrder = "descending") => {
    const todoList = readTodos();
    let sortedList = sortOrder === "ascending" ? todoList.sort((a, b) => {
        return a.priority - b.priority;
    }) : todoList.sort((a, b) => {
        return b.priority - a.priority;
    })
    return sortedList;
}

const sortDueDate = () => {
    return
}


module.exports = { createTodo, readTodos, readTodoById, updateToDo, deleteToDo, completedTodo, sortPriority, sortDueDate }
// --- tests output -------
// console.log(readTodos());
// console.log(readTodoById(6));
// console.log(updateToDo(3, "priority", 3));
// console.log(deleteToDo(8));
// console.log(createTodo("Have a bath", "04/01/2021",1));
// console.log(completedTodo(false));
// console.log(sortPriority());