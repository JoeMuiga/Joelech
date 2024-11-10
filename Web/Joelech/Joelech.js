function toggleMarquee() {
    const marquee = document.getElementById('marquee');
    if (marquee.style.display === 'none' || marquee.style.display === '') {
        marquee.style.display = 'block';
        marquee.classList.add('marquee-active'); // Start animation immediately
    } else {
        marquee.style.display = 'none';
        marquee.classList.remove('marquee-active'); // Stop animation when hidden
    }
}
function startAlternatingColorChange() {
    const button = document.getElementById('colorButton');
    let isBlue = false;
    let isColorChangingPhase = true;
    let intervalCounter = 0;

    setInterval(() => {
        if (isColorChangingPhase) {
            // Toggle between blue and black 3 times (within 1 second)
            button.style.backgroundColor = isBlue ? 'black' : 'blue';
            isBlue = !isBlue;
            intervalCounter++;

            // After 3 changes (1 second), enter black-only phase
            if (intervalCounter >= 6) { // 6 toggles = 3 times (blue and back to black)
                isColorChangingPhase = false;
                intervalCounter = 0;
                button.style.backgroundColor = 'black'; // Stay black for 1 second
            }
        } else {
            // Stay black for 1 second (3 intervals of 333ms)
            intervalCounter++;

            if (intervalCounter >= 3) {
                isColorChangingPhase = true;
                intervalCounter = 0;
            }
        }
    }, 167); // 1000ms / 6 = ~167ms per toggle to fit 3 changes in 1 second
}

startAlternatingColorChange(); // Start immediately
document.addEventListener("DOMContentLoaded", function() {
    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");
    const message = document.getElementById("message");
    const savedNamesList = document.getElementById("savedNamesList");

    // Load previously saved names from localStorage
    const savedNames = JSON.parse(localStorage.getItem("names")) || [];
    updateNamesList(savedNames);

    // Handle form submission
    nameForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = nameInput.value.trim();
        
        if (name) {
            savedNames.push(name);
            localStorage.setItem("names", JSON.stringify(savedNames));
            updateNamesList(savedNames);
            nameInput.value = ''; // Clear the input field
            message.textContent = "Name saved!";
        } else {
            message.textContent = "Please enter a valid name.";
        }
    });

    // Function to update the names list in the UI
    function updateNamesList(names) {
        savedNamesList.innerHTML = '';
        names.forEach((name) => {
            const li = document.createElement('li');
            li.textContent = name;
            savedNamesList.appendChild(li);
        });
    }
});
