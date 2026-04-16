const canvas = document.getElementById('canvasEstrellas');
const ctx = canvas.getContext('2d');
const btnEntrar = document.getElementById('btn-entrar');
const pantallaLogin = document.getElementById('pantalla-login');
const pantallaPres = document.getElementById('pantalla-presentacion');
const universo = document.getElementById('universo-cinematico');
const naveSpace = document.getElementById('naveSpace');
const musica = document.getElementById('miMusica');

let w, h, estrellas = [];
let navePos = { progreso: 0 };

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- FONDO DE ESTRELLAS (Sutil, no molesta) ---
for (let i = 0; i < 200; i++) {
    estrellas.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2,
        v: Math.random() * 0.2
    });
}

function drawStars() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    estrellas.forEach(e => {
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2); ctx.fill();
        e.y -= e.v; if (e.y < 0) e.y = h;
    });
    requestAnimationFrame(drawStars);
}
drawStars(); // Iniciar fondo estrellado

// --- ANIMACIÓN DE LA NAVE ---
function animarNave() {
    const tierra = { x: -50, y: h - 150 }; // Cerca de la imagen Tierra
    const luna = { x: w - 180, y: 80 }; // Cerca de la imagen Luna

    const curX = tierra.x + (luna.x - tierra.x) * navePos.progreso;
    const curY = tierra.y + (luna.y - tierra.y) * navePos.progreso;

    // Calcular ángulo de rotación
    const angulo = Math.atan2(luna.y - tierra.y, luna.x - tierra.x);

    naveSpace.style.left = `${curX}px`;
    naveSpace.style.top = `${curY}px`;
    naveSpace.style.transform = `rotate(${angulo}rad)`;

    // Avanzar nave
    if (navePos.progreso < 1) {
        navePos.progreso += 0.0003; // Velocidad del viaje
        requestAnimationFrame(animarNave);
    }
}

// --- SECUENCIA DE PALABRAS ---
function mostrarFrase(idFrase, retardo = 450) {
    const frase = document.getElementById(idFrase);
    const palabras = frase.querySelectorAll('span');
    
    frase.classList.remove('oculto'); 
    palabras.forEach((p, i) => {
        setTimeout(() => p.classList.add('palabra-visible'), i * retardo);
    });
}

function ocultarFrase(idFrase) {
    const frase = document.getElementById(idFrase);
    frase.style.transition = 'opacity 1s';
    frase.style.opacity = '0';
    setTimeout(() => frase.classList.add('oculto'), 1000);
}

// --- LOGIN Y ORQUESTACIÓN ---
btnEntrar.addEventListener('click', () => {
    const nombre = document.getElementById('input-nombre').value.trim().toLowerCase();
    const dia = document.getElementById('input-dia').value;
    const mes = document.getElementById('input-mes').value;

    if (nombre === "naho" && dia == "15" && mes == "4") {
        
        pantallaLogin.classList.add('oculto');
        universo.classList.remove('oculto');
        pantallaPres.classList.remove('oculto');
        musica.play(); 
        
        animarNave(); // Iniciar viaje de la nave

        // Secuencia de tiempos
        setTimeout(() => mostrarFrase('msg-1'), 1500);
        setTimeout(() => ocultarFrase('msg-1'), 6500);

        setTimeout(() => mostrarFrase('msg-2'), 8000);
        setTimeout(() => ocultarFrase('msg-2'), 12000);

        // La frase final no se oculta
        setTimeout(() => mostrarFrase('msg-3', 700), 13500);

    } else {
        document.getElementById('mensaje-error').classList.remove('oculto');
        setTimeout(() => document.getElementById('mensaje-error').classList.add('oculto'), 3000);
    }
});