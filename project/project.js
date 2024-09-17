//Basic array list for active added elements to the project time_line and project_live
let  active_kit =[];

let project_timeline = document.getElementById('project_timeline');

//[FUNCTIONS] Area
function addKIT(kit_type)
{
    //kit type instructions :
    //1 : label
    //2 : text
    switch(kit_type){
        case 1:
            active_kit.push(1);
            console.log(active_kit);

            let newParagraph = document.createElement('p');
            newParagraph.textContent = "You've Added a label";
            project_timeline.appendChild(newParagraph);

            break;

        case 2:
            break;
    }

}




