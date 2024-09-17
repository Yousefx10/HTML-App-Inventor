


//[FUNCTIONS] Area
function addKIT(kit_type)
{
    //Main element that will have the content for the new added element.
    let newParagraph = document.createElement('p');
        newParagraph.classList.add('project_timeline_kit');
        newParagraph.id='test' + kit_type;

//this i can pass parameters without EXECUTE the function FROM FIRST TIME
newParagraph.onclick = () => timeline_properties('param1',newParagraph.innerHTML);




    COUNT_KIT_PROGRESS++;
    switch(kit_type){

        case 1:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newParagraph.textContent = "You've Added a Label";
            break;

        case 2:
            active_kit.push([COUNT_KIT_PROGRESS,NameKit(kit_type)]);
            newParagraph.textContent = "You've Added a Text";
            break;
    }
    console.log(active_kit);
    project_timeline.appendChild(newParagraph);

}

function NameKit(kit_num)
{
    //kit type instructions :
    //1 : label
    //2 : text

    switch(kit_num){
        case 1:
            return 'Label';
            break;
        case 2:
            return 'Text';
            break;
    }
}

function timeline_properties(current_kit,current_details)
{
    properties_value.value =current_details;
    properties_name.innerHTML =current_kit;
}



