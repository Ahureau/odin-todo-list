import './base-styles.css';
import './task-styles.css';

import PubSub from 'pubsub-js';

import { createTask } from './modules/task';
import { taskContainer } from './modules/task';
export { taskContainer } from './modules/task';
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


// TEMP to test task creation
const task1 = createTask("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", undefined, "Some sort of details", "today");
const task2 = createTask("Example task 2", "Pool", undefined, "today");
const task3 = createTask("Example task 3", "Hockey", undefined, "Tomorrow");
const task4 = createTask("Example task 4", "Hockey", undefined, "Tomorrow");

task4.setDone();


//Testing task list create
taskListFill(domSelector.main, "today");


// PubSub to update the tasks to done or not done based on UI changes
const taskListUpdate = (msg, data) => {
    switch (msg){
        case "checkboxChecked":
            for (let taskObj in taskContainer){
                if (taskContainer[taskObj].id === data.id){
                    taskContainer[taskObj].setDone();
                    break;
                }
            }
            break;
        case "checkboxUnchecked":
            for (let taskObj in taskContainer) {
                if (taskContainer[taskObj].id === data.id) {
                    taskContainer[taskObj].setNotDone();
                    break;
                    }
            }
            break;
    }
}

const taskListUpdateCheckToken = PubSub.subscribe("checkboxChecked", taskListUpdate);
const taskListUpdateUncheckToken = PubSub.subscribe("checkboxUnchecked", taskListUpdate);



// Test subscribe

// const testSubscribe = (msg, data) => {
//     console.log(msg, data);
// }

// let testCheck = PubSub.subscribe("checkboxChecked", testSubscribe);
// let testUncheck = PubSub.subscribe("checkboxUnchecked", testSubscribe);