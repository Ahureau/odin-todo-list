import PubSub from "pubsub-js";




var labels = document.querySelectorAll('.toggle-label');

for (var i = 0; i < labels.length; i++) {
    labels[i].addEventListener('keydown', function (event) {
        // Check for the space key or the enter key
        if (event.keyCode === 32 || event.keyCode === 13) {
            // Prevent the default behavior of the key press
            event.preventDefault();
            // Click the label, which will also select the associated input
            this.click();
        }
    });
}