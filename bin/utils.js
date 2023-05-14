const index = require("./index.js");
const fs = require("fs");

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



function completedTask(lineNumber) {
  // Read the contents of the file
  fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
      console.log("You didn't have any tasks. Add some tasks and finish them.")
      return;
    }

    // Split the file contents into an array of lines
    const lines = data.trim().split('\n');

    // Check if the line number is within a valid range
    if (lineNumber < 1 || lineNumber > lines.length) {
      console.error('Invalid task number.');
      return;
    }


    lines.splice(lineNumber, 1);

    fs.writeFile('tasks.txt', lines.join('\n'), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }
      console.log('Well done for completeting this task');
    });
  });
}




function addTaskWithDeadline(task, deadline) {
  // Check if tasks.txt file exists
  fs.access('tasks.txt', fs.constants.F_OK, (err) => {
    if (err) {
      // tasks.txt file doesn't exist, create it
      fs.writeFile('tasks.txt', 'Your tasks are: ', 'utf8', (err) => {
        if (err) {
          console.error('Error creating tasks file:', err);
          return;
        }
        // File created successfully, continue with adding the task
        addTask(task, deadline);
      });
    } else {
      // tasks.txt file exists, continue with adding the task
      addTask(task, deadline);
    }
  });
}

function addTask(task, deadline) {
  // Read existing tasks from the file
  fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading tasks:', err);
      return;
    }

    let tasks = data.trim().split('\n');

    // Find the appropriate position to insert the new task
    let insertIndex = 0;
    if (tasks.length > 0) {
      insertIndex = tasks.findIndex((existingTask) => {
        const existingDeadline = parseInt(existingTask.split(',')[1]);
        return existingDeadline > deadline;
      });
      if (insertIndex === -1) {
        // If no task with a higher deadline found, add it at the end
        insertIndex = tasks.length;
      }
    }

    // Insert the new task at the determined index
    tasks.splice(insertIndex, 0, `${task},${deadline}`);

   
    fs.writeFile('tasks.txt', tasks.join('\n'), 'utf8', (err) => {
      if (err) {
        console.error('Error writing tasks:', err);
        return;
      }
      console.log('Task added successfully.');
    });
  });
}


function calculateDaysFromDate(dateString) {
    const today = new Date();
    const dateParts = String(dateString).match(/(\d{2})(\d{2})(\d{4})/);
    const day = parseInt(dateParts[1]);
    const month = parseInt(dateParts[2]) - 1; 
    const year = parseInt(dateParts[3]);
    const date = new Date(year, month, day);
    
    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff;
  }



module.exports = {printTasks , deleteTasks , completedTask , addTaskWithDeadline , calculateDaysFromDate};
