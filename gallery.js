document.addEventListener("DOMContentLoaded", function () {
    const galleryElement = document.getElementById('gallery');
    const images = [
        "imagen1.png",
        "imagen2.png",
        "imagen3.png",
        "imagen4.png",
        "imagen5.png",
        "imagen6.png",
        "imagen7.jpg",
        "imagen8.jpg",
        "imagen9.jpg"
        // Agrega aquí más nombres de archivos si los tienes
    ];
    let currentIndex = 0;

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = `images/${image}`;
        img.alt = `Servicio ${index + 1}`;
        if (index === 0) {
            img.classList.add('active');
        }
        galleryElement.appendChild(img);
    });

    const updateGallery = () => {
        const currentImage = document.querySelector('.gallery img.active');
        currentImage.classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        const nextImage = document.querySelectorAll('.gallery img')[currentIndex];
        nextImage.classList.add('active');
    };

    setInterval(updateGallery, 3000);
});
