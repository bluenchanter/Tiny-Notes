let notes = JSON.parse(localStorage.getItem('notes')) || [];


function getRandomColor() {
    const colors = ['#f0f0e0', '#e0f0f0', '#f0e0f0', '#f0ffe0', '#e0ffff', '#ffe0f0']; 
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; 

    notes.reverse(); 

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');

        const dateSpan = document.createElement('span');
        dateSpan.textContent = `(Added on: ${note.date})`;
        dateSpan.classList.add('note-date'); 
        noteDiv.textContent = note.text;
        noteDiv.appendChild(dateSpan); 

        noteDiv.className = 'note-item';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
      
            notes.splice(notes.length - 1 - index, 1); 
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();

            const audio = new Audio('delete.mp3'); 
            audio.play();
        };

        const randomColor = getRandomColor();
        noteDiv.style.backgroundColor = randomColor;

        noteDiv.appendChild(deleteButton);
        notesList.appendChild(noteDiv);
    });

    notes.reverse(); 
}

document.getElementById('addNoteButton').onclick = () => {
    const noteInput = document.getElementById('noteInput');
    if (noteInput.value.trim()) {
        notes.push({ text: noteInput.value, date: new Date().toLocaleString() });
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        displayNotes();

        const audio = new Audio('click.mp3'); 
        audio.play();
    }
};

document.getElementById('settingsButton').onclick = () => {
    document.getElementById('notesSection').style.display = 'none';
    document.getElementById('settingsSection').style.display = 'block';
    document.getElementById('popupTitle').textContent = "Settings";

    const audio = new Audio('click.mp3');
    audio.play();
};

document.getElementById('backButton').onclick = () => {
    document.getElementById('settingsSection').style.display = 'none';
    document.getElementById('notesSection').style.display = 'block';
    document.getElementById('popupTitle').textContent = "Notes";

    const audio = new Audio('click.mp3'); 
    audio.play();
};

document.getElementById('exportButton').onclick = () => {
    const blob = new Blob([JSON.stringify(notes)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.json';
    a.click();
    URL.revokeObjectURL(url);

    const audio = new Audio('click.mp3'); 
    audio.play();
};

document.getElementById('importButton').onclick = () => {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const importedNotes = JSON.parse(event.target.result);
            notes = notes.concat(importedNotes);
            localStorage.setItem('notes', JSON.stringify(notes));
            displayNotes();
        };
        reader.readAsText(file);
    }

    const audio = new Audio('click.mp3'); 
    audio.play();
};

displayNotes();