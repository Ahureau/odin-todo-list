import { domSelector, headerCreate, projectListFill, taskListFill } from "../index.js";

// This module handles the creation of the overview page for the tasklist (the "main" page)

export function overviewPageCreate(){

    domSelector.fullWipe();

    headerCreate(domSelector.body, "Overview", "--primary-background");

    domSelector.main.style.gap = "3.125rem"

    projectsUI();

    tasksUI();

}

function projectsUI(){
    const projectBox = document.createElement("div");
    projectBox.setAttribute("id", "projectBox");
    domSelector.main.appendChild(projectBox);

    const projectTitle = document.createElement("h2");
    projectTitle.textContent = "Projects";
    projectBox.appendChild(projectTitle);

    projectListFill(document.querySelector("#projectBox"));
}

function tasksUI(){
    const taskBox = document.createElement("div");
    taskBox.setAttribute("id", "taskBox");
    domSelector.main.appendChild(taskBox);

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = "Tasks";
    taskBox.appendChild(taskTitle);

    taskListFill(document.querySelector("#taskBox"));

}