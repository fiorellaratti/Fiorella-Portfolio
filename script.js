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
    toggleBodyScroll(true);
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.remove("open-popup");
    document.getElementById("blocker").classList.remove("active");
    toggleBodyScroll(false);
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
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        
        // Convert progress to time format (assuming 3:45 total duration)
        const totalSeconds = 225; // 3:45 in seconds
        const currentSeconds = Math.floor((progress / 100) * totalSeconds);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
});

// Spotify popup functions
function openSpotifyPopup() {
    document.getElementById("spotifyPopup").classList.add("open-spotify-popup");
    document.getElementById("blocker").classList.add("active");
    toggleBodyScroll(true);
}

function closeSpotifyPopup() {
    document.getElementById("spotifyPopup").classList.remove("open-spotify-popup");
    document.getElementById("blocker").classList.remove("active");
    toggleBodyScroll(false);
}

// Function to toggle body scroll
function toggleBodyScroll(disable) {
    if (disable) {
        // Store the current scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
        document.body.dataset.scrollPosition = scrollY;
    } else {
        // Restore the scroll position
        const scrollY = document.body.dataset.scrollPosition;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0'));
    }
}

// Update blocker click handler
document.addEventListener('DOMContentLoaded', function() {
    const blocker = document.getElementById('blocker');
    
    blocker.addEventListener('click', function(event) {
        if (event.target === blocker) {
            const projectPopups = document.querySelectorAll('.project-popup');
            projectPopups.forEach(popup => {
                popup.classList.remove('open-popup');
            });
            
            document.getElementById("spotifyPopup").classList.remove("open-spotify-popup");
            blocker.classList.remove("active");
            toggleBodyScroll(false);
        }
    });
});

// Skills data structure
const skillsLibrary = {
    'Programming Languages': ['Java', 'Python', 'C++', 'C', 'SwiftUI', 'R Studio', 'MEL', 'CSS', 'HTML', 'JavaScript/TypeScript'],
    'Tools': ['Kubernetes', 'Docker', 'Torchserve', 'Postgres', 'Nginx', 'llama.cpp', 'AWS', 'Node', 'Django', 'Unix/Linux', 'Firebase'],
    'Libraries': ['NumPy', 'Tensorflow', 'PyTorch', 'Pandas', 'Pygame', 'Matplotlib', 'NLTK', 'sklearn', 'huggingface', 'Transformers']
};

let skillsQueue = [];
let currentSkillIndex = 0;
let isPlaying = false;
let isShuffleOn = false;
let playInterval;

// Initialize queue with all skills
function initializeQueue() {
    skillsQueue = [];
    for (let category in skillsLibrary) {
        skillsLibrary[category].forEach(skill => {
            skillsQueue.push({ skill, category });
        });
    }
}

function shuffleQueue() {
    for (let i = skillsQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [skillsQueue[i], skillsQueue[j]] = [skillsQueue[j], skillsQueue[i]];
    }
}

function updateCurrentSkill() {
    const { skill, category } = skillsQueue[currentSkillIndex];
    document.querySelector('.song-title').textContent = skill;
    document.querySelector('.artist-name').textContent = category;
}

function togglePlay() {
    isPlaying = !isPlaying;
    const playBtn = document.getElementById('play-btn');
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    
    if (isPlaying) {
        playInterval = setInterval(nextSkill, 3000); // Change skill every 3 seconds
    } else {
        clearInterval(playInterval);
    }
}

function nextSkill() {
    currentSkillIndex = (currentSkillIndex + 1) % skillsQueue.length;
    updateCurrentSkill();
}

function previousSkill() {
    currentSkillIndex = (currentSkillIndex - 1 + skillsQueue.length) % skillsQueue.length;
    updateCurrentSkill();
}

function toggleShuffle() {
    isShuffleOn = !isShuffleOn;
    const shuffleBtn = document.getElementById('shuffle-btn');
    shuffleBtn.classList.toggle('active');
    
    if (isShuffleOn) {
        shuffleQueue();
    } else {
        initializeQueue();
    }
    updateCurrentSkill();
}

function toggleQueue() {
    const queuePopup = document.getElementById('queuePopup');
    queuePopup.classList.toggle('show');
    
    // Update queue display with sections
    const queueList = document.querySelector('.queue-list');
    queueList.innerHTML = `
        <div class="queue-header">
            <h3>Queue</h3>
        </div>
        
        <div class="queue-section">
            <div class="queue-section-header">Now Playing</div>
            <div class="queue-item current">
                <span class="queue-title">${skillsQueue[currentSkillIndex].skill}</span>
                <span class="queue-artist">${skillsQueue[currentSkillIndex].category}</span>
            </div>
        </div>
        
        <div class="queue-section">
            <div class="queue-section-header">Next in Queue</div>
            ${skillsQueue.map((item, index) => 
                index > currentSkillIndex ? `
                    <div class="queue-item">
                        <span class="queue-title">${item.skill}</span>
                        <span class="queue-artist">${item.category}</span>
                    </div>
                ` : ''
            ).join('')}
        </div>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeQueue();
    updateCurrentSkill();
});

