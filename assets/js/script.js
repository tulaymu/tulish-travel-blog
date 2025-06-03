// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.slider-image');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Show the first image immediately on load
    if (images.length > 0) {
        images[0].classList.add('active');
    }

    // Change image every 5 seconds (adjust as needed)
    setInterval(showNextImage, 5000);
});