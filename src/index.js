import './base-styles.css';
import './task-styles.css';

import PubSub from 'pubsub-js';

export { taskContainer, jsonLoad } from './modules/task';
import { createTask, jsonLoad } from './modules/task';
import { taskListFill } from './modules/task-display';

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


// TEMP Testing task list create
(async () => {
    await taskListFill(domSelector.main);
})();