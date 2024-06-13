import PubSub from "pubsub-js";

import { domSelector, headerCreate, backOverviewButton, jsonProjectLoad, overviewPageCreate } from "../index.js";


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
    domSelector.main.style.gap = "1.25rem";

    toggleCreator(domSelector.main);

    // Event listener creation
    eventListenersCreate();

    // Create a div to hold the subpages
    const creatorHolder = document.createElement("div");
    creatorHolder.setAttribute("id", "creatorHolder");
    domSelector.main.appendChild(creatorHolder);
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








// Event listeners for keyboard interactions and clicks

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


function taskCreationUi() {
    creatorSelector.creatorHolderReset();

    const nameInputContainer = document.createElement("div");
    creatorSelector.creatorHolder.appendChild(nameInputContainer);
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