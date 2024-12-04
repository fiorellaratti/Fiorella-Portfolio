// Text scroll effect
let text = document.getElementById('text');
window.addEventListener('scroll', function(){
    let value = window.scrollY;
    text.style.marginRight = value * 4 + 'px';
});

// Project popup functions
function openPopup(popupId) {
    document.getElementById(popupId).classList.add("open-popup");
    document.getElementById("blocker").classList.add("active");
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.remove("open-popup");
    document.getElementById("blocker").classList.remove("active");
}

function openPopupa(){
    document.getElementById("popupa").classList.add("open-popupa");
}

function closePopupa(){
    document.getElementById("popupa").classList.remove("open-popupa");
}

function openPopupb(){
    document.getElementById("popupb").classList.add("open-popupb");
}

function closePopupb(){
    document.getElementById("popupb").classList.remove("open-popupb");
}

function openPopupc(){
    document.getElementById("popupc").classList.add("open-popupc");
}

function closePopupc(){
    document.getElementById("popupc").classList.remove("open-popupc");
}

// Progress bar scroll control
window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / windowHeight) * 100;
    
    const progressBar = document.querySelector('.progress-bar');
    const currentTime = document.querySelector('.current-time');
    
    progressBar.style.width = `${progress}%`;
    
    // Convert progress to time format (assuming 3:45 total duration)
    const totalSeconds = 225; // 3:45 in seconds
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Spotify popup functions
function openSpotifyPopup() {
    document.getElementById("spotifyPopup").classList.add("open-spotify-popup");
    document.getElementById("blocker").classList.add("active");
}

function closeSpotifyPopup() {
    document.getElementById("spotifyPopup").classList.remove("open-spotify-popup");
    document.getElementById("blocker").classList.remove("active");
}

// Update the blocker to handle all popups
document.addEventListener('DOMContentLoaded', function() {
    const blocker = document.getElementById('blocker');
    const spotifyPopup = document.getElementById('spotifyPopup');
    
    // Close any open popup when clicking the blocker
    blocker.addEventListener('click', function(event) {
        // Check if the click was directly on the blocker (not its children)
        if (event.target === blocker) {
            // Close project popups
            const projectPopups = document.querySelectorAll('.project-popup');
            projectPopups.forEach(popup => {
                popup.classList.remove('open-popup');
            });
            
            // Close Spotify popup
            spotifyPopup.classList.remove('open-spotify-popup');
            
            // Hide the blocker itself
            blocker.classList.remove('active');
        }
    });

    // Prevent popup from closing when clicking inside it
    spotifyPopup.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
