import './styles/base-styles.css';
import './styles/task-styles.css';
import './styles/project-styles.css';

import PubSub from 'pubsub-js';

export { taskContainer, jsonLoad } from './modules/task';
import { createTask, jsonLoad, taskContainer } from './modules/task';
import { taskListFill } from './modules/task-display';
export { projectContainer } from './modules/projects';
import { createProject, projectContainer, updateProjectCount } from './modules/projects';

// Keeps track of various DOM elements.
export const domSelector = (() => {
    const main = document.querySelector("main");
    const completedLine = document.querySelector("#completedLine");
    let taskList = document.querySelector("#taskList");

    function resetTaskList() {
        domSelector.taskList.remove();
        domSelector.taskList = null;
    };

    function updateTaskList() {
        domSelector.taskList = document.querySelector("#taskList");
    };

    function resetCompletedLine() {
        domSelector.completedLine = null;
    }

    function updateCompletedLine() {
        domSelector.completedLine = document.querySelector("#completedLine");
    }

    return {
        main,
        completedLine,
        taskList,
        resetTaskList,
        updateTaskList,
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




// The personal project always exists
createProject("Personal");
createProject("Pool");
createProject("Hockey");



// TESTS

// TEMP Testing task list create
taskListFill(domSelector.main);