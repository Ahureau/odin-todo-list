import PubSub from "pubsub-js";

import { createID, taskContainer } from "../index.js";

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

// Updates the number of tasks in each project IDEALLY USE PUBSUB TO RUN THIS WHEN A NEW TASK IS CREATED
const updateProjectCount = () => {
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

// PubSub to update project count
const autoUpdateProjectCount = (msg, data) => {
    updateProjectCount();
};

const updateProjectCountTaskCreatedToken = PubSub.subscribe("taskCreated", autoUpdateProjectCount);