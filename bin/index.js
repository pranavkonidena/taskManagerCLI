#! /usr/bin/env node
const yargs = require("yargs");
const {printTasks , deleteTasks , completedTask , addTaskWithDeadline , calculateDaysFromDate} = require("./utils.js");

const usage = "Usage -   tman --op <command> --dline-days <deadline in days remaining> --task <describe the task> "


const options = yargs
                .help(true)
                .usage(usage)
                .option("op" , {description : "This option specifies the type of operation the CLI does. List lists all the tasks, while insert adds a new task and delete deletes all the tasks"})
                .option("dline_days" , {description: "This allows you to specify the deadline in days remaining"})
                .option("dline_date" , {description : "Allows to specify the deadline in DDMMYYYY format."})
                .option("task" , {description: "Describe the task that you need to complete"})
                .option("complete" , {description: "This means , you have completed that task. Enter the number of the task and itll be marked complete"});





if(yargs.argv.op == "insert"){
   if(yargs.argv.task == undefined){
        console.log("Task description can't be empty. Please try again.")
   }

   else if(yargs.argv.dline_days == undefined && yargs.argv.dline_date == undefined){
        console.log("Please enter a deadline for the task.");
   }

   else if(yargs.argv.dline_days != undefined){
    addTaskWithDeadline(yargs.argv.task , yargs.argv.dline_days);
   }

   else if(yargs.argv.dline_date != undefined){
        let dline = calculateDaysFromDate(yargs.argv.dline_date);
        if(dline < 0){
            console.log("The deadline is already over.")
        }
        else{
            addTaskWithDeadline(yargs.argv.task , dline);
        }
        
   }
}

else if (yargs.argv.op == "list"){
    printTasks();
}

else if(yargs.argv.op == "delete"){
    deleteTasks();
}

else if (yargs.argv.complete != undefined){
    completedTask(yargs.argv.complete);
}

else{
    console.log("Please type tman --help for usage details");
}

