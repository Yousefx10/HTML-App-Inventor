//current variable for this space will be added here
//then will be moved later to "variables.js"

let kit_space = document.getElementById('kit_space_container');
let event_space = document.getElementById('event_space_container');

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
    Event_KIT();
    switch (KITtype)
        {
            case 3://Button
                break;
            case 5://Timer
                break;
        }
}

//This Function Create ALL THE EVENT'S THERE
function Event_KIT(kitID)
{
    const e_CLICK = document.createElement("p");
    const e_LongPress = document.createElement("p");
    const e_TimerDing = document.createElement("p");


    e_CLICK.textContent = "On Click[]";
    e_LongPress.textContent = "On LongPress[]";
    e_TimerDing.textContent = "When Trick[]";


    event_space.appendChild(e_CLICK);
    event_space.appendChild(e_LongPress);
    event_space.appendChild(e_TimerDing);
}