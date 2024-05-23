import './base-styles.css';
import './task-styles.css';

import PubSub from 'pubsub-js';

import { createTask } from './modules/task';

import { uiTaskBuilder } from './modules/task-display';

export const domSelector = (() => {
    const taskList = document.querySelector(".taskList");

    return { taskList };
})()

// Logs the task to console when created
const taskToken = PubSub.subscribe("taskCreated", (msg, data) =>
{data.logTask()});

// TEMP to test task creation
const task1 = createTask("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", undefined, "Some sort of details", "today");
const task2 = createTask("Example task 2", undefined, undefined, "today");
const task3 = createTask("Example task 3", undefined, undefined, "today");

uiTaskBuilder(task1);
uiTaskBuilder(task2);
uiTaskBuilder(task3);