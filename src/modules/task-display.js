import PubSub from "pubsub-js";

import { domSelector, taskContainer } from "../index.js";

// This module creates tasks in the UI






// This creates a container for the functions

// Create taskList in UI and let domSelector select it
function taskListCreate(domLocation) {

    // If there's already a taskList delete it
    if (domSelector.taskList){
        domSelector.removeTaskList();
    }
    // Create taskList
    const taskList = document.createElement("ul");
    taskList.setAttribute("id", "taskList");
    domLocation.appendChild(taskList);
    domSelector.setTaskList();
}

// Fill the taskList created in taskListCreate based on date and project filters
export function taskListFill(domLocation, projectFilter, dateFilter) {

    taskListCreate(domLocation);

    // Cycle through all the tasks in taskContainer only displaying valid ones
    projectFilter = typeof projectFilter !== 'undefined' ? projectFilter : false;
    dateFilter = typeof dateFilter !== 'undefined' ? dateFilter : false;


    for (const task of Object.values(taskContainer)) {
        uiTaskBuilder(task);
    }
}




// This creates individual tasks

export function uiTaskBuilder(task) {

    // The line element for a task item
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
    // Will always try to place it inside a ui element with ID "taskList"
    domSelector.taskList.appendChild(taskItem);

    // The input itself
    const taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.setAttribute("id", task.taskName); // This can cause issues if 2 tasks have the same name
    taskCheck.classList.add("taskCheck");
    taskItem.appendChild(taskCheck);

    // The task details
    const taskShortDetails = document.createElement("div");
    taskShortDetails.classList.add("taskShortDetails");
    taskItem.appendChild(taskShortDetails);

    const taskLabel = document.createElement("label");
    taskLabel.setAttribute("for", taskCheck.id);
    taskLabel.classList.add("taskLabel");
    taskLabel.textContent = task.taskName;
    taskShortDetails.appendChild(taskLabel);

    const taskTags = document.createElement("div");
    taskTags.classList.add("taskTags");
    taskShortDetails.appendChild(taskTags);

    const projectTag = document.createElement("div");
    projectTag.classList.add("projectTag");
    taskTags.appendChild(projectTag);

    const projectSubtext = document.createElement("p");
    projectSubtext.classList.add("subtext");
    projectSubtext.textContent = task.taskProject;
    projectTag.appendChild(projectSubtext);

    const dateTag = document.createElement("div");
    dateTag.classList.add("dateTag");
    taskTags.appendChild(dateTag);

    const dateSubtext = document.createElement("p");
    dateSubtext.classList.add("subtext");
    dateSubtext.textContent = task.taskDue;
    dateTag.appendChild(dateSubtext);

    // Chevron link to task details
    const taskDetailsLink = document.createElement("a");
    taskDetailsLink.setAttribute("href", ""); // To be set later when that page actually can be created
    taskItem.appendChild(taskDetailsLink);

    const svgContainer = document.createElement("div");
    svgContainer.classList.add("svgContainer");
    taskDetailsLink.appendChild(svgContainer);

    const rightChevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    rightChevron.setAttribute("width", "24");
    rightChevron.setAttribute("height", "24");
    rightChevron.setAttribute("viewBox", "0 0 24 24");
    svgContainer.appendChild(rightChevron);

    const rightChevronPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    rightChevronPath.setAttribute("d", "M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z");
    rightChevron.appendChild(rightChevronPath);
};





// This creates the line that separates complete from incomplete tasks

// function completedLine() {

// }

// <p class="subtext completedLine"><span>Completed</span></p>