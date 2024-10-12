// SO HERE ALL JAVASCRIPT VARIABLES WILL DECLARED HERE

//this one is the global var to make sure inside iframe funcs are runnable or not.
// now a global var
window.ACTIVErun=false;

//global function should be used in all project :
//THIS CONTROL IS MADE FOR MAKING IT EASIER TO HAVE THE CONTROL ID
function GET_DOC_ID(prefix_name,kitID){
    return document.getElementById(prefix_name+kitID);
}




//Basic array list for active added elements to the project time_line and project_live
let active_kit =[];
let COUNT_KIT_PROGRESS =0;
let project_timeline = document.getElementById('project_timeline'),

    properties_value = document.getElementById('properties_value'),
    properties_name = document.getElementById('properties_name'),
    screenBUTTON = document.getElementById('screenBUTTON'),
    screensPage = document.getElementById("screensPAGE");

// [START] SCREEN MANAGER AREA [START]

let totalSCREENS=1;//never gets decreased
let namingSCREENS =[[1,"Screen1"]];//adding the default screen by default
let LIVE_SCREEN =1;//THE CURRENT OPENED SCREEN.
//the select control.
let selectSCREEN=document.getElementById('selectSCREEN');

// [END] SCREEN MANAGER AREA [END]


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


//HINT SECTION
const kit_HINTS = ["",
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