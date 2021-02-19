const { createTodo, readTodos, readTodoById, updateToDo, deleteToDo, completedTodo, sortPriority, sortDueDate } = require("./src/todo");
const inquirer = require("inquirer");


const action = async () => {
    try {
        const choice = await inquirer
            .prompt([
                {
                    type: "checkbox",
                    name: "action",
                    message: "Which action would you like to perform?",
                    choices: ["Create a todo item", "Get all todo items", "Get todos sorted by ascending priority", "Get todos sorted by descending priority", "Get all completed todos", "Get all incomplete todos", "Get one todo", "Update a todo", "Delete a todo", "Exit app"],
                }
    
            ]);
        switch (choice.action[0]) {
            case "Get all todo items":
                console.log(readTodos());
                break;
            case "Get todos sorted by ascending priority":
                console.log(sortPriority("ascending"));
                break;
            case "Get todos sorted by descending priority":
                console.log(sortPriority("ascending"));
                break;
            case "Get all completed todos":
                console.log(completedTodo(true));
                break;
            case "Get all incomplete todos":
                console.log(completedTodo(false));
                break;
            case "Get one todo":
               await getID("readOne");
                break;
            case "Update a todo":
               await  getID("updateOne");
                 break;
            case "Delete a todo":     
               await getID("deleteOne");
                break
            case "Create a todo item":
                await getDetails(idNum=null, "createOne");                     
                break;
            case "Exit app":
                console.log("Exiting app...")
                process.exit(0)        
        }
    } catch (err) {
        return err;
    }
};

const getID = async (action) => {
    try{
        const todoID = await inquirer
            .prompt([
                {
                    type: "input",
                    name: "id",
                    message: "What is the id number?",
                }

            ]);
        let idNum = parseInt(todoID.id)    
        switch (action) {
            case "readOne":
                console.log(readTodoById(idNum));
            case "deleteOne":
                console.log(deleteToDo(idNum));
            case "updateOne":
                getDetails(idNum, action);
        }
    } catch (err){
        return err;
    }
};

const getDetails = async (id, action) => {
    if (action ==="updateOne") {
        try{
            const update = await inquirer
            .prompt([
                {
                    type: "checkbox",
                    name: "property",
                    message: "What is the property to change",
                    choices: ["name", "due_date", "priority", "completed"]
                },
                {
                    type: "input",
                    name: "detail",
                    message: "Enter the  new data. If changing date, use the formate mm/dd/yyyy. If changing priority enter values 1-3"
                }

            ]);
            if (update.property[0] === "priority") {
                update.detail = parseInt(update.detail);
            } else if (update.property[0] === "completed"){
                update.detail = Boolean(update.detail)
            }
            

            console.log(updateToDo(id, update.property[0], update.detail)); 
           
        } catch (err) {
            return err;
        }  
         
    } else if (action === "createOne"){
        try {
            const createOne = await inquirer
            .prompt([
                {
                    type: "input",
                    name: "todoName",
                    message: "Enter the name of the task"
                },
                {
                    type: "input",
                    name: "due_date",
                    message: "Enter the due_date in mm/dd/yyyy formate"
                },
                {
                    type: "checkbox",
                    name: "priority",
                    message: "Select the priority (1 being high, 3 being low)",
                    choices: [1,2,3]
                }

            ]);
         console.log(createTodo(createOne.todoName, createOne.due_date, parseInt(createOne.priority[0])));   
        } catch (err) {
            return err;

        }
    }
}    

action()