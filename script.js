const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const videoScreen = document.getElementById('videoScreen');
const myVideo = document.getElementById('myVideo');

// Set initial position of No button next to Yes button
window.onload = () => {
    const rect = yesBtn.getBoundingClientRect();
    noBtn.style.left = (rect.right + 20) + "px";
    noBtn.style.top = rect.top + "px";
};

// The "Push" logic
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

    // If mouse is within 100 pixels, move the button away
    if (distance < 100) {
        const angle = Math.atan2(btnCenterY - mouseY, btnCenterX - mouseX);
        
        // Push distance
        let newX = btnRect.left + Math.cos(angle) * 50;
        let newY = btnRect.top + Math.sin(angle) * 50;

        // Boundary Check: Keep inside window
        const padding = 20;
        if (newX < padding) newX = padding;
        if (newY < padding) newY = padding;
        if (newX + btnRect.width > window.innerWidth - padding) {
            newX = window.innerWidth - btnRect.width - padding;
        }
        if (newY + btnRect.height > window.innerHeight - padding) {
            newY = window.innerHeight - btnRect.height - padding;
        }

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    }
});

// Yes button click
yesBtn.addEventListener('click', () => {
    videoScreen.classList.remove('hidden');
    myVideo.play();
});