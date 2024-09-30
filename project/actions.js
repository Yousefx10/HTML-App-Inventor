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
            window.parent.generalUPDATE(COMMANDS[0],COMMANDS[1],COMMANDS[2]);
            break;
        case "changecolor":
            //document.getElementById("live"+COMMANDS[1]).style.color=COMMANDS[2];
            UpdateColor(COMMANDS[1],COMMANDS[2]);
            window.parent.generalUPDATE(COMMANDS[0],COMMANDS[1],COMMANDS[2]);
            break;
        case "changevisibility":
            //document.getElementById("live"+COMMANDS[1]).style.display=(COMMANDS[2] === "Visible") ? "block" : "none";
            TOGGLEhiding(COMMANDS[1]);
            window.parent.generalUPDATE(COMMANDS[0],COMMANDS[1],COMMANDS[2]);
            break;
        case "changefontsize":
            document.getElementById("live"+COMMANDS[1]).style.fontSize=COMMANDS[2];
            break;
    }
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
            let visibility_status= (newVALUE == "Visible") ? 1 : 0;
            console.log(visibility_status);
            GET_THE_KIT_ID("active_kit",kitID).setAttribute("data-visible",visibility_status);
            GET_THE_KIT_ID("active_kit",kitID).classList.toggle('not-visible-emoji');
            break;
    }

}