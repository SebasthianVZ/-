// --- Elementos HTML ---
const startButton = document.getElementById('startButton');
const romanticContent = document.getElementById('romantic-content');
const loveAudio = document.getElementById('loveAudio');
const heartRainContainer = document.getElementById('heart-rain');
const body = document.body; 
const frases = document.querySelectorAll('.frase'); 

let fraseIndex = 0; // Contador para saber qué frase mostrar

// --- 1. Lógica para Iniciar la Experiencia (con el botón) ---

startButton.addEventListener('click', () => {
    // 1. Oculta el botón
    startButton.style.display = 'none';
    
    // 2. Muestra el contenido
    romanticContent.classList.remove('hidden');
    
    // 3. Reproduce la música 
    loveAudio.play().catch(error => {
        console.error("No se pudo reproducir la música automáticamente:", error);
    });
    
    // 4. Inicia la lluvia de corazones
    startHeartRain();

    // 5. Activamos la función para mostrar frases con CADA CLIC en la pantalla
    body.addEventListener('click', mostrarSiguienteFrase);
    
    // 6. Mostramos la primera frase de inmediato
    setTimeout(mostrarSiguienteFrase, 100); 
});


// --- 2. Lógica para Mostrar Frases con cada Clic ---

function mostrarSiguienteFrase() {
    // Solo si aún quedan frases por mostrar
    if (fraseIndex < frases.length) {
        // Añade la clase 'visible' para activar la animación CSS
        frases[fraseIndex].classList.add('visible');
        
        // Prepara la siguiente frase
        fraseIndex++;

    } else if (fraseIndex === frases.length) {
        // Cuando se han mostrado todas, elimina el oyente de clic
        body.removeEventListener('click', mostrarSiguienteFrase);
    }
}


// --- 3. Lógica para la Lluvia de Corazones ---

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '&#9829;'; 
    
    // Propiedades aleatorias
    const x = Math.random() * 100;
    const size = Math.random() * 20 + 10;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;
    
    heart.style.left = `${x}vw`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `-${delay}s`;
    
    heartRainContainer.appendChild(heart);

    // Limpieza de corazones
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

function startHeartRain() {
    // Crea un nuevo corazón cada 150 milisegundos
    setInterval(createHeart, 150);
}