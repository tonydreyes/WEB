
const canvas = document.getElementById('constellation-canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Star {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = Math.random() * 0.6 - 0.3;
        this.dy = Math.random() * 0.6 - 0.3;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'white';
        context.fill();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

const stars = [];
for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 2;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    stars.push(new Star(x, y, radius));
}

function animate() {
    requestAnimationFrame(animate);

    // Crear el degradado
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#2A52BE');
    gradient.addColorStop(1, '#4169E1');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => star.update());

    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                context.beginPath();
                context.moveTo(stars[i].x, stars[i].y);
                context.lineTo(stars[j].x, stars[j].y);
                context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                context.lineWidth = 0.5;
                context.stroke();
            }
        }
    }
}

animate();
