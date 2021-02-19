// const fs = require("fs");

// const person = [{
//     id: 1,
//     name: "Heather",
//     age: 46,
//     location: "Smyrna"
//     },
//     {
//         id: 2,
//         name: "Nicole",
//         age: 50,
//         location: "Marietta"
//     }
// ]

// const deletePerson = (array, id) => {
//     const index = array.findIndex(p => p.id === id);
//     array.splice(index, 1);
//     return array;

// }  

// const delPerson = deletePerson(person, 2);
// console.log(delPerson);
// const data = JSON.stringify(person)

// fs.writeFileSync("./important.txt", data);

// const readData = JSON.parse(fs.readFileSync("./important.txt", 'utf-8'));
// console.log(readData);

const inquirer = require("inquirer");
const { readTodos, readTodoById, updateToDo, deleteToDo, completedTodo, sortPriority, sortDueDate } = require("./todo");


const action = async () => {
    const choice = await inquirer
        .prompt([
            {
                type: "checkbox",
                name: "action",
                message: "Which action would you like to perform?",
                choices: ["Get all todo items", "Get todos sorted by priority", "Get todos based on status", "Get one todo", "Update a todo", "Delete a todo"],
            }
    
        ]);
    switch (choice.action[0]){
        case "Get all todo items":
            console.log(readTodos());
            break;
        case "Get todos sorted by priority":
            console.log(sortPriority("ascending"));
            break;
    }
};

action()