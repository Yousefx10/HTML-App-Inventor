//This should run so if the page got scrolled, it won't stuck in the middle.
window.history.scrollRestoration = 'manual';


window.onload = function () {

    //will use the ON LOAD func to re assign the HINTS to all the kit's
    const elements = document.querySelectorAll('.hint');
    elements.forEach(element => {
        element.dataset.hint = kit_HINTS[element.dataset.hint];
    });
    kit_HINTS=null;//no need to store it anymore.
    TIMEtoSHOWhints=true;
};


//this adds the resize function to be called if screen get changed the size by zooming.
window.addEventListener("resize", correctDialogSize);

function correctDialogSize()
{
    ScreensManager(true);
    if(currentDIALOGbutton!=null)
        showDialog(currentDIALOGbutton,true);
}





//[FUNCTIONS] Area
//this function runs when a new kit got born.
function addKIT(kit_type) {
    //[START] Main element that will have the content for the new added element.
    let newKIT = document.createElement('p');
    newKIT.classList.add('project_timeline_kit');
    newKIT.id = 'active_kit' + COUNT_KIT_PROGRESS;
    let currentkitID = COUNT_KIT_PROGRESS;
    //[END] Main element that will have the content for the new added element.

    newKIT.setAttribute("data-visible", "1");
    newKIT.setAttribute("data-alignment", "1");
    newKIT.setAttribute("data-color", "black");
    newKIT.setAttribute("data-size", "medium");
    newKIT.setAttribute("data-margin", "0");
    newKIT.setAttribute("data-only", "text");//standard value, until changed.

    newKIT.setAttribute("data-border", "0");
    newKIT.setAttribute("data-border-type", "1");
    newKIT.setAttribute("data-border-color", "black");
    newKIT.setAttribute("data-border-style", "solid");
    newKIT.setAttribute("data-border-size", "2px");


    //this i can pass parameters without EXECUTE the function FROM FIRST TIME.
    newKIT.onclick = () => timeline_properties(currentkitID, newKIT.innerHTML,NameKit(kit_type).toLowerCase());


    //Naming the kit before adding it to the timeline box.
    switch (kit_type) {

        case 1:


            newKIT.textContent = phrase1 + element1;
            newKIT.setAttribute("data-size", "large");//specific font size for the label
            break;
        case 2:
            newKIT.textContent = phrase1 + element2;
            break;
        case 3:
            newKIT.textContent = phrase2;
            newKIT.setAttribute("data-only", "button");
            break;
        case 4:
            newKIT.textContent = phrase3;
            newKIT.setAttribute("data-only", "img");
            newKIT.setAttribute("data-size", "100%");
            break;
        case 5:
            newKIT.setAttribute("data-only", "timer");
            newKIT.setAttribute("data-duration", "1");
            newKIT.setAttribute("data-timer", "false");
            newKIT.textContent = phrase4 + element5 + currentkitID;
            break;
    }
    let tempNAME = NameKit(kit_type)+COUNT_KIT_PROGRESS;//the first KIT-NAME will added, until it changes.
    active_kit.push([COUNT_KIT_PROGRESS, NameKit(kit_type),tempNAME]);
    //failed try to convert two dimension array to dynamic map
    //active_kit.set(COUNT_KIT_PROGRESS, NameKit(kit_type));


    //finally, adding the kit to the timeline box.
    //project_timeline.appendChild(newKIT);
    document.getElementById("screen"+LIVE_SCREEN).appendChild(newKIT);
    live_iframe_add(kit_type, newKIT.textContent, COUNT_KIT_PROGRESS,tempNAME);
    //increasing the id counter.
    COUNT_KIT_PROGRESS++;

    //adding new kit will reset the workspace
    commonPROJECTclearWORKSPACE();
}

function NameKit(kit_num) {
    //kit type instructions :
    //1 : label
    //2 : text
    //3 : Button
    //4 : Picture
    //5 : Timer

    switch (kit_num) {
        case 1:
            return element1;
        case 2:
            return element2;
        case 3:
            return element3;
        case 4:
            return element4;
        case 5:
            return element5;
    }
}

//this function is USED to SHOW the needed properties and HIDE the UnNeeded.
function choosePROPERTIEScorrect(KITtype,KITid)
{

    //THIS LOOP IS TO HIDE ALL PROPERTIES THAT "MIGHT BE ONLY GOOD WITH SPECIFIC KIT".
    const elements = document.querySelectorAll('.only-option');
    elements.forEach(element => {
        element.classList.add("only-hide");
    });


    let currentSELECTED;
    if(KITtype=='screen')   currentSELECTED=KITid;
    else currentSELECTED =  GET_DOC_ID("active_kit", KITid);

    console.log(currentSELECTED.dataset.only);
    //THIS LINE HELPS TO ONLY SHOW THE "PROPERTIES" THAT'S ONLY GOOD FOR INDIVIDUAL KIT.
    document.getElementById("only-" +  currentSELECTED.dataset.only)
        .classList.remove("only-hide");



    //by default, all will be hidden again.
    // propertiesVISIBILITY.style.display="none";
    propertiesALIGNMENT.style.display="none";
    propertiesMARGIN.style.display="none";
    propertiesBORDER.style.display="none";
    propertiesCOLOR.style.display="none";
    propertiesSIZE.style.display="none";



    //visibility is all needed.
    propertiesVISIBILITY.style.display="block";

    //showing the needed properties ONLY
    switch (KITtype)
    {
        case "label":
        case "text":
            //this line is made only to check whether the "general" properties are needed for the current kit
            document.getElementById("only-general").classList.remove("only-hide");

            propertiesALIGNMENT.style.display="block";
            propertiesMARGIN.style.display="block";
            propertiesBORDER.style.display="block";
            propertiesCOLOR.style.display="block";
            propertiesSIZE.style.display="block";
            break;
        case "button":
            //this line is made only to check whether the "general" properties are needed for the current kit
            document.getElementById("only-general").classList.remove("only-hide");

            propertiesALIGNMENT.style.display="block";
            propertiesMARGIN.style.display="block";
            propertiesBORDER.style.display="block";
            propertiesCOLOR.style.display="block";
            propertiesSIZE.style.display="block";
            break;
        case "picture"://img or picture.
            propertiesALIGNMENT.style.display="block";
            propertiesMARGIN.style.display="block";
            propertiesBORDER.style.display="block";
            break;
        case "timer":
            propertiesVISIBILITY.style.display="none";
            break;
        case "screen":
            propertiesVISIBILITY.style.display="none";
            break;
    }




}







//this function manages timeline properties, and it occur everytime original kit get pressed
function timeline_properties(current_kit, current_details,KITtype) {

    properties_value.value = current_details;
    let result = active_kit.find(item => item[0] === current_kit);
    properties_name.value = result[2];

    //updating THE HIDDEN INPUT value for the currently selected kitID
    hidden_kitID.value = current_kit;

    LIVE_select_kit(current_kit);//select the kit inside IFRAME to highlight it

    TimeLine_RemoveALLselected();//to remove current/previous selected timelineKIT

    GET_DOC_ID("active_kit", current_kit).classList.add('MEselected');

    let current_visible_status = GET_DOC_ID("active_kit", current_kit).dataset.visible;
    if (current_visible_status == 1) {
        document.getElementById("btn_visible").classList.remove('btn_unvisible');

    } else {
        document.getElementById("btn_visible").classList.add('btn_unvisible');

    }


    let current_alignment_status = document.getElementById("active_kit" + current_kit).dataset.alignment;
    let alignmentText_Control = "text";//default is text, until some control change it.

    //checks if it's text or control, from the array list: CONTROLelements
    if (CONTROLelements.includes(document.getElementById("active_kit" + current_kit).dataset.only))
        alignmentText_Control = "control";

    //text alignment




    reSHOWINGcorrectAlign(document.getElementById("align" + current_alignment_status));
    //this line changes the <span id="mainAlignmentSPAN">Text Alignment :</span> data-alignment-Type when it's label or button
    mainAlignmentSPAN.dataset.alignmentType = alignmentText_Control;


    let current_color = document.getElementById("active_kit" + current_kit).dataset.color;
    // document.getElementById('ColorDropDown').disabled = true;
    document.getElementById('ColorDropDown').value = current_color;
    // document.getElementById('ColorDropDown').disabled = false;

    let current_size = document.getElementById("active_kit" + current_kit).dataset.size;
    // document.getElementById('FontSizeDropDown').disabled = true;
    if (current_size == "custom") {
        document.getElementById('FontSizeDropDown').appendChild(customFontSizeOption);
    } else {
        let fontSizeCustom = document.getElementById("fontSizeCustom");
        if (fontSizeCustom)
            fontSizeCustom.remove();//removing the Custom font size

    }
    document.getElementById('FontSizeDropDown').value = current_size;
    // document.getElementById('FontSizeDropDown').disabled = false;

    let current_img_size = document.getElementById("active_kit" + current_kit).dataset.size;
    // document.getElementById('ImageSize').disabled = true;
    document.getElementById('ImageSize').value = current_img_size;
    // document.getElementById('ImageSize').disabled = false;

    let current_margin = document.getElementById("active_kit" + current_kit).dataset.margin;
    // document.getElementById('MarginDropDown').disabled = true;
    document.getElementById('MarginDropDown').value = current_margin;
    // document.getElementById('MarginDropDown').disabled = false;

    let current_timerSTATUS = document.getElementById("active_kit" + current_kit).dataset.timer;
    if (current_timerSTATUS == "true") {
        TimerButton.classList.add('TimerButtonENABLED');
    } else {
        TimerButton.classList.remove('TimerButtonENABLED');
    }
    rangerINPUT.value = document.getElementById("active_kit" + current_kit).dataset.duration;
    spanRanger.textContent = rangerINPUT.value;
//BORDER AREA
    let current_Border_status = document.getElementById("active_kit" + current_kit).dataset.border;


    if (current_Border_status == "1")
        bordersCHECKbox.checked = true;
    else
        bordersCHECKbox.checked = false;

    EnableBorder(bordersCHECKbox.checked);


    let current_BorderType = document.getElementById("active_kit" + current_kit).dataset.borderType;
    // document.getElementById('theBorderType').disabled = true;
    document.getElementById('theBorderType').value = current_BorderType;
    // document.getElementById('theBorderType').disabled = false;

    let current_BorderColor = document.getElementById("active_kit" + current_kit).dataset.borderColor;
    // document.getElementById('theBorderColor').disabled = true;
    document.getElementById('theBorderColor').value = current_BorderColor;
    // document.getElementById('theBorderColor').disabled = false;

    let current_BorderStyle = document.getElementById("active_kit" + current_kit).dataset.borderStyle;
    // document.getElementById('theBorderStyle').disabled = true;
    document.getElementById('theBorderStyle').value = current_BorderStyle;
    // document.getElementById('theBorderStyle').disabled = false;


    let current_BorderSize = document.getElementById("active_kit" + current_kit).dataset.borderSize;
    // document.getElementById('theBorderSize').disabled = true;
    document.getElementById('theBorderSize').value = current_BorderSize;
    // document.getElementById('theBorderSize').disabled = false;


    //this SHOWS the only needed property.
    choosePROPERTIEScorrect(KITtype,current_kit);
    //Fixes the current Dialog Location
    correctDialogSize();
}





function showScreenProperties()//this functions shows the screen settings in properties box.
    {
        TimeLine_RemoveALLselected();//first things : remove all the selected.

        screenSETTINGS.classList.toggle('screenSETTINGS-ACTIVE');//to highlight itself.
        choosePROPERTIEScorrect('screen',screenSETTINGS);

        /*//short example of getting CURRENT SCREEN DATA.
        let current_visible_status = GET_DOC_ID("active_kit", current_kit).dataset.visible;
        if (current_visible_status == 1)
            document.getElementById("btn_visible").classList.remove('btn_unvisible');
        else
            document.getElementById("btn_visible").classList.add('btn_unvisible');
            */


        correctDialogSize();//and finally to correct the dialog location.

        ReFocus();//Showing the project_properties.

        //APPLYING TO SHOW CURRENT VALUES INSIDE THE project_properties
        document.getElementById("scBackground").value=screenSETTINGS.dataset.background;


    }





//so this function add the kit to iframe.
function live_iframe_add(KITtype, KITcontent = "", kitID,kitNAME,change = false) {
    const iframe = live_iframe;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    if (change) {
        console.log("i don't know the purpose of this line it's always false and it will never run.");
        const newContent = iframeDoc.getElementById('updateME');
        newContent.innerHTML = '<p>' + KITcontent + '</p>';
    } else {
        var elementKITtype = "span";//as default unknown type
        let notTEXABLE = false;
        //this to know if the kit can attach to events or no
        let isFUNCTIONAL = false;
        //this to know if the kit should be visible or hidden
        let shouldBEhidden = false;


        switch (KITtype) {
            case 1:
                elementKITtype = "h3";
                break;
            case 2:
                elementKITtype = "p";
                break;
            case 3:
                elementKITtype = "button";
                isFUNCTIONAL = true;
                break;
            case 4:
                elementKITtype = "img";
                notTEXABLE = true;
                break;
            case 5:
                isFUNCTIONAL = true;
                shouldBEhidden = true;
                break;
        }

        const neWelement = document.createElement(elementKITtype);
        neWelement.id = "live" + kitID;
        if (!notTEXABLE)
            neWelement.textContent = KITcontent;
        else {
            neWelement.alt = KITcontent;
            neWelement.style.maxWidth = GET_DOC_ID("active_kit", kitID).dataset.size;
        }

        if (isFUNCTIONAL) {//This Part Helps to manage the functional kit's

            Func_KIT(kitNAME, kitID, KITtype,screenBUTTON.textContent);
            if (shouldBEhidden)
                neWelement.style.display = "none";
        }


        neWelement.style.fontSize = GET_DOC_ID("active_kit", kitID).dataset.size;

        // Append the new element to the selected screen.
        const targetSCREEN = iframeDoc.getElementById("screen"+LIVE_SCREEN);
        targetSCREEN.appendChild(neWelement);

        //iframeDoc.body.appendChild(neWelement); // This appends it to the body


    }


}


function LIVE_select_kit(kitID) {
    const iframe = live_iframe;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    live_iframe.contentWindow.RemoveALLselected();

    const elementToModify = iframeDoc.getElementById('live' + kitID);

    if (elementToModify) {
        // Add a class to the element
        elementToModify.classList.add('MEselected'); // Replace 'myNewClass' with the desired class name
    } else {
        console.log('Element not found in the iframe ==>' + kitID);
    }
    DELETEbtn.disabled = false;
    //SAVEbtn.disabled = false;

    ReFocus();


}


//this function is used to unfocus the selected kit in project_timeline
function TimeLine_RemoveALLselected() {
    // Use a single line to remove the class from all matching elements
    document.querySelectorAll('.MEselected').forEach(element => element.classList.remove('MEselected'));
}


function SAVINGtime() {
    const current_kitID = hidden_kitID.value;
    const UPDATEDcontent = document.getElementById('properties_value').value;
    GET_DOC_ID('active_kit', current_kitID).innerHTML = UPDATEDcontent;

    live_iframe.contentWindow.UPDATEcurrentCONTENT(current_kitID, UPDATEDcontent);

    SAVEbtn.disabled = true;

}


function REMOVINGtime({multiKIT=false,kits,ISLOOPED=false,kitIDIDID}) {
    var current_kitID;
    if(ISLOOPED)     current_kitID = kitIDIDID;
    else             current_kitID = hidden_kitID.value;
    console.log(current_kitID);
    if(multiKIT)//this it's loop to delete multiple kits duo to deleted screen.
    {
        unFocus();//close the properties box, only for one time.
        commonPROJECTclearWORKSPACE();//clear the workspace, only for one time
        kits.forEach((SHOULDkitID) => {
            REMOVINGtime(
                {ISLOOPED:true,kitIDIDID:SHOULDkitID}
            );//Recursive function
        });

        return;//if finished then it's time to exit.

    }
    active_kit = active_kit.filter(kit => kit[0] != current_kitID);


    GET_DOC_ID('active_kit', current_kitID).remove();

    if(!ISLOOPED)//so the entire screen will automatically be deleted, no need to call this in GROUP OF DELETETION.
    live_iframe.contentWindow.REMOVEkit(current_kitID);


    DELETEbtn.disabled = true;
    SAVEbtn.disabled = true;

    //to hide project_properties
    if(!ISLOOPED)//so the entire screen will automatically be deleted, no need to call this in GROUP OF DELETETION.
    unFocus();


    if (GET_DOC_ID("code", current_kitID)) {
        GET_DOC_ID("code", current_kitID).remove();
        ACTIVEactions = ACTIVEactions.filter(action => !action.includes("code" + current_kitID + "."));

        dynamicMap.forEach((_, key) => key.includes("code" + current_kitID + ".") && dynamicMap.delete(key));

        //the old way :
        //Object.keys(dynamicBLOCKsize).forEach(key => key.includes("code"+current_kitID+".") && delete dynamicBLOCKsize[key]);

        //the new way :
        listOFevents.forEach(num => {
            delete dynamicBLOCKsize[num + "code" + current_kitID + "."];
        });
        if(!ISLOOPED)//so the entire screen will automatically be deleted, no need to call this in GROUP OF DELETETION.
        commonPROJECTclearWORKSPACE();
    }
}


//THIS function will clear the workspace area whenever ADDS or DELETES new kits.
function commonPROJECTclearWORKSPACE() {
    //clears the playground container
    document.getElementById("playground_space_container").innerHTML = "<p id='playground_text'></p>";
    //to hide the action section
    actions_space.style.display = "none";

    //to hide dialog if it's shown.
    hideDialog(true);

    //to clears the event section
    ALL_available_EVENTS.forEach((element) => {
        element.style.display = 'none'; // Hides the element
    });
}


function unFocus() {
    document.getElementById("project_properties").style.display = "none";
    live_iframe.contentWindow.RemoveALLselected();//unselect all highlighted kits in LIVE
    TimeLine_RemoveALLselected();//unselect all highlighted kits in TIME_LINE

    //so dialog location be corrected.
    correctDialogSize();
}

function ReFocus() {
    document.getElementById("project_properties").style.display = "inline-block";

}


function change_visibility() {
    //1) changing visibility_status to ZERO.
    //2) changing data-visible to ZERO.
    //3) switch the button to red.
    //4) hide the element from project_live only.
    //5) replace visiblity emoji


    //hidden_kit_visible
    let kitID = hidden_kitID.value;
    let visibility_status = GET_DOC_ID("active_kit", kitID).dataset.visible;

    live_iframe.contentWindow.TOGGLEhiding(kitID);

    if (visibility_status == "1")//in this case, it's visible, will be not visible in this code:
        visibility_status = "0";
    else
        visibility_status = "1";

    GET_DOC_ID("active_kit", kitID).setAttribute("data-visible", visibility_status);
    GET_DOC_ID("active_kit", kitID).classList.toggle('not-visible-emoji');
}


//ALIGN TEXT or control
//alignmentSTATES = "text" or "control"
function alignTEXT(alignmentTYPE, alignmentSTATES, alignmentELEMENT) {
    reSHOWINGcorrectAlign(alignmentELEMENT);
    let kitID = hidden_kitID.value;

    switch (alignmentTYPE) {
        case 1://IT'S LEFT
            GET_DOC_ID("active_kit", kitID).dataset.alignment = "1";
            break;

        case 2://IT'S CENTER
            GET_DOC_ID("active_kit", kitID).dataset.alignment = "2";
            break;

        case 3://IT'S RIGHT
            GET_DOC_ID("active_kit", kitID).dataset.alignment = "3";
            break;
    }

    let KITalignment = GET_DOC_ID("active_kit", kitID).dataset.alignment;
    live_iframe.contentWindow.kitALIGNMENT(kitID, alignmentSTATES, KITalignment);
}


function reSHOWINGcorrectAlign(alignmentELEMENT) {
    const elements = document.querySelectorAll('.btn_alignment-SELECTED'); // Select all matching elements

    elements.forEach(element => {
        element.classList.remove('btn_alignment-SELECTED'); // Remove the class from each element
    });
    alignmentELEMENT.classList.toggle('btn_alignment-SELECTED');
}


function UpdateColor(colorElement) {
    let NewColor = colorElement.value;
    let kitID = hidden_kitID.value;
    live_iframe.contentWindow.UpdateColor(kitID, NewColor);

    GET_DOC_ID("active_kit", kitID).dataset.color = NewColor;
}

function UpdateFontSize(SizeElement) {
    let NewSize = SizeElement.value;
    let kitID = hidden_kitID.value;

    let fontSizeCustom = document.getElementById("fontSizeCustom");
    if (fontSizeCustom)
        fontSizeCustom.remove();//removing the Custom font size

    live_iframe.contentWindow.UpdateFontSize(kitID, NewSize);

    GET_DOC_ID("active_kit", kitID).dataset.size = NewSize;
}

function UpdateMargin(SizeElement) {
    let NewMargin = SizeElement.value;
    let kitID = hidden_kitID.value;
    live_iframe.contentWindow.UpdateMargin(kitID, NewMargin);
    GET_DOC_ID("active_kit", kitID).dataset.margin = NewMargin;
}

function UpdateImgSize(SizeElement) {
    let NewSize = SizeElement.value;
    let kitID = hidden_kitID.value;
    live_iframe.contentWindow.UpdateImgSize(kitID, NewSize);
    GET_DOC_ID("active_kit", kitID).dataset.size = NewSize;
}


function showHINT(HINT) {
    infoParagraph.style.display = "block";
    infoParagraph.innerHTML = HINT;
}


function handleFileUpload(event) {
    const file = event.target.files[0];

    let kitID = hidden_kitID.value;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {

            const iframe = live_iframe;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;


            const img = live_iframe.contentWindow.document.getElementById('live' + kitID);
            img.src = e.target.result;

            //img.style.display = 'block'; // Show the image
            //img.style.maxWidth  = '250px'; // Show the image
        };
        reader.readAsDataURL(file); // Read the file as a data URL
        // Reset the input value to allow re-uploading the same file
        event.target.value = '';
    }
}

/*  Border Type [setting values]:
    - none :default. [this will be as default when the checkbox is false]
    - full : like box.
    - underline : bottom line.
    -one side : with background color.

    1) check-box to have a border or not.
    2) selecting the border type.
    3) selecting the border color.
    4) selecting the border style format.
*/

function haveBORDER(borderVALUE, borderTYPE) {
    let kitID = hidden_kitID.value;
    let NewborderVALUE = borderVALUE.value;
    switch (borderTYPE) {
        case 1:

            GET_DOC_ID("active_kit", kitID).dataset.borderType = NewborderVALUE;

            break;
        case 2:
            GET_DOC_ID("active_kit", kitID).dataset.borderColor = NewborderVALUE;
            break;
        case 3:
            GET_DOC_ID("active_kit", kitID).dataset.borderStyle = NewborderVALUE;
            break;
        case 4:
            GET_DOC_ID("active_kit", kitID).dataset.borderSize = NewborderVALUE;
            break;
    }
    let currentType = GET_DOC_ID("active_kit", kitID).dataset.borderType;
    let currentSize = GET_DOC_ID("active_kit", kitID).dataset.borderSize;

    let currentStyle = GET_DOC_ID("active_kit", kitID).dataset.borderStyle;
    let currentColor = GET_DOC_ID("active_kit", kitID).dataset.borderColor;

    const Final_Type_Size = currentType === "1" ? currentSize :
        currentType === "2" ? "0 0 " + currentSize :
            currentType === "3" ? "0 0 0 " + currentSize :
                currentSize;//default value

    //border: 1px solid #000;


    //+GET_DOC_ID("active_kit",kitID).dataset.borderType;
    live_iframe.contentWindow.UPDATEborder(kitID, Final_Type_Size, currentStyle, currentColor);
}


function EnableBorder(CurrentBorderStatus) {
    let kitID = hidden_kitID.value;

    let currentType = GET_DOC_ID("active_kit", kitID).dataset.borderType;
    let currentSize = GET_DOC_ID("active_kit", kitID).dataset.borderSize;

    let currentStyle = GET_DOC_ID("active_kit", kitID).dataset.borderStyle;
    let currentColor = GET_DOC_ID("active_kit", kitID).dataset.borderColor;
    const Final_Type_Size = currentType === "1" ? currentSize :
        currentType === "2" ? "0 0 " + currentSize :
            currentType === "3" ? "0 0 0 " + currentSize :
                currentSize;//default value


    if (CurrentBorderStatus) {
        bordersAll.style.display = "block";
        GET_DOC_ID("active_kit", kitID).dataset.border = "1";
        //haveBORDER(1,1);
        live_iframe.contentWindow.UPDATEborder(kitID,
            Final_Type_Size,
            currentStyle,
            currentColor);
    } else {
        bordersAll.style.display = "none";
        GET_DOC_ID("active_kit", kitID).dataset.border = "0";
        //haveBORDER(1,1);
        live_iframe.contentWindow.UPDATEborder(kitID, "0", "solid", "black");
    }
}


function ManageTimer() {
    let currentkitID = hidden_kitID.value;

    if (GET_DOC_ID("active_kit", currentkitID).dataset.timer == "true")//currently set to true and should be false
    {//STOP NOW :
        stopThisTimer(currentkitID);
        GET_DOC_ID("active_kit", currentkitID).dataset.timer = "false";
        TimerButton.classList.remove('TimerButtonENABLED');

    } else {//WORK NOW :

        live_iframe.contentWindow.startInterval(currentkitID, (rangerINPUT.value * 1000));
        GET_DOC_ID("active_kit", currentkitID).dataset.timer = "true";
        TimerButton.classList.add('TimerButtonENABLED');
    }
}

function updateTIMERduration(newVALUEduration)
{
    spanRanger.textContent = newVALUEduration;
    GET_DOC_ID('active_kit',hidden_kitID.value).dataset.duration=newVALUEduration;

    // EVERY TIME SPECIFIC INTERVAL GET'S A NEW DURATION, ALL OTHER INTERVALS SHOULD RE STARTING AGAIN!!
    //TO INSURE THE CORRECT LOGIC THAT ALL WILL WORK TOGETHER AND ALL WILL STOP TOGETHER
    const timers = active_kit.filter(row => row[1] === "Timer");
// Step 2: Iterate over the filtered rows
    timers.forEach(row => {
        //console.log(`ID: ${row[0]}, Type: ${row[1]}, Duration: ${row[2]}`);
        live_iframe.contentWindow.
        ACTresetINTERVAL(row[0],document.getElementById("active_kit"+row[0]).dataset.duration*1000);
    });

}

function stopThisTimer(kitID) {
    live_iframe.contentWindow.stopInterval(kitID);
}



//this function will help to update the clock TIME in the upper-left for smartphone mockup
    function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

    // Update the clock every second
    setInterval(updateClock, 1000);

    // Initialize the clock when the page loads
    updateClock();


    //this function will change ACTIVErun that will affect the runnable buttons and timers in the iframe
    function runTHEproject(butt)
    {
        ACTIVErun=!ACTIVErun;
        document.getElementById('activeDOT').classList.toggle('recording-dot');
        butt.classList.toggle("btn-active-start"); // Toggle the stop class
        butt.classList.toggle("btn-active-stop"); // Toggle the start class

        if(ACTIVErun)
        {
            const timers = active_kit.filter(row => row[1] === "Timer");

// Step 2: Iterate over the filtered rows
            timers.forEach(row => {
                //console.log(`ID: ${row[0]}, Type: ${row[1]}, Duration: ${row[2]}`);
                live_iframe.contentWindow.
                ACTresetINTERVAL(row[0],document.getElementById("active_kit"+row[0]).dataset.duration*1000);
            });//i believe it works? now focus when changing the duration it still won't affect.
        }

    }

    //this function will used to update the name of the selected KIT
    function updateKITname(newNAME)
    {

        let currentKITid = Number(hidden_kitID.value);


        let result = active_kit.find(item => item[0] === currentKITid);

        // Check if the array is found
        if (result) {

            if(/^\d|\s/.test(newNAME))
            {
                alert("ERROR:\nName Can't Start With Number Or Contains Space.");
                properties_name.value = result[2];
                return;
            }


            if(active_kit.find(item => item[2] === newNAME))//this checks if the name is dublicated
            {
                alert("ERROR:\nTHIS NAME IS ALREADY GIVEN TO OTHER KIT.");
                properties_name.value = result[2];
                return;
            }



            //this updates the name value to the original array active_kit
            result[2] = newNAME;
            let currentSCREENname = namingSCREENS.find(scr => scr[0] === LIVE_SCREEN)[1];
            //this should shows the updated name.

            if(document.getElementById("code"+currentKITid))
            {
                let tempSelected =  document.getElementById("code"+currentKITid);
                let spanElement = tempSelected.querySelector('span').cloneNode(true);
                spanElement.textContent="["+ currentSCREENname +"] ";
                const newTextNode = document.createTextNode(newNAME)
                tempSelected.innerHTML="";
                tempSelected.appendChild(spanElement);
                tempSelected.appendChild(newTextNode);
            }






            console.log("updating kit name is completed");

        }
    }

//this function is used to manage all screens,
//like adding, removing, switching.
//and currently only be called from the upper-right smartphone iframe.
    function ScreensManager(resizeACTION=false,onlyHIDE=false)
    {

        if(onlyHIDE)
        {// it will be hidden, only
            screenBUTTON.classList.remove('clickableBlue');
            screensPage.classList.remove('screenPAGEshow');
            screensPage.classList.add('screenPAGEhide');
            return;
        }


        // Get button's position relative to the viewport
        var buttonRect = screenBUTTON.getBoundingClientRect();

        // Set the position of the dialog
        screensPage.style.left = `${buttonRect.left  + window.scrollX}px`; // Align with the button's left
        screensPage.style.top = `${buttonRect.bottom}px`; // Align just below the button

        if(!resizeACTION)
        {
            //change the visibility
            screenBUTTON.classList.toggle('clickableBlue');
            screensPage.classList.toggle('screenPAGEshow');
            screensPage.classList.toggle('screenPAGEhide');
        }




    }
    function AddNewScreen()
    {
        let ScreenName = prompt("Please enter Screen Name:");

        if (ScreenName !== '' && ScreenName!== null) {

            if(/^\d|\s/.test(ScreenName))//if the name starts with number don't continue
            {
                alert("Error:\n Name Can't Start With A Number Or Contain Space.");
                return;
            }

            totalSCREENS++;//increase how many screens there.
            namingSCREENS.push([totalSCREENS,ScreenName]);
            screenPROPERTIES.push([totalSCREENS,"background:#f0f0f0"]);//storing default SCREEN VALUES.

            const newOption = document.createElement("option");
            newOption.value = totalSCREENS; // Set the value attribute
            newOption.textContent = ScreenName; // Set the text displayed to the user
            newOption.id = "optionScreen"+totalSCREENS; // Set the text displayed to the user
            selectSCREEN.appendChild(newOption);

            const NewScreenDiv = document.createElement("div");
            NewScreenDiv.style.display="none";

            NewScreenDiv.id="screen"+totalSCREENS;
            NewScreenDiv.className ="working-screen";//adding a global class to control all the screen's there


            const iframe = live_iframe;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            // Append the new element to the selected screen.
            iframeDoc.body.appendChild(NewScreenDiv);

            let newTIMELINE = document.createElement("div");
            newTIMELINE.id = "screen"+totalSCREENS;
            newTIMELINE.className = "timelineSCREEN";
            project_timeline.appendChild(newTIMELINE);

            //finally, automatic switch to the new screen
            SwitchTheScreen(totalSCREENS);
            selectSCREEN.value=totalSCREENS;//update the <select> value for <option>
            ScreensManager();//hide the dialog


        const NewSearchFilterScreen = document.createElement('option');

            // Set the value and text of the new option
            NewSearchFilterScreen.value = ScreenName;
            NewSearchFilterScreen.text = ScreenName;
            NewSearchFilterScreen.id = "search-"+totalSCREENS;

            //adding the new screen to the Filter drop menu
            screenFilter.appendChild(NewSearchFilterScreen);
            screenFilter.value=screenBUTTON.textContent;//automatically switch the "kit event" in workspace
            filterScreens(screenFilter.value);//automatically switch the "kit event" in workspace
        }
    }

        //this function will switch the current opened screen.
    function SwitchTheScreen(NewSelectedScreen, fromACTION=false)
    {
        LIVE_SCREEN=Number(NewSelectedScreen);

        //1: Hide all screens have the class name "working-screen".
        //2: Show The Selected Screen By it's value number.
        if(!fromACTION)//make sure this won't repeat when be called from actions.js
            live_iframe.contentWindow.SwitchCurrentScreen("screen"+LIVE_SCREEN);
        else selectSCREEN.value=NewSelectedScreen;//so if it's from actions.js THEN update the DropDownMenu text value.


        screenBUTTON.textContent= namingSCREENS.find(CurrentName => CurrentName[0] === Number(LIVE_SCREEN))[1];



        //to update timeline window
        //so you only see kit's that's related to current screen only.
        const elements = document.querySelectorAll(".timelineSCREEN");
        elements.forEach(function(element) {
            element.style.display = 'none';
        });
        document.getElementById("screen"+LIVE_SCREEN).style.display="block";

        timelineTITLE.textContent=`project_timeline For [${screenBUTTON.textContent}]`;

        screenSETTINGS.dataset.id = LIVE_SCREEN;//this updates the SCREEN PROPERTIES SETTINGS current active screen
        screenSETTINGS.dataset.background= screenPROPERTIES.find(screennn => screennn[0] === LIVE_SCREEN)[1]
            .split(":")[1];//spliting it because there's no need to store the property name "background" only it's value is important.


        unFocus();
        screenFilter.value=screenBUTTON.textContent;//automatically switch the "kit event" in workspace
        filterScreens(screenFilter.value);//automatically switch the "kit event" in workspace


    }

    //this function is used to entirely delete the selected screen
    function DeleteScreen()
    {
        let numberOfArrays = namingSCREENS.filter(Array.isArray).length;
        if(numberOfArrays==1)//denieding delete the LAST and ONLY SCREEN
            return;

        let deletedSCREEN=Number(LIVE_SCREEN);
        //delete from the array

        //array deletetion process.
        let indexToDelete = namingSCREENS.findIndex(CurrentName => CurrentName[0] === deletedSCREEN);
        if (indexToDelete !== -1) namingSCREENS.splice(indexToDelete, 1);
        if (indexToDelete !== -1) screenPROPERTIES.splice(indexToDelete, 1);

        //remove the screen from the options list.
        document.getElementById("optionScreen"+deletedSCREEN).remove();

        //selecting all the kits inside timeline div
        const goingTObeDELETED = document.querySelectorAll('#screen'+deletedSCREEN+ ' *');
        const ids = [];

        goingTObeDELETED.forEach(element => {
            ids.push(
                Number(element.id.replace("active_kit", ""))
            ); // Add the id to the array

        });


        //time to delete all the selected kits, via calling the REMOVINGtime and set true to multikit
        REMOVINGtime({multiKIT:true,kits:ids});
        //now toggle to random available screen:
        let randomIndex = Math.floor(Math.random() * namingSCREENS.length);
        SwitchTheScreen(namingSCREENS[randomIndex][0]);

        document.getElementById("search-"+deletedSCREEN).remove();

        //delete the whole screen

        live_iframe.contentWindow.deleteENTIREscreen(deletedSCREEN);

    }

//this function is used to ReName the screen from ScreenManager.
    function RenameScreen()
    {
        let ScreenNewName = prompt("Type The New Name:");

        if (ScreenNewName !== '' && ScreenNewName!== null) {
            let CurrentScreenToBeNamed=Number(LIVE_SCREEN);
            let OLDname;
            //select the <option> then updating it's name
            let UpdatedOption = document.getElementById("optionScreen"+CurrentScreenToBeNamed);
            UpdatedOption.textContent = ScreenNewName; // Set the text displayed to the user
            OLDname           =screenBUTTON.textContent;
            screenBUTTON.textContent    =ScreenNewName;
            timelineTITLE.textContent   =`project_timeline For [${ScreenNewName}]`;

            //updating the new name into names list
            let UpdatedScreenList = namingSCREENS.find(screennn => screennn[0] === CurrentScreenToBeNamed);
            UpdatedScreenList[1]=ScreenNewName;



            //update the name in WORKSPACE kits and search filter
            document.getElementById("search-"+CurrentScreenToBeNamed).value=ScreenNewName;
            document.getElementById("search-"+CurrentScreenToBeNamed).text=ScreenNewName;

            // Select all elements with the class 'kit_space_element'
            const elements = document.querySelectorAll('.kit_space_element');
            // Loop through each element
            elements.forEach(element => {
                // Check if the element has the class 'plus'
                if (element.classList.contains(screenDelimiter+OLDname)) {
                    // Replace 'plus' with 'okay'
                    element.classList.replace(screenDelimiter+OLDname, screenDelimiter+ScreenNewName);
                }
            });


            // Select all elements with the class 'kit_space_element'
            const spanELEMENT = document.querySelectorAll('.filterSPAN');
            // Loop through each element
            spanELEMENT.forEach(element => {
                // Check if the element has the class 'plus'
                if (element.textContent.includes(OLDname)) {
                    // Replace 'plus' with 'okay'
                    element.textContent = "["+ScreenNewName+"] ";
                }
            });



        }
    }

    //supposed to update everything related to screen settings properteis, starting from background color.
function updateSCREENproperties(BgColorValue)
{
    let newUPDATE = screenPROPERTIES.find(screennn => screennn[0] === LIVE_SCREEN);
    newUPDATE[1] ="background:"+BgColorValue;//updating the array property.
    screenSETTINGS.dataset.background=BgColorValue;//updating the currently dataset.

    //call the function inside IFRAME to do the work, updating the background color.
    live_iframe.contentWindow.UpdateBackgroundColor("screen"+LIVE_SCREEN,BgColorValue);


}









//drag and drop EVENTS

//project_live

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);
        event.dataTransfer.effectAllowed = 'copy';

        // Enable overlay for drag operation
        overlay.style.pointerEvents = 'auto'; // Capture drag events

    });

    draggable.addEventListener('dragend', () => {
        // Disable overlay after drag operation
        overlay.style.pointerEvents = 'none'; // Allow interaction with iframe
    });
});

overlay.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allow drop by preventing default behavior
    event.dataTransfer.dropEffect = 'copy'; // Indicate copy action
});

overlay.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const original = document.getElementById(id);
    if (original) {
        const clone = original.cloneNode(true);
        clone.id = `clone-${id}-${new Date().getTime()}`; // Unique ID for the clone

        // Optional: Manipulate the iframe here if needed
        console.log("added");
        addKIT(Number(id.replace('drag', '')));
        //console.log(id.replace('drag', ''));
    }
});

