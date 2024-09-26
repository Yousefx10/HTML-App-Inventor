//current variable for this space will be added here
//then will be moved later to "variables.js"

let kit_space = document.getElementById('kit_space_container');
let event_space = document.getElementById('event_space_container');
let workspace_hidden_kitID = document.getElementById('EVENTcurrentkitID');

//This Function is used to add the functional kit's to appear on screen
function Func_KIT(kit_name,kitID,KITtype)
{
    const NewFuncKIT = document.createElement("p");
    NewFuncKIT.id="code" + kitID;
    NewFuncKIT.textContent = kit_name;


    NewFuncKIT.onclick = () => show_Event_KIT(kitID,KITtype);

    kit_space.appendChild(NewFuncKIT);
}


//This Function is used to Show The Suitable event's for the selected kit
function show_Event_KIT(kitID,KITtype)
{
    switch (KITtype)
        {
            case 3://Button

                break;
            case 5://Timer
                break;
        }

    StartPlayGround();
}

//This Function Create ALL THE EVENT'S THERE
function Event_KIT(CurrentEvent)
{
    let CurrentkitID = workspace_hidden_kitID.value;
    let CurrentCode = document.getElementById("code" + CurrentkitID);
    switch (CurrentEvent)
    {
        case "click":
                CurrentCode.dataset.eventClick = "true";
            break;

        case "longpress":
                CurrentCode.dataset.eventPress = "true";
            break;

        case "trick":
                CurrentCode.dataset.eventTrick = "true";
            break;
    }

}

//This Function Will Display The Current PlayGround
function StartPlayGround()
{

}
