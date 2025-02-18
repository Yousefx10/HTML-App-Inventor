# Welcome to notes area
i'll write here all the required notes for this project.


## Ways to call function when creaing new KIT
<details>
  <summary>See Codes</summary>

newParagraph.onclick = timeline_properties;//option 1 : won't be visible in the dom.

newParagraph.setAttribute('onclick', 'handleClick()');//option 2: will be visible in the dom.

</details>

## kit type instructions :
<details>

  <summary>Kit's Names :</summary>

1 : Label

2 : Text

3 : Button

4 : Picture

5 : Timer

</details>





## iframe alternatives
maybe using this code in the future to replace the violation error related to document.write()

    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Hello</title>
        </head>
        <body>World!</body>
    </html>
    `;
    const iframe = document.createElement('iframe');
    iframe.addEventListener('load', () => {
    const docOld = iframe.contentWindow.document;
    const docNew = new DOMParser().parseFromString(html, 'text/html');
    docOld.insertBefore(docNew.doctype, docOld.firstChild);
    docOld.replaceChild(docNew.documentElement, docOld.documentElement);
    });
    document.body.appendChild(iframe);


## for adding it after specific element :

    If want to append it to a specific element within the iframe, use:
    const updateME = iframeDoc.getElementById('updateME');
    updateME.appendChild(newParagraph);


# Instructions For Building The Workspace
<details>

  <summary>See Informations</summary>

## 1. When User Adds A "Functional" Kit.[DONE]

## 2. That Kit Will Be Added into The #kit_space and saved in the memory.[DONE]

## 3. Adds A List Of Known Event's That Suitable For Each Kit.[DONE]

## 4. After Adding The Selected Event, The #actions_space Will Start To Suggest Some Actions.[DONE]

## 5. Adding The Actions Will Be Merged With Events ON THE #PLAYGROUND_SPACE.[DONE]

</details>


## IF YOU ARE READING THIS , THEN CONGRATS, YOU HAVE COMPLETED ALL THE REQUIRED TASKS FOR NOW,
## START TO EXPLORE MORE PROBLEMS TO FIX.



# Instructions For Activating The events and actions

<details>

    <summary>Click To View</summary>

## first and for most include Real Event attribute to the live, for example on click will add onClick event for originall kit.[DONE]

## that onclick will call the global onclick event on actions.js and pass the kitID.[DONE]

</details>

# along side issues :
## when trying to LONG PRESS on button and release the mouse click the mouse click event starts to run "from pc not touch screen".



# [good job]
<details>

    <summary>Tasks To Do</summary>

- you have to store the [custom] value for a custom font size.[DONE]

- you have to complete get / set the TEXT ALIGNMENT.[DONE]

- you have to hide the dialog whenever click on new kit or new event or new action or switch the code workspace.[DONE]
</details>



# [important area]
<details>

<summary>taking the design into new era :</summary>

- add smartphone frame to live iframe.[DONE]

- add RUN button to start or stop the actions like [button click] or [timer trick].[DONE]

- having the ability to naming the kits with a changable names.[DONE]

- adding more screens :

- option to add screen THEN GIVING IT NAME.[DONE]

- option to remove SELECTED SCREEN.[DONE]

- option to SWITCH BETWEEN SCREENS WHILE CODING IN MAIN SCREEN.[DONE]

- option to SWITCH BETWEEN FROM ACTION BLOCK.[DONE]
</details> 



# this code will be used later to fix dialog size when resizing
`window.addEventListener("resize", setDialogPosition);`




# [Next Instructions]

<details>

<summary>Click To View</summary>

- Add Screen Properties To The Timeline.[DONE]

- Allow To Change Screen Properties Like Background Color.[DONE]

- Add text in kit_space to know the selected kit is related to which screen.[DONE]

- also add filter button in kit_space to display the kits that's related to specific screen only.[DONE]
</details>
<details>

<summary>More Tasks</summary>

- [add new action] Changing The Background color via workspace.[DONE]

- Having The Ability To Change kit's order and arranging them. [DONE]

- Adding The Ability To Drag And Drop From Toolkit box into live view box.[DONE]
</details>

<details>

<summary>Next Goals</summary>

- Confirm Alert Before Deleting An Kit.

- Working On Enhancing The Error BAR.[DONE]

- Showing Only The Related Kit's To The Action Arrow.[DONE]

- Adding Special Action For Added Kits like controlling Timer Duration or start it or stop it.


</details>




<details>

<summary>General Notes [not for now]</summary>

- Adding Splash Screen. 

- Adding timer along side with Red Dot.

- Adding special Dialog alert instead of the browser dialog

- Adding Media Asset Manager, so photos or media are included can be ReUsed without reuploading them again.[DONE]

- Writing The Engine That Will Convert The Whole Output into a real final result template that can be used only and directly.

- Temp View via QR code, saves the project into REAL LIVE PREVIEW so i can scan it from my smartphone, after that automatic deletes the file.

</details>



the RUN TIME error still encounter problems,
for example when trying to set the label color as label text "hi" for example, the status bar won't change.

also when the warning box being visible, the mouse still goes hidden.

also try to control the new variable box feature.