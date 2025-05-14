//this variable will decide wither the function is called from the main document or from the iframe
var currentSCOPE=true;



document.addEventListener('keydown', function(event) {
    // Check if the Alt key and the '1' key are pressed
    //use key code instaed of key known name
    if (event.altKey && event.code === 'Digit1') {
        event.preventDefault();  // Prevent default behavior if needed
        if(currentSCOPE) switchScreen();
        else parent.switchScreen();
    }
    if (event.altKey && event.code === 'KeyR') {
        event.preventDefault();  // Prevent default behavior if needed
        if(currentSCOPE) runTHEproject();
        else parent.runTHEproject();
    }
    if (event.altKey && event.code === 'KeyS') {
        event.preventDefault();  // Prevent default behavior if needed
        if(currentSCOPE) ScreenshotNow();
        else parent.ScreenshotNow();
    }
});