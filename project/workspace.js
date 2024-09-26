//current variable for this space will be added here
//then will be moved later to "variables.js"

let kit_space = document.getElementById('kit_space_container');

function Func_KIT(kit_name,kitID,KITtype)
{
    const neWelement = document.createElement("p");
    neWelement.id="code" + kitID;
    neWelement.textContent = kit_name;
    kit_space.appendChild(neWelement);
}