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

            const COMMANDS = dynamicMap.get(blockID).split(',');
            doJOBS(COMMANDS);

        });


}



function doJOBS(COMMANDS){
    switch (COMMANDS[0]) {
        case "changetext":
            document.getElementById("live"+COMMANDS[1]).textContent=COMMANDS[2];
            break;
        case "changecolor":
            document.getElementById("live"+COMMANDS[1]).style.color=COMMANDS[2];
            break;
        case "changevisibility":
            document.getElementById("live"+COMMANDS[1]).style.display=(COMMANDS[2] === "Visible") ? "block" : "none";
            break;
        case "changefontsize":
            document.getElementById("live"+COMMANDS[1]).style.fontSize=COMMANDS[2];
            break;
    }
}