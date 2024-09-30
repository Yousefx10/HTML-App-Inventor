//All Running Actions Will Be Stated Here.
function global_onClick(kitID,prefix = "click"){

    //first of all is defining variables.
    let dynamicMap = window.parent.dynamicMap;
    let ACTIVEactions = window.parent.ACTIVEactions;
    let contains = 'code'+kitID+".";

    //then filtering the correct actions that are related to event
    ACTIVEactions
        .filter(blockID => blockID.startsWith(prefix) && blockID.includes(contains)) // Apply rules
        .forEach(blockID => {

            const COMMANDS = dynamicMap.get(blockID).split(ProjectDelimiter);
            console.log(COMMANDS);
            doJOBS(COMMANDS);

        });


}



function doJOBS(COMMANDS){
    switch (COMMANDS[0]) {
        case "changetext":
            //document.getElementById("live"+COMMANDS[1]).textContent=COMMANDS[2];
            UPDATEcurrentCONTENT(COMMANDS[1],COMMANDS[2]);
            break;
        case "changecolor":
            //document.getElementById("live"+COMMANDS[1]).style.color=COMMANDS[2];
            UpdateColor(COMMANDS[1],COMMANDS[2]);
            break;
        case "changevisibility":

            if(COMMANDS[2]=="Toggle")
                TOGGLEhiding(COMMANDS[1]);
            else
                document.getElementById("live"+COMMANDS[1]).style.display=(COMMANDS[2] === "Visible") ? "block" : "none";

            break;
        case "changefontsize":
            //document.getElementById("live"+COMMANDS[1]).style.fontSize=COMMANDS[2];
            UpdateFontSize(COMMANDS[1],COMMANDS[2]);
            break;
        case "changealignment":
            //document.getElementById("live"+COMMANDS[1]).style.color=COMMANDS[2];

            //no need to have this or check on it :
            //const textableTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'TEXTAREA'];
            //const controlTags = ['BUTTON', 'IMG' ,'INPUT', 'SELECT', 'TEXTAREA'];
            const controlTags = ['button', 'img'];
            const targetElement = document.getElementById("live"+COMMANDS[1]);

            let kitTYPE = 'text';

            if (controlTags.includes(targetElement.tagName)) kitTYPE = 'control';


            kitALIGNMENT(COMMANDS[1],kitTYPE,COMMANDS[2]);
            break;
    }

    window.parent.generalUPDATE(COMMANDS[0],COMMANDS[1],COMMANDS[2]);
}


//this function should be called from the parent only.
//the purpose of this is to update the changes into the properties and timeline
function generalUPDATE(updateTYPE,kitID,newVALUE)
{
    switch (updateTYPE) {
        case "changetext":
            GET_THE_KIT_ID('active_kit',kitID).innerHTML=newVALUE;
            break;
        case "changecolor":
            GET_THE_KIT_ID("active_kit",kitID).dataset.color =newVALUE;
            break;
        case  "changevisibility":
            let visibility_status;

            if(newVALUE=="Toggle"){//here's the toggle option, if visible make it unvisible and versa vice.

                //get the current visibility status to toggle it
                 visibility_status = GET_THE_KIT_ID("active_kit",kitID).dataset.visible;
                 visibility_status = visibility_status == 1 ? 0 : 1;
                 //toggling the eye emoji
                 GET_THE_KIT_ID("active_kit",kitID).classList.toggle('not-visible-emoji');
            }
            else{//here if new value is visible, set it always visible, if unvisible, hide it always
                //converting Visible and Hidden to NUMBERS
                visibility_status= (newVALUE == "Visible") ? 1 : 0;

                if(visibility_status==1)//if set to visible, show the eye
                    GET_THE_KIT_ID("active_kit",kitID).classList.remove('not-visible-emoji');
                else //if hidden, hide the eye
                    GET_THE_KIT_ID("active_kit",kitID).classList.add('not-visible-emoji');
            }
            //switching the old value to the new value
            GET_THE_KIT_ID("active_kit",kitID).setAttribute("data-visible",visibility_status);

            break;
        case "changefontsize":
            GET_THE_KIT_ID("active_kit",kitID).dataset.size = newVALUE;
            break;
        case "changealignment":
            //GET_THE_KIT_ID("active_kit",kitID).dataset.color =newVALUE;
            //alignCONTROLS(alignmentTYPE,alignmentELEMENT);
            //alignTEXT(alignmentTYPE,alignmentELEMENT);


            //reSHOWINGcorrectAlign(alignmentELEMENT);

            switch(newVALUE){
                case "Left"://IT'S LEFT
                    GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="1";
                    break;

                case "Center"://IT'S CENTER
                    GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="2";
                    break;

                case "Right"://IT'S RIGHT
                    GET_THE_KIT_ID("active_kit",kitID).dataset.alignment ="3";
                    break;
            }

            break;
    }

}

//LONG PRESS AREA
/*
onmousedown="startPress()"
onmouseup="cancelPress()"
onmouseleave="cancelPress()"

ontouchstart="startPress()"
ontouchend="cancelPress()"
ontouchcancel="cancelPress()"
*/


// Function to run when long press is detected
function longPressAction(kitID) {

    //will call the global click EVENT :
    global_onClick(kitID,"longpress");
}

// Start the timer
function startPress(elementEVENT,kitID) {
    // Store timer on the specific button element
    elementEVENT.pressTimer = setTimeout(() => longPressAction(kitID), 1000);
}

// Cancel the timer
function cancelPress(elementEVENT) {
    clearTimeout(elementEVENT.pressTimer);
}




/*
//timer area
let start_trick1=true;
// Run myFunction every 2000 milliseconds (2 seconds)
const intervalId = setInterval(global_onClick(kitID,"trick"), 2000);

// To stop the interval after a certain time, use clearInterval
setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval cleared");
}, 20000); // Clears the interval after 20 seconds

*/

let intervalId;


function startInterval(kitID) {

    if (!intervalId) { // Prevent starting multiple intervals
        console.log("Interval started");

        intervalId = setInterval(() => global_onClick(kitID,"trick"), 4000);
    }

}

function stopInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null; // Reset the intervalId
        console.log("Interval stopped");
    }
}
