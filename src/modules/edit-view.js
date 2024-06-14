import PubSub from "pubsub-js";

import { domSelector, headerCreate, backOverviewButton, jsonProjectLoad, taskContainer, projectContainer } from "../index.js";


// This module handles the creation of the new/edit page for projects and tasks





export function editView() {

    jsonProjectLoad();

    domSelector.fullWipe();

    // Grab the css variable we want for the header creation
    let root = document.documentElement;
    let secondaryBackground = getComputedStyle(root).getPropertyValue('--secondary-background');
    // Create header
    headerCreate(domSelector.body, "New", secondaryBackground);

    backOverviewButton(domSelector.main);

    // Set spacing between the projects and the tasks
    domSelector.main.style.marginTop = "1.25rem";
    domSelector.main.style.paddingBottom = "0rem";
    domSelector.main.style.gap = "1.25rem";

    toggleCreator(domSelector.main);

    // Event listener creation
    eventListenersCreate();

    // Create a div to hold the subpages
    const creatorHolder = document.createElement("div");
    creatorHolder.setAttribute("id", "creatorHolder");
    domSelector.main.appendChild(creatorHolder);

    // Edit-view always lands on task creation
    taskCreationUi()
}









// Toggle creation

// "main" toggle creation function
function toggleCreator(whereAdd) {
    const toggleContainer = document.createElement("div");
    toggleContainer.setAttribute("id", "toggle-container");
    whereAdd.appendChild(toggleContainer);

    // We create two inputs
    toggleSwitchCombinator(toggleContainer, true, "task");
    toggleSwitchCombinator(toggleContainer, false, "project");
}

// Creates the inputs (which are invisible but still present)
function inputCreator(whereAdd, isChecked, id) {
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", id);
    input.setAttribute("name", "editSelector");
    input.classList.add("toggle-input");
    input.checked = isChecked;
    whereAdd.appendChild(input);
}

// Creates the labels for the inputs
function labelCreator(whereAdd, id) {
    const label = document.createElement("label");
    label.setAttribute("tabindex", "0");
    label.setAttribute("for", id);
    label.classList.add("toggle-label");
    whereAdd.appendChild(label);

    const labelContent = document.createElement("h2");
    const capitalizedLabel = id.charAt(0).toUpperCase() + id.slice(1);
    labelContent.textContent = capitalizedLabel;
    label.appendChild(labelContent);
}

// Creates the full input by combining label and input
function toggleSwitchCombinator(whereAdd, isChecked, id) {
    inputCreator(whereAdd, isChecked, id);
    labelCreator(whereAdd, id);
}




// Event listeners for keyboard interactions and clicks for toggle

// Creates all event listeners
function eventListenersCreate(){
    // Labels for event listeners
    var toggleContainer = document.querySelector("#toggle-container");

    keyboardListener(toggleContainer);

    clickListener(toggleContainer);
}

//#If keyboard enter or space, counts a click
function keyboardListener(container) {
    // Keyboard input event listener for the container
    container.addEventListener('keydown', function (event) {
        // Check for the space key or the enter key
        if (event.key === ' ' || event.key === 'Enter') {
            // Prevent the default behavior of the key press
            event.preventDefault();
            // Click the label, which will also select the associated input and trigger click eventListener
            event.target.click();
        }
    });
}


// If click and not already clicked, publishes event with clicked input id
function clickListener(container) {
    container.addEventListener('click', function (event) {
        const label = event.target.closest('.toggle-label');
        if (label) {
            const input = label.previousElementSibling;
            if (input && !input.checked) {
                PubSub.publish("creationCall", input.id);
            }
        }
    });
}

















// Subpages

// Project creator subpage

function projectCreationUi() {
    // Empty the container for the input fields
    creatorSelector.creatorHolderReset();

    // Inputs have their own container
    const inputs = document.createElement("div");
    inputs.setAttribute("id", "inputs");
    creatorSelector.creatorHolder.appendChild(inputs);

    // Project name
    const nameInputContainer = document.createElement("div");
    nameInputContainer.classList.add("inputContainer");
    inputs.appendChild(nameInputContainer);

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "projectName");
    nameLabel.classList.add("creatorLabel");
    nameInputContainer.appendChild(nameLabel);
    const nameText = document.createElement("h4");
    nameText.textContent = "Project name";
    nameLabel.appendChild(nameText);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.classList.add("creatorInput");
    nameInput.setAttribute("id", "projectName");
    nameInput.setAttribute("name", "projectName");
    nameInputContainer.appendChild(nameInput);

    // Button at the bottom
    const button = document.createElement("button");
    button.textContent = "Create project";    
    creatorSelector.creatorHolder.appendChild(button);

    button.addEventListener("click", () => {
        const inputValue = nameInput.value;
        PubSub.publish("createProjectCall", inputValue);
    })
}


// Task creator subpage

function taskCreationUi() {
    // Empty the container for the input fields
    creatorSelector.creatorHolderReset();

    // Inputs have their own container
    const inputs = document.createElement("div");
    inputs.setAttribute("id", "inputs");
    creatorSelector.creatorHolder.appendChild(inputs);

    // Task name
    const nameInputContainer = document.createElement("div");
    nameInputContainer.classList.add("inputContainer");
    inputs.appendChild(nameInputContainer);

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "taskName");
    nameLabel.classList.add("creatorLabel");
    nameInputContainer.appendChild(nameLabel);
    const nameText = document.createElement("h4");
    nameText.textContent = "Task name";
    nameLabel.appendChild(nameText);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.classList.add("creatorInput");
    nameInput.setAttribute("id", "taskName");
    nameInputContainer.appendChild(nameInput);

    // Task project selector
    const projectInputContainer = document.createElement("div");
    projectInputContainer.classList.add("inputContainer");
    inputs.appendChild(projectInputContainer);

    const taskProjectLabel = document.createElement("label");
    taskProjectLabel.setAttribute("for", "taskProject");
    taskProjectLabel.classList.add("creatorLabel");
    projectInputContainer.appendChild(taskProjectLabel);
    const taskProjectLabelText = document.createElement("h4");
    taskProjectLabelText.textContent = "Project";
    taskProjectLabel.appendChild(taskProjectLabelText);

    const selectContainer = document.createElement("select");
    selectContainer.classList.add("creatorInput");
    selectContainer.setAttribute("id", "taskProject");
    selectContainer.setAttribute("name", "taskProject");
    projectInputContainer.appendChild(selectContainer);
    
    // Option creator
    projectSelectListCreator(selectContainer);

    // Chevron
    const dropdownChevronContainer = document.createElement("div");
    dropdownChevronContainer.classList.add("svgContainer", "dropdownChevron");
    projectInputContainer.appendChild(dropdownChevronContainer);

    const dropdownChevronSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    dropdownChevronSvg.setAttribute("height", "24px");
    dropdownChevronSvg.setAttribute("width", "24px");
    dropdownChevronSvg.setAttribute("viewBox", "0 -960 960 960");
    dropdownChevronContainer.appendChild(dropdownChevronSvg);

    const dropdownChevronPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    dropdownChevronPath.setAttribute("d", "M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z");
    dropdownChevronSvg.appendChild(dropdownChevronPath);

    // Task due date
    const dateInputContainer = document.createElement("div");
    dateInputContainer.classList.add("inputContainer");
    inputs.appendChild(dateInputContainer);

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "taskDue");
    dateLabel.classList.add("creatorLabel");
    dateInputContainer.appendChild(dateLabel);
    const dateText = document.createElement("h4");
    dateText.textContent = "Due date";
    dateLabel.appendChild(dateText);

    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.classList.add("creatorInput");
    dateInput.setAttribute("id", "taskDue");
    dateInputContainer.appendChild(dateInput);

    // Button at the bottom
    const button = document.createElement("button");
    button.textContent = "Create task";
    creatorSelector.creatorHolder.appendChild(button);

    button.addEventListener("click", () => {
        const inputValue = nameInput.value;
        PubSub.publish("createTaskCall", inputValue);
    })
}

/*
<div id="creatorHolder">
    <div id="inputs">
        <div class="inputContainer">
            <label for="taskProject" class="creatorLabel">
                <h4>Project</h4>
            </label>
            <select class="creatorInput" id="taskProject" name="taskProject">
                <option value="Personal">Personal</option>
                <option value="Pool">Pool</option>
                <option value="Hockye">Hockey</option>
            </select>
            <div class="svgContainer dropdownChevron">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
            </div>
        </div>
        <div class="inputContainer">
            <label for="taskDue" class="creatorLabel">
                <h4>Due date</h4>
            </label>
            <input type="date" name="taskDue" id="taskDue" class="creatorInput">
        </div>
        <div class="inputContainer">
            <label for="taskDetails" class="creatorLabel">
                <h4>Details</h4>
            </label>
            <textarea type="date" name="taskDetails" id="taskDetails" class="creatorInput largeText"></textarea>
        </div>
    </div>
    <button>Create project</button>
</div>
*/

// Function for creation all the options based on projectContainer
function projectSelectListCreator(whereAdd) {
    for (const project in projectContainer) {
        const projectObject = projectContainer[project];
        const projectOption = document.createElement("option");
        projectOption.value = projectObject.id;
        projectOption.textContent = projectObject.projectName;
        whereAdd.appendChild(projectOption);
    }
}



// Selects DOM elements that are only on the creation page
const creatorSelector = (() => {
    const creatorHolder = document.querySelector("#creatorHolder");

    // CreatorHolder hard reset
    const creatorHolderReset = () => {
        creatorSelector.creatorHolder = document.querySelector("#creatorHolder");
        creatorSelector.creatorHolder.replaceChildren();
    };


    return {
        creatorHolder,
        creatorHolderReset,
    }
})();










// PubSub corner

// subscription to creator input for task or project subpage
const creationCallToken = PubSub.subscribe("creationCall", (msg, data) => {
    if (data === "task"){
        taskCreationUi();
    } else if (data ==="project"){
        projectCreationUi();
    }
});