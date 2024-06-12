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
    // Container for the task status elements
    const taskStatus = document.createElement("div");
    taskStatus.classList.add("taskStatus");
    domSelector.main.appendChild(taskStatus);

    // Subheader is the task name
    const taskName = document.createElement("h2");
    taskName.textContent = task.taskName;
    taskStatus.appendChild(taskName);

    // Due date line
    const taskDue = document.createElement("div");
    taskDue.classList.add("taskInfo");
    taskStatus.appendChild(taskDue);
    const taskDueTitle = document.createElement("h4");
    taskDueTitle.classList.add("taskInfoTitle");
    taskDueTitle.textContent = "Due date:";
    taskDue.appendChild(taskDueTitle);
    const taskDueDetails = document.createElement("p");
    taskDueDetails.classList.add("taskInfoDetails");
    taskDueDetails.textContent = task.taskDue;
    taskDue.appendChild(taskDueDetails);

    // Task status
    const taskDone = document.createElement("div");
    taskDone.classList.add("taskInfo");
    taskStatus.appendChild(taskDone);
    const taskDoneTitle = document.createElement("h4");
    taskDoneTitle.classList.add("taskInfoTitle");
    taskDoneTitle.textContent = "Status:";
    taskDone.appendChild(taskDoneTitle);
    const taskDoneDetails = document.createElement("p");
    taskDoneDetails.classList.add("taskInfoDetails");
    taskDoneDetails.textContent = statusReadable(task.taskDone);
    taskDone.appendChild(taskDoneDetails);

    // If there is a description, print it
    if (task.taskDesc) {
        const taskDesc = document.createElement("div");
        taskDesc.classList.add("taskInfo");
        taskStatus.appendChild(taskDesc);
        const taskDescTitle = document.createElement("h4");
        taskDescTitle.classList.add("taskInfoTitle");
        taskDescTitle.textContent = "Details:";
        taskDesc.appendChild(taskDescTitle);
        const taskDescDetails = document.createElement("p");
        taskDescDetails.classList.add("taskInfoDetails");
        taskDescDetails.textContent = task.taskDesc;
        taskDesc.appendChild(taskDescDetails);
    }
}





function statusReadable(trueOrFalse){
    switch (trueOrFalse){
        case true:
            return "Completed";
        case false:
            return "Incomplete";
    }
}


// PubSub corner

const projectPageCreateProjectViewToken = PubSub.subscribe("taskView", taskPageCreate);