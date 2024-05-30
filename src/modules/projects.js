import PubSub from "pubsub-js";

import { createID } from "../index.js";

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

    projectContainer[project.projectName] = project;

    // Publish an event when a project is created
    PubSub.publish("projectCreated", project);

    return project;
}