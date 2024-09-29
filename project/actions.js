//All Running Actions Will Be Stated Here.
function global_onClick(kitID){

    let dynamicMap = window.parent.dynamicMap;
    let ACTIVEactions = window.parent.ACTIVEactions;
    let prefix = "click", contains = 'code'+kitID+".";

    ACTIVEactions
        .filter(blockID => blockID.startsWith(prefix) && blockID.includes(contains)) // Apply rules
        .forEach(blockID => {



            const words = dynamicMap.get(blockID).split(',');
            console.log(words);

        });


}