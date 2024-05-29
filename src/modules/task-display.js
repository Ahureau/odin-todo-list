import PubSub from "pubsub-js";

import { domSelector, taskContainer } from "../index.js";

// This module creates tasks in the UI






// Create the actual tasklist in UI

// Create taskList in UI and let domSelector select it
function taskListCreate(domLocation) {

    // If there's already a taskList delete it
    if (domSelector.taskList){
        removeTaskList();
    }
    // Create taskList
    const taskList = document.createElement("ul");
    taskList.setAttribute("id", "taskList");
    domLocation.appendChild(taskList);
    setTaskList();
}

// Sets the task list event and DOM location
function setTaskList() {
    domSelector.updateTaskList();
    // Event listener for task list checkboxes
    domSelector.taskList.addEventListener("change", handleCheckboxChange);
};

// Removes the task list from the UI
function removeTaskList() {
    if (domSelector.taskList) {
        // Removes the event listener set in setTaskList
        domSelector.taskList.removeEventListener("change", handleCheckboxChange);
        domSelector.resetTaskList();
    };
}





// Checkbox functions

// Sets the task to checked or unchecked based on UI input and publishes event
function handleCheckboxChange(event) {
    // Checkbox that is the event target
    const checkbox = event.target;
    const taskLine = checkbox.parentElement;
    // Find task that matches the ID of the checkbox event target
    const task = Object.values(taskContainer).find(targetTask => targetTask.id === checkbox.id);

    if (checkbox.checked) {
        moveCompletedTask(taskLine);
        PubSub.publish("checkboxChecked", task);
    } else {
        moveIncompleteTask(taskLine);
        PubSub.publish("checkboxUnchecked", task);
    }
};

// Moves a task to be right after the completed line, hence marked as "complete"
function moveCompletedTask(task) {
    if (domSelector.completedLine){
        domSelector.completedLine.after(task);
    } else {
        // If this is the first completed task, it asks for a completedLine to be created
        createCompletedLine(domSelector.taskList);
        domSelector.completedLine.after(task);
    }
}

// Moves a task to be right before the completed line, hence marked as "incomplete"
function moveIncompleteTask(task) {
    domSelector.completedLine.before(task);
    // When there are no completed tasks, the completedLine is removed
    if (domSelector.completedLine === domSelector.taskList.lastChild){
        domSelector.completedLine.remove();
        domSelector.resetCompletedLine();
    }
}






// Completed line

// Creates the line that separates complete from incomplete tasks
function createCompletedLine(whereAdd) {
    const completedLine = document.createElement("p");
    completedLine.classList.add("subtext");
    completedLine.setAttribute("id", "completedLine");
    whereAdd.appendChild(completedLine);
    // Update domSelector with completed line reference
    domSelector.updateCompletedLine();

    const completedSpan = document.createElement("span");
    completedSpan.textContent = "Completed";
    completedLine.appendChild(completedSpan);
}





// Filter and main builder function

// Applies filters to each task
function filterTasks(printList, filters) {
    for (let i = printList.length - 1; i >= 0; i--) {
        const task = printList[i];
        let taskMatchesAllFilters = true;

        // Apply all filters to all tasks
        for (const filter of filters) {
            const filterKey = Object.keys(filter)[0];
            const filterValue = Object.values(filter)[0];

            // If the filter is not set, continue to the next filter
            if (filterValue === undefined) {
                continue;
            }

            // Checks if the value of the filter is the same as that of the task property
            if (task[filterKey] !== filterValue) {
                taskMatchesAllFilters = false;
                break;
            }
        }

        // Updates the printList if one of the filters was not matched
        if (!taskMatchesAllFilters) {
            printList.splice(i, 1);
        }
    }

    return printList;
}


// Fill the taskList created in taskListCreate based on date and project filters
export function taskListFill(domLocation, filterProject, filterDate) {

    taskListCreate(domLocation);

    // Defines a printList to iterate through
    let printList = Object.values(taskContainer);

    // Check for filters
    // To add more filters you need to add them here and as arguments for this function
    const filters = [
        {taskProject: filterProject}, 
        {taskDue: filterDate}
    ];
    
    filterTasks(printList, filters);
    
    // Only create the completed line if there is a task in the taskContainer that's completed
    for (const task of printList) {
        if (task.taskDone === true){
            createCompletedLine(domSelector.taskList);
            break;
        }
    }

    // Iterates over all the tasks that should be printed based on filters
    for (const task of printList) {
        // Create the task element
        const taskElement = uiTaskBuilder(task);

        // Decides where to place the task element
        if (task.taskDone){
            // If the task is done the completedLine should be present, so we add it after that
            domSelector.completedLine.after(taskElement);
            // Task is checked in UI
            const checkbox = taskElement.querySelector(`#${task.id}`);
            checkbox.checked = true;
        } else {
            // Insert the task element before the completed line
            domSelector.taskList.prepend(taskElement);
        }
    }
}






// This creates individual tasks

function uiTaskBuilder(task) {

    // The line element for a task item
    const taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
    // Will always try to place it inside a ui element with ID "taskList"
    // domSelector.taskList.appendChild(taskItem);

    // The input itself
    const taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.setAttribute("id", task.id);
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

    // Return the created task element
    return taskItem;
};