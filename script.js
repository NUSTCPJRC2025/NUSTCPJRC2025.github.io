// Countdown Timer for Event
function updateCountdown() {
    const eventDate = new Date('November 17, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            <div class="grid grid-cols-4 gap-2 text-center">
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${days}</div>
                    <div class="text-xs uppercase">Days</div>
                </div>
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${hours}</div>
                    <div class="text-xs uppercase">Hours</div>
                </div>
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${minutes}</div>
                    <div class="text-xs uppercase">Minutes</div>
                </div>
                <div class="bg-white bg-opacity-10 rounded-lg p-2">
                    <div class="text-2xl font-bold">${seconds}</div>
                    <div class="text-xs uppercase">Seconds</div>
                </div>
            </div>
        `;
    } else {
        document.getElementById('countdown').innerHTML = '<div class="text-xl font-bold">Event Started!</div>';
    }
}

setInterval(updateCountdown, 1000);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300';
backToTopBtn.style.display = 'none';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
        setTimeout(() => backToTopBtn.classList.remove('opacity-0'), 10);
    } else {
        backToTopBtn.classList.add('opacity-0');
        setTimeout(() => backToTopBtn.style.display = 'none', 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Lazy Loading for Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));