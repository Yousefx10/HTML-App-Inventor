//Basic array list for active added elements to the project time_line and project_live
let  active_kit =[];

let project_timeline = document.getElementById('project_timeline');

//[FUNCTIONS] Area
function addKIT(kit_type)
{
    //Main element that will have the content for the new added element.
    let newParagraph = document.createElement('p');
        newParagraph.classList.add('project_timeline_kit');

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




