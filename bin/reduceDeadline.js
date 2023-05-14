const fs = require("fs");
    // Read the contents of the file
    fs.readFile('tasks.txt', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading tasks:', err);
        return;
      }
  
      let tasks = data.trim().split('\n');
  
      // Update the remaining days for each task
      for (let i = 0; i < tasks.length; i++) {
        const taskParts = tasks[i].split(',');
        const task = taskParts[0];
        let deadline = parseInt(taskParts[1]);
  
        if (deadline > 0) {
          deadline--; // Reduce the remaining days by 1
          tasks[i] = `${task},${deadline}`; // Update the task entry
        }
      }
  
      // Write the updated tasks back to the file
      fs.writeFile('tasks.txt', tasks.join('\n'), 'utf8', (err) => {
        if (err) {
          console.error('Error writing tasks:', err);
          return;
        }
      });
    });
  
  