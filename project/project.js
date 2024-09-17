


//[FUNCTIONS] Area
function addKIT(kit_type)
{
    //Main element that will have the content for the new added element.
    let newParagraph = document.createElement('p');
        newParagraph.classList.add('project_timeline_kit');
        newParagraph.id='test' + kit_type;

        //newParagraph.onclick = timeline_properties;//option 1 : won't be visible in the dom.
//newParagraph.setAttribute('onclick', 'handleClick()');//option 2: will be visible in the dom.
newParagraph.onclick = () => timeline_properties('param1',newParagraph.innerHTML);
//this i can pass parameters without EXECUTE the function FROM FIRST TIME


    //kit type instructions :
    //1 : label
    //2 : text
    switch(kit_type){
        case 1:
            active_kit.push(1);
            newParagraph.textContent = "You've Added a Label";
            break;

        case 2:
            active_kit.push(2);
            newParagraph.textContent = "You've Added a Text";
            break;
    }
    console.log(active_kit);
    project_timeline.appendChild(newParagraph);

}



function timeline_properties(current_kit,current_details)
{
    properties_value.value =current_details;
    properties_name.innerHTML =current_kit;
}



