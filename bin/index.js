#! /usr/bin/env node
const yargs = require("yargs");
const {addTask , printTasks , deleteTasks , completedTask} = require("./utils.js");

const usage = "Usage -   tman --op <command> --dline-days <deadline in days remaining> --task <describe the task> "


const options = yargs
                .help(true)
                .usage(usage)
                .option("op" , {description : "This option specifies the type of operation the CLI does. List lists all the tasks, while insert adds a new task and delete deletes all the tasks"})
                .option("dline-days" , {description: "This allows you to specify the deadline in days remaining"})
                .option("dline-date" , {description : "Allows to specify the deadline in DDMMYYYY format."})
                .option("task" , {description: "Describe the task that you need to complete"})
                .option("complete" , {description: "This means , you have completed that task. Enter the number of the task and itll be marked complete"});





if(yargs.argv.op == "insert"){
   if(yargs.argv.task == undefined){
        console.log("Task description can't be empty. Please try again.")
   }
//    else if(yargs.argv.dline-days == undefined && yargs.argv.dline-date == undefined){
//         console.log("Please enter the deadline for the task");
//    }
//    else if(yargs.argv.dline-days != undefined && yargs.argv.dline-date != undefined){
//         console.log("Please enter the deadline in only one format either in days or the date.")
//    }
   else{
    module.exports.task = yargs.argv.task;
    // if(yargs.argv.dline-days != undefined){
    //     module.exports.dline_days = yargs.argv.dline-days;
    // }
    // else{
    //     module.exports.dline_date = yargs.argv.dline-date;
    // }
    addTask();
   }
}

else if (yargs.argv.op == "list"){
    printTasks();
}

else if(yargs.argv.op == "delete"){
    deleteTasks();
}

else if (yargs.argv.complete != undefined){
    completedTask();
}

else{
    console.log("Please type tman --help for usage details");
}


