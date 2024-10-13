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

- Add Screen Properties To The Timeline.

- Allow To Change Screen Properties Like Background Color.
</details>
