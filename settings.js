// Functionality for the settings page

// Event listener for the Back to Main button
document.getElementById('backToMainButton').onclick = () => {
    // Hide the settings frame
    window.parent.document.getElementById('settingsFrame').style.display = 'none';
    
    // Show the main notes section
    window.parent.showNotesSection();
};

// Add any additional settings functionality here in the future