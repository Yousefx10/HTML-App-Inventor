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

    StartPlayGround(kitID);
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

            //fake examples on setting some actions
            dynamicBLOCKsize[CurrentkitID]=2;
            dynamicMap.set('code'+CurrentkitID+'0', 'changetext,live0,ThisIsNewValue');
            dynamicMap.set('code'+CurrentkitID+'1', 'changecolor,live0,red');
            break;

        case "longpress":
                CurrentCode.dataset.eventPress = "true";
            break;

        case "trick":
                CurrentCode.dataset.eventTrick = "true";
            break;
    }

}
const dynamicBLOCKsize = [];
//dynamicArray[0] = 'First Value';
const dynamicMap = new Map();

//dynamicMap.set('var1', 'Hello World');
//dynamicMap.get('var1')
//This Function Will Display The Current PlayGround
function StartPlayGround(kitID)
{
   if(document.getElementById("code"+kitID).dataset.eventClick)
   {
       console.log("kit have click event");
       let blocksSize = dynamicBLOCKsize[kitID];

       const container = document.getElementById('playground_space_container');

       const eventParagraph = document.createElement('p');
       eventParagraph.className = 'eventONclick';
       eventParagraph.textContent = 'On Click';

       container.appendChild(eventParagraph);

       for (let i = 0; i < blocksSize; i++) {

           const actionParagraph = document.createElement('p');
           actionParagraph.className = 'action_block';
           actionParagraph.textContent = 'Change Text';

           const propertiesBlock = document.createElement('div');
           propertiesBlock.className = 'properties_block';

           const kitSpan = document.createElement('span');
           kitSpan.textContent = 'Kit :';


           const kitSelect = document.createElement('select');
           [1, 2, 3].forEach(num => {
               const option = document.createElement('option');
               option.textContent = num;
               kitSelect.appendChild(option);
           });

           const valueSpan = document.createElement('span');
           valueSpan.textContent = 'Value :';

           const valueSelect = document.createElement('select');
           [1, 2, 3].forEach(num => {
               const option = document.createElement('option');
               option.textContent = num;
               valueSelect.appendChild(option);
           });

           propertiesBlock.appendChild(kitSpan);
           propertiesBlock.appendChild(kitSelect);
           propertiesBlock.appendChild(valueSpan);
           propertiesBlock.appendChild(valueSelect);


           container.appendChild(actionParagraph);
           container.appendChild(propertiesBlock);

           const lineBreak = document.createElement('br');
           container.appendChild(lineBreak);


       }

   }
}
