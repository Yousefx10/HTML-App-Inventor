//All Running Actions Will Be Stated Here.
function global_onClick(kitID){

    //first of all is defining variables.
    let dynamicMap = window.parent.dynamicMap;
    let ACTIVEactions = window.parent.ACTIVEactions;
    let prefix = "click", contains = 'code'+kitID+".";

    //then filtering the correct actions that are related to event
    ACTIVEactions
        .filter(blockID => blockID.startsWith(prefix) && blockID.includes(contains)) // Apply rules
        .forEach(blockID => {

            const COMMANDS = dynamicMap.get(blockID).split(ProjectDelimiter);
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
            console.log(newVALUE);
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
//u have stopped here and you have finish everything
//find a new problem to solve
//but first check on all alignment, maybe there's issue? i dont think but u gotta check on first