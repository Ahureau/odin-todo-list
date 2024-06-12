// Styles
import './styles/base-styles.css';
import './styles/task-styles.css';
import './styles/project-styles.css';
import './styles/edit-styles.css';
// Pubsub
import PubSub from 'pubsub-js';
// Task functions
export { taskContainer, jsonTaskLoad } from './modules/task';
export { taskListFill } from './modules/task-display';
// Projects functions
export { projectContainer, updateProjectCount, jsonProjectLoad } from './modules/projects';
export { projectListFill } from './modules/projects-display';
// Header module
export { headerCreate } from './modules/header';
// Individual pages
import { overviewPageCreate } from './modules/overview';
import './modules/project-view';
import './modules/task-view';











// Keeps track of various DOM elements.
export const domSelector = (() => {
    const body = document.querySelector("body");
    let main = document.querySelector("main");
    const completedLine = document.querySelector("#completedLine");
    let taskList = document.querySelector("#taskList");
    let projectList = document.querySelector("#projectList");

    function fullWipe() {
        const main = document.createElement("main");
        body.replaceChildren(main);
        domSelector.main = document.querySelector("main");
    }

    function resetTaskList() {
        domSelector.taskList.remove();
        domSelector.taskList = null;
    };

    function updateTaskList() {
        domSelector.taskList = document.querySelector("#taskList");
    };

    function resetProjectList() {
        domSelector.projectList.remove();
        domSelector.projectList = null;
    }

    function updateProjectList() {
        domSelector.projectList = document.querySelector("#projectList");
    }

    function resetCompletedLine() {
        domSelector.completedLine = null;
    }

    function updateCompletedLine() {
        domSelector.completedLine = document.querySelector("#completedLine");
    }

    return {
        body,
        main,
        completedLine,
        taskList,
        projectList,

        fullWipe,

        resetTaskList,
        updateTaskList,

        resetProjectList,
        updateProjectList,

        resetCompletedLine,
        updateCompletedLine,
    };
})();







// Creates an ID based on time of creation

// For testing purposes we add a unique number as all tasks are created at the same time
// Create a unique ID
const createUniqueId = (() => {
    let uniqueID = 1;

    function add() {
        return uniqueID++;
    }

    return {
        add
    }
})();

export function createID(name) {
    const uniqueID = `L${name.length}ID${Date.now()}${createUniqueId.add()}`;
    return uniqueID;
}







// Back to overview button

export function backOverviewButton(whereAdd){
    const button = document.createElement("button");
    button.classList.add("backButton");
    whereAdd.appendChild(button);

    const leftChevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    leftChevron.setAttribute("width", "24");
    leftChevron.setAttribute("height", "24");
    leftChevron.setAttribute("viewBox", "0 -960 960 960");
    button.appendChild(leftChevron);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z");
    leftChevron.appendChild(path);

    const copy = document.createElement("p");
    copy.classList.add("subtext");
    copy.textContent = "back to overview";
    button.appendChild(copy);

    // If the button gets pressed, load the overview page
    button.addEventListener("click", overviewPageCreate);
}





// Always the first page (TEMP disabled for other page creation)
// overviewPageCreate();

// TESTS

