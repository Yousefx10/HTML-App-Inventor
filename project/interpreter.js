/*
    THIS FILE CHECKS FOR ERRORS COULD HAPPEN.
    THEN ALERTING THE ERRORS BEFORE STARTING / DEBUGGING THE PROGRAM.

    Version : 0.0;
*/
const Build_Version='24/10/28';//YY/MM/DD.

/*
Big Note:
All Varibles Here Should Stays Here, And Will Not Moves To variable.js Like Other Files.
Duo To Ensure Focus And Task Performance
*/
//Simple Note : i have to move all adding new kit process into kit.js instead of keeping them inside project.js


//POINT TO START :
let Bugs=0; //This Referes To Current Errors, Default as zero.
let ListOfBugs = new Map(); //Contains The List Of Each Bug's And It's Description.


const status_Title       =      document.getElementById("status_Title");
const status_Description =      document.getElementById("status_Description");
const status_Warning     =      document.getElementById("status_Warning");

const BugsContent     =      document.getElementById("BugsContent");

// Create a <table> element and a <tbody> (for rows)
const table = document.createElement("table");
const tableBody = document.createElement("tbody");





//so basically this function will be called if there's an error.
//this function will checks first for errors.
function caseDetectError(kitGotAffected)
{
    //First Step is to check if the deleted kit have affected any action process.
    //First Of First step is to check for [ACTIVEactions array].

    //This Method Works, and it's telling me how count of errors is there.
    let Nowcount = 0;
    
    dynamicMap.forEach((value,key) => {
        let noBugs=false;
        let NowBugs=[];

        if (value.includes('~|'+kitGotAffected+'~|'))
        {
            Nowcount++;
            NowBugs.push("Issue With Missing KIT.");
            noBugs=true;
        }
        if (value.includes('//'+kitGotAffected+'//'))//Reminder : Should improve the //1// soonly and using another indicator.      
        {
            Nowcount++;
            NowBugs.push("Can't Get The Value For Missed KIT.");
            noBugs=true;
        }
        
        console.log(NowBugs);
        if(noBugs)ListOfBugs.set(key, NowBugs);
    });
    
    console.log(`Number of values with ~|x~| [OR] //x//: ${Nowcount}`);
    
  
    
    Bugs+=Nowcount;
    caseShowResult();
}

//So This Function Displays Error Title And Shows The Table
function caseShowResult()
{
    if(Bugs>0)//There's An Errors.
    {
        status_Title.innerText="Errors !!!";
        status_Description.innerText="You Have About: "+Bugs+" Errors !";
        status_Warning.style.display="block";


        // Append the tbody to the table
        table.appendChild(tableBody);
        table.setAttribute("border", "1");
        table.style.width="100%";

        const row = document.createElement("tr");
        const cell = document.createElement("th");
        const cell2 = document.createElement("th");

        cell.textContent = "Description";
        row.appendChild(cell);
        cell2.textContent = "Navigate";
        row.appendChild(cell2);

        tableBody.appendChild(row);



        BugsContent.innerHTML="";//so it will be clear, for next use.

        // Append the table to the target div
        BugsContent.appendChild(table);


        ListOfBugs.forEach((key, value) => {
            if (Array.isArray(value)) {
                value.forEach(item => {
                    //console.log(`${key}: ${item}`);
                    addRowToTable(key,item);
                });
            } else {
                //console.log(`${key}: ${value}`);
                addRowToTable(key,value);
            }


            
        });

        
    }
    else{//Great, No Error Found.
        status_Title.innerText="Perfect";
        status_Description.innerText="Free Of Errors.";
        status_Warning.style.display="none";
    }
}



function NavigateBug(ActionID)
{
    myDialog.close(); // Close the dialog

    // Extract the word before "code"
    let wordBeforeCode = ActionID.split('code')[0];

    // Extract the number before "."
    let numberBeforeDot = ActionID.split('.')[0].replace(/[^0-9]*$/, '').slice(-1);

console.log(ActionID);
console.log(wordBeforeCode);
console.log(numberBeforeDot);
    //STEP ONE : navigate to the main kit and act as i've tried to open it:
    const OpenMe = new Event('click'); // Create a new click event
    document.getElementById('code'+numberBeforeDot).dispatchEvent(OpenMe); // Dispatch the event

    //STEP TWO : Select The desired event :
    document.getElementById('event_'+wordBeforeCode.toUpperCase()).dispatchEvent(OpenMe); // Dispatch the event

    document.getElementById(ActionID).style.background="blue";
}





// Function to add a row to the table with specified cell values
function addRowToTable(key,value) {
    const row = document.createElement("tr");


        const cell = document.createElement("td");
        cell.textContent = key;

        const cell2 = document.createElement("td");
        cell2.textContent = value;
        cell2.classList.add("special_td");


            cell2.addEventListener('click', function() {     
                NavigateBug(value);
               });


        row.appendChild(cell);
        row.appendChild(cell2);



    // Append the row to the table body
    tableBody.appendChild(row);
}






//This Part Of Code is going to be activated soon.
const closeDialogButton = document.getElementById('closeDialog');
const myDialog = document.getElementById('myDialog');

function DisplayDialog()
{
    myDialog.showModal();
}
// Close the dialog when the close button is clicked
closeDialogButton.addEventListener('click', function() {
    myDialog.close(); // Close the dialog
});