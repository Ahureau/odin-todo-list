import './style.css';
import { TaskCreate } from './modules/task.js';

const task1 = TaskCreate("Example task 1", undefined, undefined, "today");
const task2 = TaskCreate("Example task 2", undefined, undefined, "today");

task1.getTask();