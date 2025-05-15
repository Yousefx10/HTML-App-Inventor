//This script contains independent ACTIONS for the build process.



//event name    - ex: changetext.
//elementID     - ex: selected kit like label, button, etc.
//VALUE         - ex: new text, color, etc.
function DoAction(act_Event, act_ID, act_Value)
{
    switch (act_Event) {
        case "changetext":
            Do_UpdateContent(act_ID, act_Value);
            break;
        case "changecolor":
            UpdateColor(act_ID, act_Value);
            break;
        case "changevisibility":
            ToggleHiding(act_ID);
            break;
        case "changefontsize":
            UpdateFontSize(act_ID, act_Value);
            break;
        case "changealignment":
            kitAlignment(act_ID, act_Value);
            break;
        case "changebackground":
            UpdateBackgroundColor(act_ID, act_Value);
            break;
        case "switchscreen":
            SwitchCurrentScreen(act_ID, act_Value);
            break;
        default:
            console.error("Unknown action event:", act_Event);
    }
}


//1)=> Function to update the content of an element.
function Do_UpdateContent(act_ID, act_Value){
    document.getElementById("live"+act_ID).innerHTML=act_Value;
}