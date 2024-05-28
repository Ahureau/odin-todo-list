import PubSub from "pubsub-js";

// This module handles task creation



// This is the task container object

export const taskContainer = {};




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

// Creates an ID based on string length and ever-increasing uniqueID
function createID(taskName) {
    const taskId = `L${taskName.length}ID${createUniqueId.add()}`;
    return taskId;
}




// This creates individual tasks

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

