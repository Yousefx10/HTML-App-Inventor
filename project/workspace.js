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



// Loop through each element and hide it
    ALL_available_EVENTS.forEach((element) => {
        element.style.display = 'none'; // Hides the element
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
    switch (CurrentEvent)
    {
        case "click":
            CurrentCode.dataset.eventClick = "true";

            //fake examples on setting some actions
            dynamicBLOCKsize["click"+CurrentkitID]=2;
            dynamicMap.set('clickcode'+CurrentkitID+'0', 'changetext,live0,ThisIsNewValue');
            dynamicMap.set('clickcode'+CurrentkitID+'1', 'changecolor,live0,red');
            StartPlayGround(CurrentkitID,"click");
            break;

        case "longpress":
                CurrentCode.dataset.eventPress = "true";

            //fake examples on setting some actions
            dynamicBLOCKsize["longpress"+CurrentkitID]=1;
            dynamicMap.set('longpresscode'+CurrentkitID+'0', 'changetext,live0,Life is always good');
            StartPlayGround(CurrentkitID,"longpress");
            break;

        case "trick":
                CurrentCode.dataset.eventTrick = "true";
            break;
    }

}






//dynamicMap.set('var1', 'Hello World');
//dynamicMap.get('var1')
//This Function Will Display The Current PlayGround
function StartPlayGround(kitID,EventCase)
{
    document.getElementById("playground_space_container").innerHTML="";
    switch (EventCase){
        case "click":
            if(document.getElementById("code"+kitID).dataset.eventClick)
            {
                console.log("kit have click event");
                let blocksSize = dynamicBLOCKsize["click"+kitID];

                const container = document.getElementById('playground_space_container');

                const eventParagraph = document.createElement('p');
                eventParagraph.className = 'eventONclick';
                eventParagraph.textContent = 'On Click';

                container.appendChild(eventParagraph);

                for (let i = 0; i < blocksSize; i++) {

                    const words = dynamicMap.get('clickcode'+kitID+i).split(',');

                    const actionParagraph = document.createElement('p');
                    actionParagraph.className = 'action_block';
                    actionParagraph.textContent =words[0];



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


                    container.appendChild(actionParagraph);
                    container.appendChild(propertiesBlock);

                    const lineBreak = document.createElement('br');
                    container.appendChild(lineBreak);


                }

            }
            break;
        case "longpress":
            if(document.getElementById("code"+kitID).dataset.eventPress)
            {
                console.log("kit have LongPress event");
                let blocksSize = dynamicBLOCKsize["longpress"+kitID];

                const container = document.getElementById('playground_space_container');

                const eventParagraph = document.createElement('p');
                eventParagraph.className = 'eventONclick';
                eventParagraph.textContent = 'On LongPress';

                container.appendChild(eventParagraph);

                for (let i = 0; i < blocksSize; i++) {

                    const words = dynamicMap.get('longpresscode'+kitID+i).split(',');

                    const actionParagraph = document.createElement('p');
                    actionParagraph.className = 'action_block';
                    actionParagraph.textContent =words[0];



                    const propertiesBlock = document.createElement('div');
                    propertiesBlock.className = 'properties_block';

                    const kitSpan = document.createElement('span');
                    kitSpan.textContent = 'Kit :';


                    const kitSelect = document.createElement('select');
                    [words[1], 2, 3].forEach(num => {
                        const option = document.createElement('option');
                        option.textContent = num;
                        kitSelect.appendChild(option);
                    });//you have stopped here, you have to select the correct value.

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


                    container.appendChild(actionParagraph);
                    container.appendChild(propertiesBlock);

                    const lineBreak = document.createElement('br');
                    container.appendChild(lineBreak);


                }

            }
            break;
    }

}
