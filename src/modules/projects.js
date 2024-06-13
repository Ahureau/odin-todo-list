import PubSub from "pubsub-js";

import { createID, domSelector, taskContainer, overviewPageCreate } from "../index.js";
import { projectListFill } from "./projects-display.js";

export let projectContainer = {};

// Methods in the prototype of the projects
const projectActions = {
    logProject() {
        console.log(
            `Project: ${this.projectName}`
        )
    }
}

// Factory function for creating projects
export const createProject = (projectName) => {
    let project = Object.create(projectActions);

    project.projectName = projectName;
    project.id = createID(project.projectName);
    project.taskCount = 0;

    projectContainer[project.projectName] = project;

    // Publish an event when a project is created
    PubSub.publish("projectCreated", project);

    return project;
}

// Updates the number of tasks in each project - MOVE TO PUBSUB
export const updateProjectCount = () => {
    for (const project in projectContainer) {
        let taskCount = 0;
        for (const task in taskContainer) {
            const taskObj = taskContainer[task];
            // If a task is within that project and isn't done we count it
            if (taskObj.taskDone === false &&
                taskObj.taskProject === projectContainer[project].projectName) {
                taskCount++
            }
        }
        projectContainer[project].taskCount = taskCount;
    }
}







// PubSub corner


// Project list memory

// PubSub to save JSON on checkbox interaction
const jsonProjectSave = (msg, data) => {
    const projectJson = JSON.stringify(projectContainer);
    localStorage.setItem("projectStored", projectJson);
};

// Save on project creation
const jsonProjectSaveCreationToken = PubSub.subscribe("projectCreated", jsonProjectSave);

export const jsonProjectLoad = () => {
    // jsonProjectLoad will only load the JSON if there's information in the local storage & the projectContainer is empty.
    // This means this only runs on first operation
    if (localStorage.getItem("projectStored")) {
        const projectJson = localStorage.getItem("projectStored");
        const projectParsed = JSON.parse(projectJson);
        projectContainer = {};
        Object.keys(projectParsed).forEach(key => {
            const project = Object.create(projectActions);
            Object.assign(project, projectParsed[key]);
            projectContainer[key] = project;
        });
        // TESTING NOTE Personal will always be present, but pool and hockey will be removed.
    } else { 
        createProject("Personal");
        createProject("Pool");
        createProject("Hockey");
    }
}




// Call for project creation from edit page
const createProjectToken = PubSub.subscribe("createProjectCall", createProjectReturnOverview);
// Create the project and return to the Overview page
function createProjectReturnOverview(msg, projectName){
    createProject(projectName);
    jsonProjectSave();
    overviewPageCreate();
}