import { domSelector, headerCreate, taskListFill, jsonProjectLoad, createFloatingButton, projectContainer, backOverviewButton } from "../index.js";

// This module handles the creation of the single project page

// Actual UI function
function projectPageCreate(msg, projectId) {

    // Make sure we have the latest data
    jsonProjectLoad();

    domSelector.fullWipe();

    createFloatingButton();

    const project = findProjectById(projectId);

    // Adds back to overview button and reduces top margin
    backOverviewButton(domSelector.main);
    domSelector.main.classList.add("smallMargin")


    // Grab the css variable we want for the header creation
    let root = document.documentElement;
    let primaryBackground = getComputedStyle(root).getPropertyValue('--primary-background');
    // Create header
    headerCreate(domSelector.body, project.projectName, primaryBackground);

    // Set spacing between the projects and the tasks
    domSelector.main.style.gap = "1.25rem"

    tasksUI(project);

}

// Prints the tasks for that project
function tasksUI(project) {
    const taskBox = document.createElement("div");
    taskBox.setAttribute("id", "taskBox");
    domSelector.main.appendChild(taskBox);

    taskListFill(document.querySelector("#taskBox"), project.projectName);

}

// Finds which project corresponds to a given ID
function findProjectById(projectId) {
    for (const indProject in projectContainer) {
        if (projectContainer[indProject].id === projectId) {
            return projectContainer[indProject];
        }
    }
}





// PubSub corner


const projectPageCreateProjectViewToken = PubSub.subscribe("projectView", projectPageCreate);