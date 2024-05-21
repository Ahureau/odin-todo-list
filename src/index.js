import './base-styles.css';
import { createTask } from './modules/task';
import PubSub from 'pubsub-js';


const taskToken = PubSub.subscribe("taskCreated", (msg, data) =>
{data.logTask()});

const task1 = createTask("Example task 1", undefined, "Some sort of details", "today");
const task2 = createTask("Example task 2", undefined, undefined, "today");
const task3 = createTask("Example task 3", undefined, undefined, "today");
