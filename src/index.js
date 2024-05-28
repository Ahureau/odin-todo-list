import './base-styles.css';
import './task-styles.css';

import PubSub from 'pubsub-js';

import { createTask } from './modules/task';
import { taskContainer } from './modules/task';
export { taskContainer } from './modules/task';
import { uiTaskBuilder, taskListFill } from './modules/task-display';

// Keeps track of various DOM elements.
export const domSelector = (() => {
    const main = document.querySelector("main");
    let taskList = document.querySelector("#taskList");

    function resetTaskList(){
        domSelector.taskList.remove();
        domSelector.taskList = null;
    };

    function updateTaskList(){
        domSelector.taskList = document.querySelector("#taskList");
    }

    return {
        taskList,
        main,
        resetTaskList,
        updateTaskList,
  };
})();





// TEMP to test task creation
const task1 = createTask("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", undefined, "Some sort of details", "today");
const task2 = createTask("Example task 2", undefined, undefined, "today");
const task3 = createTask("Example task 3", undefined, undefined, "today");


//Testing task list create
taskListFill(domSelector.main);

const taskListUpdate = (msg, data) => {
    // THIS NEEDS TO REFRESH THE POSITION OF THE TASK
}

const taskListUpdateCheck = PubSub.subscribe("checkboxChecked", taskListUpdate);
const taskListUpdateUncheck = PubSub.subscribe("checkboxUnchecked", taskListUpdate);



// Test subscribe

// const testSubscribe = (msg, data) => {
//     console.log(msg, data);
// }

// let testCheck = PubSub.subscribe("checkboxChecked", testSubscribe);
// let testUncheck = PubSub.subscribe("checkboxUnchecked", testSubscribe);