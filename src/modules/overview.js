import { domSelector, headerCreate, projectContainer, projectListFill, taskListFill, createFloatingButton } from "../index.js";

// This module handles the creation of the overview page for the tasklist (the "main" page)

// Actual UI function
export function overviewPageCreate(){

    domSelector.fullWipe();

    createFloatingButton();

    // Grab the css variable we want for the header creation
    let root = document.documentElement;
    let primaryBackground = getComputedStyle(root).getPropertyValue('--primary-background');
    // Create header
    headerCreate(domSelector.body, "Overview", primaryBackground);

    // Set spacing between the projects and the tasks
    domSelector.main.style.gap = "3.125rem"

    projectsUI();

    tasksUI();

}





// Prints the projects with a title
function projectsUI(){
    const projectBox = document.createElement("div");
    projectBox.setAttribute("id", "projectBox");
    domSelector.main.appendChild(projectBox);

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = "Projects";
    projectBox.appendChild(projectTitle);

    projectListFill(document.querySelector("#projectBox"));

    projectBox.addEventListener("click", projectButton);
}






// Handles project button click event
function projectButton(event){
    // Button that is clicked
    const button = event.target.closest("button");
    // If a button was pressed
    if (button){
        const projectId = button.id;

        for (const project in projectContainer){
            if (projectContainer[project].id === projectId) {
                PubSub.publish("projectView", projectContainer[project].id);
                break;
            }
        }
    }
}

// // Sets the task to checked or unchecked based on UI input and publishes event
// function handleCheckboxChange(event) {
//     // Checkbox that is the event target
//     const checkbox = event.target;
//     const taskLine = checkbox.parentElement;
//     // Find task that matches the ID of the checkbox event target
//     const task = Object.values(taskContainer).find(targetTask => targetTask.id === checkbox.id);

//     if (checkbox.checked) {
//         moveCompletedTask(taskLine);
//         PubSub.publish("checkboxChecked", task);
//     } else {
//         moveIncompleteTask(taskLine);
//         PubSub.publish("checkboxUnchecked", task);
//     }
// };





// Prints the tasks with a title
function tasksUI(){
    const taskBox = document.createElement("div");
    taskBox.setAttribute("id", "taskBox");
    domSelector.main.appendChild(taskBox);

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = "Tasks";
    taskBox.appendChild(taskTitle);

    taskListFill(document.querySelector("#taskBox"));

}