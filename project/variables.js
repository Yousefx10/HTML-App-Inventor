// SO HERE ALL JAVASCRIPT VARIABLES WILL DECLARED HERE



//Basic array list for active added elements to the project time_line and project_live
let active_kit =[];
let COUNT_KIT_PROGRESS =0;
let project_timeline = document.getElementById('project_timeline'),

    properties_value = document.getElementById('properties_value'),
    properties_name = document.getElementById('properties_name');


//Variable For hidden_kitID [the hidden element that saves the current kit's ID]
let hidden_kitID = document.getElementById('hidden_kitID');

//Variable For live_iframe [THE HEART OF IFRAME ELEMENT]
let live_iframe = document.getElementById('live_iframe');


let DELETEbtn = document.getElementById("Remove_button");
let SAVEbtn = document.getElementById("Save_button");

let infoParagraph = document.getElementById("infoP");













//[[DEFAULT VARIABLES ARENA]]
const phrase1 = "You've Added a ";

//kit type instructions :
//1 : label
//2 : text
const element1 = "Label";
const element2 = "Text";
//[[DEFAULT VARIABLES ARENA]]