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

const status_Title       =      document.getElementById("status_Title");
const status_Description =      document.getElementById("status_Description");
const status_Warning     =      document.getElementById("status_Warning");



//so basically this function will be called if there's an error.
//this function will checks first for errors.
function caseDetectError(kitGotAffected)
{
    //First Step is to check if the deleted kit have affected any action process.
    //First Of First step is to check for [ACTIVEactions array].
    console.log('.'+kitGotAffected);
   // const filteredActions = ACTIVEactions.filter(action => action.includes('.'+kitGotAffected));

    //if (filteredActions.length > 0)         console.log(`Number of items with .x: ${filteredActions.length}`);
    //else                                    console.log("No items with .x found in the array.");

    
    //This Method Works, and it's telling me how count of errors is there.
    let Nowcount = 0;
    
    dynamicMap.forEach(value => {
        if (value.includes('~|'+kitGotAffected+'~|')) {
            Nowcount++;
        }
    });
    
    console.log(`Number of values with ~|1~|: ${Nowcount}`);
    
    
    
    
    
    
    
    
    
    Bugs+=Nowcount;

}