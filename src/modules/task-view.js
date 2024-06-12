import PubSub from "pubsub-js";
import { jsonProjectLoad, } from "./projects";
import { domSelector, taskContainer, backOverviewButton, headerCreate } from "../index";

// This module handles the creation of the single task page

// Actual ui function
function taskPageCreate(msg, taskId){
    jsonProjectLoad();

    domSelector.fullWipe();

    const task = findTaskById(taskId);

    // Adds back to overview button and reduces top margin
    backOverviewButton(domSelector.main);
    domSelector.main.classList.add("smallMargin")

    headerCreate(domSelector.body, "Task", "--primary-background");

    domSelector.main.style.gap = "1.25rem";

    buildTaskUi(task);
}


// Finds which taks corresponds to a given ID
function findTaskById(taskId) {
    for (const indTask in taskContainer) {
        if (taskContainer[indTask].id === taskId) {
            return taskContainer[indTask];
        }
    }
}

function buildTaskUi(task){
    console.log(task);

    const taskStatus = document.createElement("div");
    taskStatus.classList.add("taskStatus");
    domSelector.main.appendChild(taskStatus);

    const taskName = document.createElement("h2");
    taskName.textContent = task.taskName;
    taskStatus.appendChild(taskName);

    const taskDue = document.createElement("div");
    taskDue.classList.add("taskInfo");
    taskStatus.appendChild(taskDue);
    const taskDueTitle = document.createElement("h4");
    taskDueTitle.classList.add("taskInfoTitle");
    taskDueTitle.textContent = "Due date";
    taskDue.appendChild(taskDueTitle);
    const taskDueDetails = document.createElement("p");
    taskDueDetails.classList.add("taskInfoDetails");
    taskDueDetails.textContent = task.taskDue;
    taskDue.appendChild(taskDueDetails);
}



//     // Set spacing between the projects and the tasks
//     domSelector.main.style.gap = "1.25rem"

//     tasksUI(project);

// }


// PubSub corner

const projectPageCreateProjectViewToken = PubSub.subscribe("taskView", taskPageCreate);