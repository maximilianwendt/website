document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-inner" role="dialog" aria-modal="true" aria-hidden="true">
            <button class="lightbox-close" aria-label="Schließen">&times;</button>
            <button class="lightbox-nav-btn lightbox-prev" aria-label="Vorheriges Bild">❮</button>
            <img class="lightbox-image" alt="">
            <button class="lightbox-nav-btn lightbox-next" aria-label="Nächstes Bild">❯</button>
            <div class="lightbox-text"><div class="lightbox-caption"></div></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const imgEl = lightbox.querySelector('.lightbox-image');
    const capEl = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let allImages = [];
    let currentImageIndex = 0;

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
    };

    const updateLightboxImage = (index) => {
        if (index >= 0 && index < allImages.length) {
            currentImageIndex = index;
            const image = allImages[index];
            imgEl.src = image.src;
            imgEl.alt = image.alt;
            const heroSection = image.closest('.page-hero');
            if (heroSection) {
                const title = heroSection.querySelector('h1')?.innerText || '';
                const place = heroSection.querySelector('.eyebrow')?.innerText || '';
                capEl.innerHTML = (title ? `<p>${title}</p>` : '') + (place ? `<p style="margin-top:12px;font-weight:600;">${place}</p>` : '');
            } else {
                const captionText = image.closest('.image-card')?.querySelector('.image-caption')?.innerText || '';
                capEl.textContent = captionText;
            }
        }
    };

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => {
        updateLightboxImage((currentImageIndex - 1 + allImages.length) % allImages.length);
    });
    nextBtn.addEventListener('click', () => {
        updateLightboxImage((currentImageIndex + 1) % allImages.length);
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    const pageHeroImages = document.querySelectorAll('.page-hero img');
    pageHeroImages.forEach((image) => {
        allImages.push(image);
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', () => {
            updateLightboxImage(allImages.indexOf(image));
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    document.querySelectorAll('.image-card img').forEach((image) => {
        allImages.push(image);
        image.style.cursor = 'zoom-in';
        image.addEventListener('click', () => {
            updateLightboxImage(allImages.indexOf(image));
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    document.addEventListener('keydown', (event) => {
        if (lightbox.classList.contains('open')) {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                updateLightboxImage((currentImageIndex - 1 + allImages.length) % allImages.length);
            } else if (event.key === 'ArrowRight') {
                updateLightboxImage((currentImageIndex + 1) % allImages.length);
            }
        }
    });
});
