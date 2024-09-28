//This Function is used to add the functional kit's to appear on screen
function Func_KIT(kit_name,kitID,KITtype)
{
    const NewFuncKIT = document.createElement("p");
    NewFuncKIT.id="code" + kitID;
    NewFuncKIT.className  ="kit_space_element";
    NewFuncKIT.textContent = kit_name;


    NewFuncKIT.onclick = () => show_Event_KIT(kitID,KITtype);

    kit_space.appendChild(NewFuncKIT);
}


//This Function is used to Show The Suitable event's for the selected kit
function show_Event_KIT(kitID,KITtype)
{

    workspace_hidden_kitID.value=kitID;
    document.getElementById("playground_space_container").innerHTML="";
    actions_space.style.display="none";

    // Loop through each kit to remove selected highlight
    document.querySelectorAll('.kit_space_element').forEach((element) => {
        element.classList.remove("selected_kit_from_space");
    });
    document.getElementById("code" + kitID).classList.add("selected_kit_from_space");

// Loop through each element and hide it
    ALL_available_EVENTS.forEach((element) => {
        element.style.display = 'none'; // Hides the element
    });


// you have to hide the * sign from the UnUsed event
    ALL_available_EVENTS.forEach((element) => {


        if(!document.getElementById("code" + kitID)
            .hasAttribute
            ("data-event-"+element.dataset.event))
        {

            //this means the specific kit doesn't have an attached actions with this event
            element.classList.remove("beforeACTIVE");


        }
        else {
            element.classList.add("beforeACTIVE");

        }


    });


    switch (KITtype)
        {
            case 3://Button
                event_CLICK.style.display="block";
                event_LONGPRESS.style.display="block";
                break;
            case 5://Timer
                event_TRICK.style.display="block";
                break;
        }

}

//This Function Create ALL THE EVENT'S THERE
function Event_KIT(CurrentEvent)
{
    let CurrentkitID = workspace_hidden_kitID.value;
    let CurrentCode = document.getElementById("code" + CurrentkitID);

    actions_space.style.display="block";
    switch (CurrentEvent)
    {
        case "click":

            currentACTIVEevent="click";
            //fake examples on setting some actions
            //dynamicBLOCKsize["click"+CurrentkitID]=2;
            //dynamicMap.set('clickcode'+CurrentkitID+'0', 'changetext,live0,ThisIsNewValue');
            //dynamicMap.set('clickcode'+CurrentkitID+'1', 'changecolor,live0,red');
            StartPlayGround(CurrentkitID,currentACTIVEevent);


            break;

        case "longpress":
                //CurrentCode.dataset.eventLongpress = "true";
                currentACTIVEevent="longpress";
            //fake examples on setting some actions
            //dynamicBLOCKsize["longpress"+CurrentkitID]=1;
            //dynamicMap.set('longpresscode'+CurrentkitID+'0', 'changetext,live0,Life is always good');
            StartPlayGround(CurrentkitID,currentACTIVEevent);
            break;

        case "trick":
                //CurrentCode.dataset.eventTrick = "true";
                currentACTIVEevent="trick";
            break;
    }

}






//dynamicMap.set('var1', 'Hello World');
//dynamicMap.get('var1')
//This Function Will Display The Current PlayGround
function StartPlayGround(kitID,EventCase)
{
    document.getElementById("playground_space_container").innerHTML="";
    actions_space.style.display="block";
    switch (EventCase){
        case "click":

                var blocksSize = dynamicBLOCKsize[currentACTIVEevent+kitID];
                if(isNaN(blocksSize))blocksSize=0;
                const container = document.getElementById('playground_space_container');

                var eventParagraph = document.createElement('p');
                eventParagraph.className = 'eventONclick';
                eventParagraph.textContent = 'On Click';

                container.appendChild(eventParagraph);



                for (let i = 1; i < blocksSize+1; i++) {



                   const words = dynamicMap.get(currentACTIVEevent+"code"+kitID+i).split(',');
                   ADDINGsingleBLOCK(words);



                }

            break;
        case "longpress":


                var blocksSize = dynamicBLOCKsize[currentACTIVEevent+kitID];
                if(isNaN(blocksSize))blocksSize=0;



                var eventParagraph = document.createElement('p');
                eventParagraph.className = 'eventONclick';
                eventParagraph.textContent = 'On LongPress';

                playground_space.appendChild(eventParagraph);

                for (let i = 1; i < blocksSize+1; i++) {

                    const words = dynamicMap.get(currentACTIVEevent+"code"+kitID+i).split(',');
                    ADDINGsingleBLOCK(words);

                }


            break;
    }

}

//The Purpose of this function is to create a only one SINGLE block and add it to the workspace
function ADDINGsingleBLOCK(words)
{
    //Creating the single action block
    const actionParagraph = document.createElement('p');
    actionParagraph.className = 'action_block';
    actionParagraph.textContent =words[0];

    //creating the entire block
    const propertiesBlock = document.createElement('div');
    propertiesBlock.className = 'properties_block';


    const kitSpan = document.createElement('span');
    kitSpan.textContent = 'Kit :';


    const kitSelect = document.createElement('select');
    [words[1], 2, 3].forEach(num => {
        const option = document.createElement('option');
        option.textContent = num;
        kitSelect.appendChild(option);
    });

    const valueSpan = document.createElement('span');
    valueSpan.textContent = 'Value :';
    switch (words[0])
    {
        case "changetext":
            var valueInput = document.createElement('input');
            valueInput.type = 'text'; // Set the input type to text
            valueInput.placeholder = words[2]; // Optional placeholder text
            break;
        case "changecolor":
            var valueInput = document.createElement('select');
            ["black","blue","red"].forEach(num => {
                const option = document.createElement('option');
                option.textContent = num;
                valueInput.appendChild(option);
            });
            break;
    }



    propertiesBlock.appendChild(kitSpan);
    propertiesBlock.appendChild(kitSelect);
    propertiesBlock.appendChild(valueSpan);
    propertiesBlock.appendChild(valueInput);


    playground_space.appendChild(actionParagraph);
    playground_space.appendChild(propertiesBlock);

    const lineBreak = document.createElement('br');
    playground_space.appendChild(lineBreak);
}

function action_add(actionType)
{
    let CurrentkitID = workspace_hidden_kitID.value;

    // Increment the value if it's a valid number; otherwise, initialize it
    dynamicBLOCKsize[currentACTIVEevent + CurrentkitID] =
        (dynamicBLOCKsize[currentACTIVEevent + CurrentkitID] ?? 0) + 1;

    //this line selected the current active EVENT, for example click, and find the div parent for it
    //so click will convert to "event_CLICK"
    document.getElementById("event_"+currentACTIVEevent.toUpperCase())
        .classList.add("beforeACTIVE");

//you have stopped here, the issue you can see it by yourself in USER INTERFACE
    //the <header> like click event for example is not showing
    //i've correct this code by replacing the zero with real numbers
    switch (actionType)
    {
        case "ChangeText":
            dynamicMap.set(currentACTIVEevent+'code'+CurrentkitID+dynamicBLOCKsize[currentACTIVEevent + CurrentkitID], 'changetext,live0,ThisIsNewValue');
            var words = dynamicMap.get(currentACTIVEevent+'code'+CurrentkitID+dynamicBLOCKsize[currentACTIVEevent + CurrentkitID]).split(',');

            break;
        case "ChangeColor":
            dynamicMap.set(currentACTIVEevent+'code'+CurrentkitID+dynamicBLOCKsize[currentACTIVEevent + CurrentkitID], 'changecolor,live0,blue');
            var words = dynamicMap.get(currentACTIVEevent+'code'+CurrentkitID+dynamicBLOCKsize[currentACTIVEevent + CurrentkitID]).split(',');

            break;
    }

    //this line should save the event as true inside the kit attribute
    document.getElementById("code"+CurrentkitID)
        .setAttribute("data-event-"+currentACTIVEevent, "true");

    ADDINGsingleBLOCK(words);
}