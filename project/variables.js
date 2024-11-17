// SO HERE ALL JAVASCRIPT VARIABLES WILL DECLARED HERE

//this one is the global var to make sure inside iframe funcs are runnable or not.
// now a global var
window.ACTIVErun=false;

//global function should be used in all project :
//THIS CONTROL IS MADE FOR MAKING IT EASIER TO HAVE THE CONTROL ID
function GET_DOC_ID(prefix_name,kitID){
    return document.getElementById(prefix_name+kitID);
}

document.addEventListener('keydown', function(event) {
    // Check if the Alt key and the '1' key are pressed
    //use key code instaed of key known name
    if (event.altKey && event.code === 'Digit1') {
        event.preventDefault();  // Prevent default behavior if needed
        switchScreen();
    }
    if (event.altKey && event.code === 'Digit2') {
        event.preventDefault();  // Prevent default behavior if needed
        runTHEproject();
    }
});

function ShowingToolTip(selectedELEMENT,STATUS)
{
    if(STATUS)
    {
        selectedELEMENT.style.zIndex='300';
        selectedELEMENT.style.opacity='1';
    }
    else
    {
        selectedELEMENT.style.zIndex='1';
        selectedELEMENT.style.opacity='0';
    }
}


//Basic array list for active added elements to the project time_line and project_live
const overlay = document.getElementById('overlay');
const dropIndicator = document.getElementById('drop-indicator');

let active_kit =[];
let COUNT_KIT_PROGRESS =0;
let project_timeline = document.getElementById('project_timeline'),
    timelineTITLE = document.getElementById('timelineTITLE'),//this one will add screen name in the title
    screenSETTINGS = document.getElementById("screenSETTINGS"),

    properties_value = document.getElementById('properties_value'),
    properties_name = document.getElementById('properties_name'),
    screenBUTTON = document.getElementById('screenBUTTON'),
    screensPage = document.getElementById("screensPAGE"),
    RunButton = document.getElementById("RunButton"),
    ScreenshotButton = document.getElementById("Screenshot"),
    ScreenshotResult = document.getElementById("ScreenshotResult"),
    ActButtonTooltip = document.getElementById("ActButtonTooltip");


let
    propertiesVISIBILITY = document.getElementById('propertiesVISIBILITY'),
    propertiesALIGNMENT = document.getElementById('propertiesALIGNMENT'),
    propertiesMARGIN = document.getElementById('propertiesMARGIN'),
    propertiesBORDER = document.getElementById('propertiesBORDER'),
    propertiesCOLOR = document.getElementById('propertiesCOLOR'),
    propertiesSIZE = document.getElementById('propertiesSIZE'),
    propertiesBACKGROUND = document.getElementById("propertiesBACKGROUND");


let
    UnselectIMG = document.getElementById("UnselectIMG"),
    imgDIALOG = document.getElementById('imgDIALOG'),
    imageContainer = document.getElementById('imgArea'),
    SelectedPicture = document.getElementById('SelectedPicture');





// [START] SCREEN MANAGER AREA [START]


//this one is now GLOBAL variable
window. namingSCREENS      =[[1,"screen1"]];//adding the default screen by default
let screenPROPERTIES =[[1,"background:#f0f0f0"]];//storing each property, and then seperate it by ":"
// for now, only background color.


let totalSCREENS=1;//never gets decreased

let LIVE_SCREEN =1;//THE CURRENT OPENED SCREEN.

let selectSCREEN=document.getElementById('selectSCREEN');//the select control.
let screenFilter=document.getElementById('screenFilter');//search Screen Filter in workspace.
// THE SCREEN Delimiter to filter.
let screenDelimiter="SCR-_";

// [END] SCREEN MANAGER AREA [END]

//the kits that can be draged and droped
const draggables = document.querySelectorAll('.draggable');


//Variable For hidden_kitID [the hidden element that saves the current kit's ID]
let hidden_kitID = document.getElementById('hidden_kitID');
let mainAlignmentSPAN = document.getElementById('mainAlignmentSPAN');

//Variable For live_iframe [THE HEART OF IFRAME ELEMENT]
let live_iframe = document.getElementById('live_iframe');
let TimerButton = document.getElementById('TimerButton');
let rangerINPUT = document.getElementById('timerDuration');
let spanRanger = document.getElementById('spanRanger');

let DELETEbtn = document.getElementById("Remove_button");
let SAVEbtn = document.getElementById("Save_button");

let infoParagraph = document.getElementById("infoP");

//current borders group without the checkbox
let bordersAll = document.getElementById("bordersAll");

let bordersCHECKbox = document.getElementById("border_checkBox");


let TIMEtoSHOWhints=false;

//so the purpose of this array if to check for kits that won't be added into the ACTION ARROW,
// like Timer For Example it does not have any Properties like text or background etx.
const notAllowedKTIS =[
    "Timer"
];



//HINT SECTION
let kit_HINTS = ["",//all being removed once it's loaded in the page.
    "This is a label which makes you to print out something",    //for Label (1)
    "This is a text which helps you to display a longer texts",  //for Text  (2)
    "This is a button which enables you to click on it and run some functions",  //for Button  (3)
    "Allows You To Insert Images",  //for Picture  (4)
    "Get a running timer"  //for Timer  (5)
];


//[START]Variables For Workspace ONLY
//********************************
let kit_space = document.getElementById('kit_space_container');
let event_space = document.getElementById('event_space_container');
const playground_space = document.getElementById('playground_space_container');
let actions_space = document.getElementById('actions_space_container');
let workspace_hidden_kitID = document.getElementById('EVENTcurrentkitID');

//this finds all the events there, to hide them or unhide them.
let ALL_available_EVENTS = document.querySelectorAll('.event_item');
let currentACTIVEevent="";

//i'll use this for several usages
const listOFevents=[
    "click",
    "longpress",
    "trick",
]

const CONTROLelements = ["button", "img"];

let event_CLICK = document.getElementById("event_CLICK");
let event_LONGPRESS = document.getElementById("event_LONGPRESS");
let event_TRICK = document.getElementById("event_TRICK");

//this variable will save the current full id
let currentOPENED_dialog="";
const properties_dialog = document.getElementById('dialog');
let currentDIALOGbutton;//this will used to define the current button that have opened the dialog so i can resize it.

//Choose kit <select>
const advance_kit_property= document.getElementById('chooseKITproperties');
//Choose Value <select>
const advance_value_property= document.getElementById('chooseProperties');
//the div that contains the both previous elements [Choose kit,Choose Value]
let dialogPROPERTIES = document.getElementById("dialogPROPERTIES");

//get the current [Choose Kit's Value] whether it's checked = choose this option, else : user will write his value.
let allowCHANGEproperties = document.getElementById("allowCHANGEproperties");






//This const is for knowing how long the kit have blocks on it's event
const dynamicBLOCKsize = {};
//dynamicArray[0] = 'First Value';


//this one is now GLOBAL VARIABLE and so it's accessible within any IFRAME
//WINDOW. this means that the variable has been created and got globally, no need to var,let,const etc.
window.dynamicMap = new Map();

//this will store the actions FULL id, no matter got deleted or no
//WINDOW. this means that the variable has been created and got globally, no need to var,let,const etc.
window.ACTIVEactions=[];

let ActionBlockComments=[];//will holds the USER TYPED COMMENTS

let FontSizesNAMES =[
    ["Tiny", "x-small"],
    ["Small", "small"],
    ["Medium", "medium"],
    ["Large", "large"],
    ["Huge", "x-large"]
];


const customFontSizeOption = document.createElement('option');

// Set its properties
customFontSizeOption.value = 'custom';
customFontSizeOption.id = 'fontSizeCustom';
customFontSizeOption.textContent = 'Custom';






//in this const, i'll replace "," with "~|" to get sure user won't include it on their string
const ProjectDelimiter="~|";
//********************************
//[END]Variables For Workspace ONLY




//[[DEFAULT VARIABLES ARENA]]
const phrase1 = "You've Added a ";
const phrase2 = "Click Me";
const phrase3 = "Image Area";
const phrase4 = "Running";

//kit type instructions :
//1 : label
//2 : text
//3 : Button
//4 : Picture
const element1 = "Label";
const element2 = "Text";
const element3 = "Button";
const element4 = "Picture";
const element5 = "Timer";
//[[DEFAULT VARIABLES ARENA]]