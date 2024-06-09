import './styles/base-styles.css';
import './styles/task-styles.css';
import './styles/project-styles.css';

import PubSub from 'pubsub-js';

export { taskContainer, jsonTaskLoad } from './modules/task';
import { createTask, jsonTaskLoad, taskContainer } from './modules/task';
import { taskListFill } from './modules/task-display';

export { projectContainer, updateProjectCount } from './modules/projects';
import { createProject, projectContainer, updateProjectCount } from './modules/projects';
import { projectListFill } from './modules/projects-display';

import { headerCreate } from './modules/header';

// Keeps track of various DOM elements.
export const domSelector = (() => {
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const completedLine = document.querySelector("#completedLine");
    let taskList = document.querySelector("#taskList");
    let projectList = document.querySelector("#projectList");

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








// TESTS

// Test creating header with function
headerCreate(domSelector.body, "Overview", "var(--secondary-background)")


// This needs to go after for now because projects are not in memory
projectListFill(domSelector.main);

// TEMP Testing task list create
taskListFill(domSelector.main);