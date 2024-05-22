import './base-styles.css';

import PubSub from 'pubsub-js';

import { createTask } from './modules/task';

import chevronRight from './images/Chevron right - Google.svg';

// Logs the task to console when created
const taskToken = PubSub.subscribe("taskCreated", (msg, data) =>
{data.logTask()});

// TEMP to test task creation
const task1 = createTask("Example task 1", undefined, "Some sort of details", "today");
const task2 = createTask("Example task 2", undefined, undefined, "today");
const task3 = createTask("Example task 3", undefined, undefined, "today");

// TEMP to test chevron
const imageElement = document.querySelector('input[type="image"]');

imageElement.src = chevronRight;