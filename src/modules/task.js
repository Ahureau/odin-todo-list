import PubSub from "pubsub-js";

import { createID, projectContainer, overviewPageCreate } from "../index.js";

// This module handles task creation



// This is the task container object

export let taskContainer = {};







// This creates individual tasks

// Methods are in the prototype of the tasks
const taskActions = {
    logTask() {
        console.log(`
    Task: ${this.taskName}
    Project: ${this.taskProject}
    Due: ${this.taskDue}
    Details: ${this.taskDesc}
    Completed: ${this.taskDone}
    `)
    },
    setDone() {
        this.taskDone = true;
    },
    setNotDone() {
        this.taskDone = false;
    },
};

// Factory function for creating tasks
export function createTask(taskName, taskProject, taskDesc, taskDue) {
    let task = Object.create(taskActions);

    task.taskName = taskName;
    task.taskProject = taskProject || "Personal";
    task.taskDesc = taskDesc || "";
    task.taskDue = taskDue;
    task.taskDone = false;
    task.id = createID(task.taskName);

    taskContainer[task.taskName] = task;

    // Published an event when a task is created
    PubSub.publish("taskCreated", task);

    return task;
};





// PubSub corner


// PubSub to update the tasks to done or not done based on UI changes
const taskListUpdate = (msg, data) => {
    switch (msg) {
        case "checkboxChecked":
            for (let taskObj in taskContainer) {
                if (taskContainer[taskObj].id === data.id) {
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





// Tasklist memory


// PubSub to save JSON on checkbox interaction
const jsonTaskSave = (msg, data) => {
    const taskJson = JSON.stringify(taskContainer);
    localStorage.setItem("taskStored", taskJson);
};

const jsonTaskSaveCheckToken = PubSub.subscribe("checkboxChecked", jsonTaskSave);
const jsonTaskSaveUpdateUncheckToken = PubSub.subscribe("checkboxUnchecked", jsonTaskSave);

export const jsonTaskLoad = () => {
    // jsonTaskLoad will only load the JSON if there's information in the local storage & the taskContainer is empty.
    // This means this only runs on first operation
    if (localStorage.getItem("taskStored")) {
        const taskJson = localStorage.getItem("taskStored");
        const taskParsed = JSON.parse(taskJson);
        taskContainer = {};
        Object.keys(taskParsed).forEach(key => {
            const task = Object.create(taskActions);
            Object.assign(task, taskParsed[key]);
            taskContainer[key] = task;
        });
        // When done with testing, this will just exit the function and will be deleted
    } else { // THIS IS FOR TEST PURPOSES. LATER THIS WILL JUST STOP THE FUNCTION
        const task1 = createTask("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", "Personal", "Some sort of details", "today");
        const task2 = createTask("Example task 2", "Pool", undefined, "today");
        const task3 = createTask("Example task 3", "Personal", undefined, "Tomorrow");
        const task4 = createTask("Example task 4", "Personal", undefined, "Tomorrow");

        task4.setDone();
    }
}






// Call for task cration from edit page
const createTaskToken = PubSub.subscribe("createTaskCall", createTaskReturnOverview);
// Create the task and return to the overview page
function createTaskReturnOverview(msg, taskCreationValues){
    // taskCreationValues broken down for easier readability
    const taskName = taskCreationValues[0];
    const taskproject = findProjectnameById(taskCreationValues[1]);
    const taskDue = taskCreationValues[3];
    const taskDesc = taskCreationValues[2];
    // Create a task
    createTask(taskName, taskproject, taskDesc, taskDue);
    // We need to save manually because otherwise it loads...
    jsonTaskSave();
    // ...the overview page before it has time to save.
    overviewPageCreate();
}

// We get an ID for the project and find which one it is
function findProjectnameById(projectId){
    for (const project in projectContainer){
        if (projectContainer[project].id === projectId){
            return projectContainer[project].projectName;
        }
    }
}