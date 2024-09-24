// adding specific function only made for kit'setInterval(() => {


//Timer
    let intervalId; // Variable to store the interval ID
    let count = 0; // Count of executions

    // Function to start the interval
    function startInterval() {
        if (!intervalId) { // Only start if not already running
            count = 0; // Reset count
            intervalId = setInterval(() => {
                count++;
                document.getElementById('output').innerText = `Executed ${count} times.`;
            }, 100); // Runs every 100 milliseconds
            console.log("Interval started.");
        }
    }

    // Function to stop the interval
    function stopInterval() {
        if (intervalId) { // Only stop if running
            clearInterval(intervalId);
            console.log(`Stopped the interval after ${count} executions.`);
            intervalId = null; // Reset intervalId to allow restarting
        }
    }