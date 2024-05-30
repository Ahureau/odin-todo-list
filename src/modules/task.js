import PubSub from "pubsub-js";

// This module handles task creation



// This is the task container object

export let taskContainer = {};



// Creates an ID based on time of creation

// For testing purposes we add a unique number as all tasks are created at the same time
// Create a unique ID
const createUniqueId = (() => {
    let uniqueID = 1;

    function add() {
        return uniqueID++;
    }

    return {
        add
    }
})();

function createID(taskName) {
    const taskId = `L${taskName.length}ID${Date.now()}${createUniqueId.add()}`;
    return taskId;
}






// This creates individual tasks

// Methods are in the prototype of the tasks
const taskActions = {
    logTask() {console.log(`
    Task: ${this.taskName}
    Project: ${this.taskProject}
    Due: ${this.taskDue}
    Details: ${this.taskDesc}
    Completed: ${this.taskDone}
    `)},
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






// PubSub to save JSON on checkbox interaction
const jsonSave = (msg, data) => {
    const taskJson = JSON.stringify(taskContainer);
    localStorage.setItem("taskStored", taskJson);
};

const jsonSaveCheckToken = PubSub.subscribe("checkboxChecked", jsonSave);
const jsonSaveUpdateUncheckToken = PubSub.subscribe("checkboxUnchecked", jsonSave);

export const jsonLoad = async() => {
    if (localStorage.getItem("taskStored")) {
        const taskJson = localStorage.getItem("taskStored");
        const taskParsed = JSON.parse(taskJson);
        taskContainer = {};
        Object.keys(taskParsed).forEach(key => {
            const task = Object.create(taskActions);
            Object.assign(task, taskParsed[key]);
            taskContainer[key] = task;
        });
    } else {
        const task1 = createTask("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod", undefined, "Some sort of details", "today");
        const task2 = createTask("Example task 2", "Pool", undefined, "today");
        const task3 = createTask("Example task 3", "Hockey", undefined, "Tomorrow");
        const task4 = createTask("Example task 4", "Personal", undefined, "Tomorrow");

        task4.setDone();
    }
}