import './base-styles.css';
import './task-styles.css';

import PubSub from 'pubsub-js';

export { taskContainer, jsonLoad } from './modules/task';
import { createTask, jsonLoad } from './modules/task';
import { taskListFill } from './modules/task-display';
import { createProject, projectContainer } from './modules/projects';

// Keeps track of various DOM elements.
export const domSelector = (() => {
    const main = document.querySelector("main");
    const completedLine = document.querySelector("#completedLine");
    let taskList = document.querySelector("#taskList");

    function resetTaskList(){
        domSelector.taskList.remove();
        domSelector.taskList = null;
    };

    function updateTaskList(){
        domSelector.taskList = document.querySelector("#taskList");
    };

    function resetCompletedLine(){
        domSelector.completedLine = null;
    }

    function updateCompletedLine(){
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


// TEMP Testing task list create
taskListFill(domSelector.main);

createProject("Some project");