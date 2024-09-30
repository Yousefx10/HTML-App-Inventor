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
            StartPlayGround(CurrentkitID,currentACTIVEevent);
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


                const container = document.getElementById('playground_space_container');

                var eventParagraph = document.createElement('p');
                eventParagraph.className = 'eventBOXtitle';
                eventParagraph.textContent = 'On Click';

                container.appendChild(eventParagraph);







            break;
        case "longpress":




                var eventParagraph = document.createElement('p');
                eventParagraph.className = 'eventBOXtitle';
                eventParagraph.textContent = 'On LongPress';

                playground_space.appendChild(eventParagraph);



            break;

        case "trick":


            var eventParagraph = document.createElement('p');
            eventParagraph.className = 'eventBOXtitle';
            eventParagraph.textContent = 'While Trick';

            playground_space.appendChild(eventParagraph);



            break;
    }



    //NO NEED TO Repeat the code, it's one code FOR ALL events
    var blocksSize = dynamicBLOCKsize[currentACTIVEevent+"code"+kitID];
    if(isNaN(blocksSize))blocksSize=0;
    //Adding . dot sign after the code kitID so it won't be mixed with future logic fatal error
    let prefix = currentACTIVEevent, contains = 'code'+kitID+".";
    ACTIVEactions
        .filter(blockID => blockID.startsWith(prefix) && blockID.includes(contains)) // Apply rules
        .forEach(blockID => {



            const words = dynamicMap.get(blockID).split(',');
            ADDINGsingleBLOCK(words,blockID);

        });




}



//The Purpose of this function is to create a only one SINGLE block and add it to the workspace
function ADDINGsingleBLOCK(words,FullBlockID)
{
    //Creating the single action block
    const actionParagraph = document.createElement('p');

    actionParagraph.className = 'action_block';
    actionParagraph.textContent =words[0];

    //new line that adds the X to REMOVE blocks
    const DeleteBlock = document.createElement('span');
    DeleteBlock.className = 'DeleteBlock';
    DeleteBlock.textContent ="X";
    DeleteBlock.onclick = function() {
        //the code to remove the block correctly will be called here
        deleteblock(FullBlockID);

    };


    //creating the entire block
    const FullBlock = document.createElement('div');
    FullBlock.id = FullBlockID;

    const propertiesBlock = document.createElement('div');
    propertiesBlock.className = 'properties_block';


    const kitSpan = document.createElement('span');
    kitSpan.textContent = 'Kit :';


    const kitSelect = document.createElement('select');
    kitSelect.setAttribute('onchange', 'updateACTIONvalue(event,"kit",this.parentNode.parentNode.id);');

    active_kit.forEach(num => {
        const option = document.createElement('option');
        option.textContent = num[0]+num[1];
        option.value = num[0];
        kitSelect.appendChild(option);
    });

    //SO I WILL STOP HERE, I WILL FOCUS ON CONVERTING THIS ARRAY TO MAP ARRAY.
    kitSelect.value= words[1];


    const valueSpan = document.createElement('span');
    valueSpan.textContent = 'Value :';
    switch (words[0])
    {
        case "changetext":
            var valueInput = document.createElement('input');
            valueInput.type = 'text'; // Set the input type to text
            valueInput.placeholder = words[2]; // Optional placeholder text
            valueInput.setAttribute('onchange', 'updateACTIONvalue(event,"value",this.parentNode.parentNode.id);');
            break;
        case "changecolor":
            var valueInput = document.createElement('select');
            ["black","blue","red"].forEach(num => {
                const option = document.createElement('option');
                option.textContent = num;
                option.value = num;
                valueInput.appendChild(option);
            });
            valueInput.value= words[2];

            valueInput.setAttribute('onchange', 'updateACTIONvalue(event,"value",this.parentNode.parentNode.id);');
            break;
        case "changevisibility":
            var valueInput = document.createElement('select');
            ["Visible","Hidden"].forEach(num => {
                const option = document.createElement('option');
                option.textContent = num;
                option.value = num;
                valueInput.appendChild(option);
            });
            valueInput.value= words[2];

            valueInput.setAttribute('onchange', 'updateACTIONvalue(event,"value",this.parentNode.parentNode.id);');
            break;
    }

    const lineBreak = document.createElement('br');


    propertiesBlock.appendChild(kitSpan);
    propertiesBlock.appendChild(kitSelect);
    propertiesBlock.appendChild(valueSpan);
    propertiesBlock.appendChild(valueInput);

    FullBlock.appendChild(DeleteBlock);
    FullBlock.appendChild(actionParagraph);
    FullBlock.appendChild(propertiesBlock);
    FullBlock.appendChild(lineBreak);

    playground_space.appendChild(FullBlock);


}

function deleteblock(FullBlockID)
{

    //this will help to minus 1 from the totall blocks
    //this lines prints the count of actions
    let CURRENTcountofActions = FullBlockID.split('.')[0];
    ACTIVEactions = ACTIVEactions.filter(value => value !== FullBlockID);
    dynamicMap.delete(FullBlockID);

    document.getElementById(FullBlockID).remove();

    if(!ACTIVEactions.some(element => element.includes(CURRENTcountofActions+".")))
    {
        let CurrentkitID = workspace_hidden_kitID.value;
        document.getElementById("code"+CurrentkitID)
            .removeAttribute("data-event-"+currentACTIVEevent);

        document.getElementById("event_"+currentACTIVEevent.toUpperCase())
            .classList.remove("beforeACTIVE");

        dynamicBLOCKsize[CURRENTcountofActions] = 0;
    }
}











function action_add(actionType)
{
    let CurrentkitID = workspace_hidden_kitID.value;

    //instead of increasing the value, store all the valid ID's
    //back to have the ACTION BLOCK COUNTER
    dynamicBLOCKsize[currentACTIVEevent +"code"+ CurrentkitID] =
        (dynamicBLOCKsize[currentACTIVEevent +"code"+ CurrentkitID] ?? 0) + 1;
    let temp_dynamicBLOCKsize = dynamicBLOCKsize[currentACTIVEevent +"code"+ CurrentkitID] ;



    //this line selected the current active EVENT, for example click, and find the div parent for it
    //so click will convert to "event_CLICK"
    document.getElementById("event_"+currentACTIVEevent.toUpperCase())
        .classList.add("beforeACTIVE");

//you have stopped here, the issue you can see it by yourself in USER INTERFACE
    //the <header> like click event for example is not showing
    //i've correct this code by replacing the zero with real numbers
    var words;
    var tempLONGvalue = currentACTIVEevent+'code'+CurrentkitID+"."+temp_dynamicBLOCKsize;

    switch (actionType)
    {
        case "ChangeText":
            dynamicMap.set(tempLONGvalue, 'changetext,0,This Is New Value');//adding ZERO as default value.
            console.log(tempLONGvalue);
             words = dynamicMap.get(tempLONGvalue).split(',');

            break;
        case "ChangeColor":
            dynamicMap.set(tempLONGvalue, 'changecolor,0,blue');//adding ZERO as default kitID value.

            words = dynamicMap.get(tempLONGvalue).split(',');

            break;
        case "ChangeVisibility":
            dynamicMap.set(tempLONGvalue, 'changevisibility,0,Hidden');//as default will be hidden

            words = dynamicMap.get(tempLONGvalue).split(',');

            break;
    }
    if (!ACTIVEactions.includes(tempLONGvalue)) {
        ACTIVEactions.push(tempLONGvalue);
    }

    //this line should save the event as true inside the kit attribute
    document.getElementById("code"+CurrentkitID)
        .setAttribute("data-event-"+currentACTIVEevent, "true");

    ADDINGsingleBLOCK(words,tempLONGvalue);
    event_action_set(CurrentkitID);
}

function event_action_set(kitID)
{

    live_iframe.contentWindow.document.getElementById('live'+kitID)
        .setAttribute("on"+currentACTIVEevent,`global_onClick(${kitID});`);
}



function updateACTIONvalue(event,updateTYPE,fullID)
{
    const selectedValue = event.target.value;
    let getkitIDfromSTRING = parseInt(selectedValue, 10);
    let newkitID_VALUE;
    switch (updateTYPE)
    {
        case "kit":
            //convert string to number to get the kitID, but the number should be always in the beginning of the string

             newkitID_VALUE =
                 dynamicMap.get(fullID).split(",").map((item, index) => index === 1 ? getkitIDfromSTRING : item).join(",");

            break;
        case "value":
             newkitID_VALUE =
                 dynamicMap.get(fullID).split(",").map((item, index) => index === 2 ? selectedValue : item).join(",");
            break;
    }


    dynamicMap.set(fullID, newkitID_VALUE);//adding ZERO as default value.

}