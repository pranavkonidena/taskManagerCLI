const index = require("./index.js");
const fs = require("fs");
let count = 0;
function addTask() {
    fs.appendFile("tasks.txt" , String("\n" + index.task) , (err) => {
        if (err) throw err;
        else{
            console.log("The task is now added. To view the remaining tasks , run tman --op list");
        }   
    });
}

function printTasks() {
   fs.readFile("tasks.txt" , (err , data) => {
    if(err) console.log("You have no task pending. Add some tasks to see them here!")
    else{
        console.log(data.toString());
    }
   });
}

function deleteTasks() {
    fs.unlink("tasks.txt", (err) => {
        if (err) console.log("You have no tasks left to delete. Please add new tasks before deleting!")
        else{
            console.log("Tasks cleared!");
        }
     });
}

function completedTask() {
    fs.readFile("tasks.txt" , function (err , data){
        var linesExceptFirst = data.toString().split('\n').slice(2).join('\n');
        fs.writeFile("tasks.txt", linesExceptFirst, function(err, data) { if (err) console.log("The given task doesn't exist in the list. Check again.") });
    })
   
}

module.exports = {addTask , printTasks , deleteTasks , completedTask};
