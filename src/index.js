import './style.css';
import PubSub from 'pubsub-js';
import { TaskCreate } from './modules/task.js';


const taskToken = PubSub.subscribe("taskCreated", (msg, data) =>
{data.logTask()});

const task1 = TaskCreate("Example task 1", undefined, "Some sort of details", "today");
const task2 = TaskCreate("Example task 2", undefined, undefined, "today");
const task3 = TaskCreate("Example task 3", undefined, undefined, "today");