document.addEventListener("DOMContentLoaded", function () {
    const noteInput = document.getElementById("note-input");
    const addNoteButton = document.getElementById("add-note");
    const noteList = document.getElementById("note-list");

    // Load notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    // Display saved notes
    savedNotes.forEach(function (note) {
        displayNote(note);
    });

    // Event listener for adding a new note
    addNoteButton.addEventListener("click", function () {
        const noteText = noteInput.value.trim();
        if (noteText !== "") {
            const newNote = {
                text: noteText,
                timestamp: new Date().toISOString(),
            };

            // Add the new note to the list and save to local storage
            savedNotes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(savedNotes));

            displayNote(newNote);

            // Clear the input field
            noteInput.value = "";
        }
    });

    // Function to display a note
    function displayNote(note) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${note.text}</span>
            <button class="delete-button">Delete</button>
        `;

        // Event listener for deleting a note
        li.querySelector(".delete-button").addEventListener("click", function () {
            const noteIndex = savedNotes.findIndex((n) => n.timestamp === note.timestamp);
            if (noteIndex !== -1) {
                savedNotes.splice(noteIndex, 1);
                localStorage.setItem("notes", JSON.stringify(savedNotes));
                li.remove();
            }
        });

        noteList.appendChild(li);
    }
});
