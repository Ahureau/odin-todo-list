import PubSub from "pubsub-js";




function test(msg, data){
    console.log(msg, data);
}


// PubSub corner

const projectPageCreateProjectViewToken = PubSub.subscribe("taskView", test);