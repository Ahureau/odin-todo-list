import PubSub from "pubsub-js";

import { domSelector, projectContainer, updateProjectCount } from "../index.js";
import { jsonProjectLoad } from "./projects.js";


// This module adds the projects to the UI



// Create the actual projectList in UI

// Create projectList in UI and let domSelector select it
export function projectListCreate(domLocation) {

    // If there's already a projectList delete it
    if (domSelector.projectList) {
        removeProjectList();
    }
    // Create projectList
    const projectList = document.createElement("ul")
    projectList.setAttribute("id", "projectList");
    domLocation.appendChild(projectList);
    setProjectList();
}

// Sets DOM location for project list (CURRENTLY HAS SAME FUNCTION AS IN DOMSELECTOR BUT LATER WILL HANDLE EVENT LISTENER)
function setProjectList() {
    domSelector.updateProjectList();
}

// Removes the project list (CURRENTLY HAS SAME FUNCTION AS IN DOMSELECTOR BUT LATER WILL HANDLE EVENT LISTENER)
function removeProjectList() {
    if (domSelector.projectList) {
        domSelector.resetProjectList();
    };
}




// Fill the project list with the projects
export function projectListFill(domLocation) {

    jsonProjectLoad();

    projectListCreate(domLocation);

    updateProjectCount();

    for (const key in projectContainer) {
        const project = projectContainer[key];
        const projectElement = uiProjectBuilder(project);
        domSelector.projectList.appendChild(projectElement);
    }
};



// Creates individual projects in the UI

function uiProjectBuilder(project) {
    // The list item element for a task item
    const projectListItem = document.createElement("li");
    projectListItem.classList.add("projectListItem");

    // The button itself
    const projectButton = document.createElement("button");
    projectButton.classList.add("projectButton");
    projectButton.setAttribute("id", project.id);
    projectListItem.appendChild(projectButton);

    const projectName = document.createElement("h3");
    projectName.textContent = project.projectName;
    projectButton.appendChild(projectName);

    // Project count
    const projectCount = document.createElement("div");
    projectCount.classList.add("projectCount");

    const projectCountText = document.createElement("p");
    projectCountText.classList.add("subtext", "projectCountText");
    projectCountText.textContent = project.taskCount;
    projectCount.appendChild(projectCountText)
    projectButton.appendChild(projectCount);

    // Return the created task element
    return projectListItem;
}






// PubSub corner

// PubSub to update project count in UI
const triggerUpdateProjectCount = (msg, data) => {

    // Always update the project count
    updateProjectCount();

    // If the project list is present, update it
    if (domSelector.projectList) {
        // Creates an array out of projectCounts present on the page
        const projectCounts = domSelector.projectList.querySelectorAll(".projectCountText");

        for (const count of projectCounts){
            // Selects the button in which the specific count is to later grab its id
            const grandparent = count.parentNode.parentNode;
            for (const key in projectContainer) {
                const project = projectContainer[key];
                // Iterates through all the projects in project Container until there's a match
                if (project.id === grandparent.id){
                    // Updates the project count andd stops looking
                    count.textContent = project.taskCount;
                    break;
                }
            }
        }
    }
};

const projectListUpdateCheckToken = PubSub.subscribe("checkboxChecked", triggerUpdateProjectCount);
const projectListUpdateUncheckToken = PubSub.subscribe("checkboxUnchecked", triggerUpdateProjectCount);
const projectListUpdateTaskCreatedToken = PubSub.subscribe("taskCreated", triggerUpdateProjectCount);
const projectListUpdateTaskListCreatedToken = PubSub.subscribe("taskListCreated", triggerUpdateProjectCount);