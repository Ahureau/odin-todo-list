import './base-styles.css';
import './task-styles.css';

import PubSub from 'pubsub-js';

import { createTask } from './modules/task';
export { taskContainer } from './modules/task';
import { uiTaskBuilder, taskListFill } from './modules/task-display';

// Keeps track of various DOM elements.
export const domSelector = (() => {
  const main = document.querySelector("main");
  let taskList = document.querySelector("#taskList");

  function removeTaskList() {
    if (domSelector.taskList) {
        domSelector.taskList.remove();
        domSelector.taskList = null;
    } ;
  }

  function setTaskList() {
    domSelector.taskList = document.querySelector("#taskList");
  }

  return {
    taskList,
    main,
    removeTaskList,
    setTaskList,
  };
})();








// TEMP to test task creation
const task1 = createTask("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", undefined, "Some sort of details", "today");
const task2 = createTask("Example task 2", undefined, undefined, "today");
const task3 = createTask("Example task 3", undefined, undefined, "today");

//Testing task list create
taskListFill(domSelector.main);

// uiTaskBuilder(task1);
// uiTaskBuilder(task2);
// uiTaskBuilder(task3);

// // Testing to see if the mutation observer works
// function test() {
//   if (domSelector.taskList) {
//     // Remove the taskList from the DOM, but keep the variable
//     domSelector.removeTaskList();
//   } else {
//     // Create a new taskList and add it to the DOM
//     const taskList = document.createElement("ul");
//     taskList.setAttribute("id", "taskList");
//     domSelector.main.prepend(taskList);
//     domSelector.setTaskList();
//     uiTaskBuilder(task1);
//     uiTaskBuilder(task2);
//     uiTaskBuilder(task3);
//   }
// }

// const testButton = document.querySelector("#test");
// testButton.addEventListener("click", test);
