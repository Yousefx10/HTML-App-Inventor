//All Running Actions Will Be Stated Here.
function global_onClick(kitID,prefix = "click"){
    //this if statement will check if the ACTIVErun allows to start actions or no.
    if(window.parent.ACTIVErun)
    {
        //first of all is defining variables.
        let dynamicMap = window.parent.dynamicMap;
        let ACTIVEactions = window.parent.ACTIVEactions;
        let contains = 'code'+kitID+".";

        //then filtering the correct actions that are related to event
        ACTIVEactions
            .filter(blockID => blockID.startsWith(prefix) && blockID.includes(contains)) // Apply rules
            .forEach(blockID => {

                const COMMANDS = dynamicMap.get(blockID).split(ProjectDelimiter);

                doJOBS(COMMANDS, do_property(COMMANDS[2]),blockID);

            });
    }

}


//so this function starts to apply changes, refered to Do The Action....
function doJOBS(COMMANDS,FINALvalue,ReferBlockID){
    switch (COMMANDS[0]) {
        case "changetext":
            //document.getElementById("live"+COMMANDS[1]).textContent=COMMANDS[2];
            UPDATEcurrentCONTENT(COMMANDS[1],FINALvalue);
            break;
        case "changecolor":
            //document.getElementById("live"+COMMANDS[1]).style.color=COMMANDS[2];
            if(CheckValidProperty("color",FINALvalue))
                UpdateColor(COMMANDS[1],FINALvalue);
            else window.parent.ThroughWARNING(ReferBlockID);
            break;
        case "changevisibility":

            if(FINALvalue=="Toggle")
                TOGGLEhiding(COMMANDS[1]);
            else if(FINALvalue == "Visible" || FINALvalue == "Hidden")
                    if((FINALvalue === "Visible"))
                        document.getElementById("live"+COMMANDS[1]).classList.remove("hide");
                    else
                        document.getElementById("live"+COMMANDS[1]).classList.add("hide");
            else window.parent.ThroughWARNING(ReferBlockID);
                //document.getElementById("live"+COMMANDS[1]).style.display=(FINALvalue === "Visible") ? "block" : "none";

            break;
        case "changefontsize":
            //document.getElementById("live"+COMMANDS[1]).style.fontSize=COMMANDS[2];
            if(CheckValidProperty("font-size",FINALvalue))
                UpdateFontSize(COMMANDS[1],FINALvalue);
            else window.parent.ThroughWARNING(ReferBlockID);
            break;
        case "changealignment":
            //document.getElementById("live"+COMMANDS[1]).style.color=COMMANDS[2];

            //no need to have this or check on it :
            //const textableTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'TEXTAREA'];
            //const controlTags = ['BUTTON', 'IMG' ,'INPUT', 'SELECT', 'TEXTAREA'];
            //const controlTags = ['button', 'img'];

            if (!["left", "center", "right","start"].includes(FINALvalue.toLowerCase()))
            {
                window.parent.ThroughWARNING(ReferBlockID);
                return;
            }


            const targetElement = document.getElementById("live"+COMMANDS[1]);

            let kitTYPE = 'text';

            if (CONTROLelements.includes(targetElement.tagName.toLowerCase()))
                kitTYPE = 'control';

            kitALIGNMENT(COMMANDS[1],kitTYPE,FINALvalue);

            break;
            case "changebackground":
                //document.getElementById("live"+COMMANDS[1]).style.fontSize=COMMANDS[2];

                if(CheckValidProperty("background-color",FINALvalue))
                {
                    if(COMMANDS[1].startsWith("@@"))
                        UpdateBackgroundColor("screen"+COMMANDS[1].slice(2),FINALvalue);
                    else
                        ChangeBackground(COMMANDS[1],FINALvalue);
                }
                else{
                    window.parent.ThroughWARNING(ReferBlockID);
                    return;
                }

                break;
        case "switchscreen":
            //this statement checks if THE VALUE is directed screen ID or screen name.
            if (isNaN(FINALvalue - parseFloat(FINALvalue)))
            {
                FINALvalue=FINALvalue.toLowerCase();//I SHOULD MAKE ALL SCREEN NAMES IN LOWER CASE FOR THIS SITUATION.
                //FINALvalue= window.parent.namingSCREENS.find(selectedSCREENname => selectedSCREENname[1] === FINALvalue)[0];
                const match = window.parent.namingSCREENS.find(selectedSCREENname => selectedSCREENname[1] === FINALvalue);

                if (match)
                    FINALvalue = match[0];// If a match is found, assign the corresponding screen ID to FINALvalue
                else
                {
                    window.parent.ThroughWARNING(ReferBlockID);
                    return;
                }

            }else{
                const match = window.parent.namingSCREENS.find(selectedSCREENname => selectedSCREENname[0] == FINALvalue);
                if (!match)
                {
                    window.parent.ThroughWARNING(ReferBlockID);
                    return;
                }
            }


            SwitchCurrentScreen("screen"+FINALvalue);

            break;
    }

    window.parent.generalUPDATE(COMMANDS[0],COMMANDS[1],FINALvalue);
}

//this function checks if the job contains other kit value.
function do_property(wholeVALUE)
{
    if (wholeVALUE.startsWith("//")) {
        wholeVALUE= wholeVALUE.split("//");
        //[0] is always empty.
        //[1] is selected kit.
        //[2] is command to get.
        let currentKIT;
        if(wholeVALUE[1].startsWith("@@")) currentKIT="screen"+wholeVALUE[1].slice(2);
        else  currentKIT="live"+wholeVALUE[1];

        const currentKITstyle=window.getComputedStyle(document.getElementById(currentKIT));
        switch (wholeVALUE[2])//text
        {
            case "text":
                wholeVALUE= document.getElementById(currentKIT).textContent;
                break;
            case "color":
                wholeVALUE= currentKITstyle.color;
                break;
            case "visibility":
                wholeVALUE= currentKITstyle.display=="none" ?"Hidden":"Visible";
                break;
            case "fontSize":
                wholeVALUE=currentKITstyle.fontSize;
                break;
            case "background":
                wholeVALUE = currentKITstyle.backgroundColor;
                    break;
            case "alignment":

                wholeVALUE= currentKITstyle.textAlign;

                if (wholeVALUE =="start") wholeVALUE="left";

                let ele = document.getElementById(currentKIT);

                if(CONTROLelements.includes(ele.tagName.toLowerCase()))
                    wholeVALUE="left";

                if(ele.parentElement.classList.contains("parent_here"))
                {
                    let temp = Array.from(ele.parentElement.classList).find(className => className.startsWith('alignment'));
                    wholeVALUE= temp.split('-').pop();
                }



                break;
        }
    } else {
        console.log("The string does not start with //");
    }



    return wholeVALUE;
}








//this function should be called from the parent only.
//the purpose of this is to update the changes into the properties and timeline
function generalUPDATE(updateTYPE,kitID,newVALUE)
{
    switch (updateTYPE) {
        case "changetext":
            GET_DOC_ID('active_kit',kitID).innerHTML=newVALUE;
            break;
        case "changecolor":
            GET_DOC_ID("active_kit",kitID).dataset.color =newVALUE;
            break;
        case  "changevisibility":
            let visibility_status;

            if(newVALUE=="Toggle"){//here's the toggle option, if visible make it unvisible and versa vice.

                //get the current visibility status to toggle it
                 visibility_status = GET_DOC_ID("active_kit",kitID).dataset.visible;
                 visibility_status = visibility_status == 1 ? 0 : 1;
                 //toggling the eye emoji
                 GET_DOC_ID("active_kit",kitID).classList.toggle('not-visible-emoji');
            }
            else{//here if new value is visible, set it always visible, if unvisible, hide it always
                //converting Visible and Hidden to NUMBERS
                visibility_status= (newVALUE == "Visible") ? 1 : 0;

                if(visibility_status==1)//if set to visible, show the eye
                    GET_DOC_ID("active_kit",kitID).classList.remove('not-visible-emoji');
                else //if hidden, hide the eye
                    GET_DOC_ID("active_kit",kitID).classList.add('not-visible-emoji');
            }
            //switching the old value to the new value
            GET_DOC_ID("active_kit",kitID).setAttribute("data-visible",visibility_status);

            break;
        case "changefontsize":
            //custom value should be selected.
            if(newVALUE.includes("px"))
                newVALUE="custom";
            GET_DOC_ID("active_kit",kitID).dataset.size = newVALUE;
            break;
        case "changealignment":
            //GET_DOC_ID("active_kit",kitID).dataset.color =newVALUE;
            //alignCONTROLS(alignmentTYPE,alignmentELEMENT);
            //alignTEXT(alignmentTYPE,alignmentELEMENT);


            //reSHOWINGcorrectAlign(alignmentELEMENT);

            switch(newVALUE.toLowerCase()){
                case "left":  //IT'S LEFT
                case "start": //IT'S LEFT
                    GET_DOC_ID("active_kit",kitID).dataset.alignment ="1";
                    break;

                case "center"://IT'S CENTER
                    GET_DOC_ID("active_kit",kitID).dataset.alignment ="2";
                    break;

                case "right"://IT'S RIGHT
                    GET_DOC_ID("active_kit",kitID).dataset.alignment ="3";
                    break;
            }

            break;
        case "changebackground":
            if(kitID.startsWith("@@"))//if the selected is SCREEN
                {
                    //then update the SELECTED SCREEN new value.
                    const foundRow = screenPROPERTIES.find(row => row[0] === kitID.slice(2));
                    if (foundRow) foundRow[1] = "background:"+newVALUE;

                }
            else
                GET_DOC_ID("active_kit",kitID).dataset.background =newVALUE;
                break;
        case"switchscreen":
            SwitchTheScreen(newVALUE,true);
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





function CheckValidProperty(property, value) {
    const testElement = document.createElement("div");
    testElement.style[property] = value;
    return testElement.style[property] !== "";
}

/*
// true, since "green" is invalid for font-size
console.log(CheckInvalidProperty("font-size", "green"));
// false, since "green" is valid for color
console.log(CheckInvalidProperty("color", "green"));
*/






















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




        timerID = setInterval(() => global_onClick(kitID,"trick"), timerLONG);
*/



let intervals = {}; // Store intervals with kitID as keys

function startInterval(kitID, timerLONG) {
    // Check if the interval for this kitID is already running
    if (!intervals[kitID]) { // Prevent starting multiple intervals
        console.log("Interval started for:", kitID);

        // Start the interval and store the timerID in the intervals object
        intervals[kitID] = setInterval(() => global_onClick(kitID, "trick"), timerLONG);
    }
}

function stopInterval(kitID) {
    // Check if the interval exists for the given kitID
    if (intervals[kitID]) {
        clearInterval(intervals[kitID]); // Stop the interval
        delete intervals[kitID]; // Remove it from the object
        console.log("Interval stopped for:", kitID);
    } else {
        console.log("No active interval found for:", kitID);
    }
}

//this function is triggered when ACT= is on
function ACTresetINTERVAL(kitID,intervalTime)
{
        clearInterval(intervals[kitID]);
        delete intervals[kitID];
        intervals[kitID] = setInterval(()=>global_onClick(kitID, "trick"), intervalTime);
}

// Example usage:
// Start an interval
 // starts an interval for kitID 'kit1'
// Stop the interval
 // stops the interval for kitID 'kit1'
