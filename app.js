// 1. ANIMACIÓN DE SCROLL (Aparecer secciones)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => observer.observe(s));

// 2. MENÚ MÓVIL (Hamburguesa)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 3. TEMA OSCURO / CLARO
const themeBtn = document.getElementById('themeToggle');
const html = document.documentElement;

// Revisar si ya hay un tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    themeBtn.innerText = theme === 'light' ? '🌙' : '☀️';
}



// --- LÓGICA DEL MODAL MULTIMEDIA (LOCAL) ---

// 1. BASE DE DATOS DE PROYECTOS
const projectData = {
    "java-fx": {
        title: "Compilador de animaciones en JAVA FX",
        description: "Compilador educativo desarrollado con JFlex y CUP, con interfaz en JavaFX. Interpreta un lenguaje propio con sintaxis simplificada (estilo Python), diseñado específicamente para introducir a niños de primaria en la lógica de programación. Elimina abstracciones complejas para que el usuario pueda crear animaciones gráficas de forma intuitiva y visual. El proyecto incluye documentación completa, ejemplos y ejecutables para Windows, Mac y Linux.",
        videoPath: "videos/ejemplos.webm",
        images: ["img/java1.png", "img/java2.png"],
        pdfLink: "manuales/Manual_Tecnico_Compilador.pdf",
        examplesLink: "manuales/Ejemplos_Compilador.pdf",

        // --- NUEVO: Rutas de descarga por SO ---
        downloads: {
            windows: "descargas/compilador-win.exe",
            mac: "descargas/compilador-mac.dmg",    // .dmg es el estándar en Mac
            linux: "descargas/kinderfes_1.0-1_amd64.deb" // .deb para Debian/Ubuntu/Mint
        },
        
        repoLink: "https://github.com/tu-usuario/repo-java"
    },
    "lockers": {
        title: "Sistema de Lockers",
        description: "Sistema IoT de seguridad con reconocimiento facial.",
        
        // Si no tienes video para este, déjalo vacío o borra la línea
        videoPath: "", 
        
        images: [
            "img/foto_circuito.jpg"
        ],
        repoLink: "#"
    }
};

// 2. ELEMENTOS DEL DOM
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-btn");

function renderModalContent(data) {
    modalTitle.innerText = data.title;
    
    // 1. LÓGICA DE BOTONES DE DESCARGA (Windows, Mac, Linux)
    const downloadContainer = document.getElementById('download-buttons');
    let buttonsHTML = ''; // Aquí acumularemos el código de los botones

    if (data.downloads) {
        // Si hay descarga para Windows
        if (data.downloads.windows) {
            buttonsHTML += `<a href="${data.downloads.windows}" class="btn-os btn-win" download>🪟 Windows (.exe)</a>`;
        }
        // Si hay descarga para Mac
        if (data.downloads.mac) {
            buttonsHTML += `<a href="${data.downloads.mac}" class="btn-os btn-mac" download>🍎 MacOS (.dmg)</a>`;
        }
        // Si hay descarga para Linux
        if (data.downloads.linux) {
            buttonsHTML += `<a href="${data.downloads.linux}" class="btn-os btn-linux" download>🐧 Linux (.deb)</a>`;
        }
    } else if (data.repoLink) {
        // Si NO hay descargas, mostramos el botón de GitHub clásico como respaldo
        buttonsHTML += `<a href="${data.repoLink}" target="_blank" class="btn-primary">Ver en GitHub</a>`;
    }

    // Inyectamos los botones en el HTML
    downloadContainer.innerHTML = buttonsHTML;


    // 2. LÓGICA DEL PDF (Igual que antes)
    const pdfBtn = document.getElementById('modal-pdf-link');
    if (data.pdfLink) {
        pdfBtn.href = data.pdfLink;
        pdfBtn.style.display = 'inline-block';
    } else {
        pdfBtn.style.display = 'none';
    }

    // 2. NUEVO: LÓGICA DE EJEMPLOS
    const examplesBtn = document.getElementById('modal-examples-link');
    if (data.examplesLink) {
        examplesBtn.href = data.examplesLink;
        examplesBtn.style.display = 'inline-block';
    } else {
        examplesBtn.style.display = 'none';
    }
    
    // 3. GENERAR CONTENIDO MULTIMEDIA (Igual que antes)
    let htmlContent = "";

    if (data.videoPath) {
        htmlContent += `
            <div class="media-title"></div>
            <div class="video-container">
                <video controls width="100%" style="border-radius: 8px;">
                    <source src="${data.videoPath}">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </div>
        `;
    }

    htmlContent += `
        <div class="media-title">Descripción</div>
        <p>${data.description}</p>
    `;


    modalBody.innerHTML = htmlContent;
}

// 4. EVENTOS DE APERTURA
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        const data = projectData[projectId]; // Busca en la base de datos

        if (data) {
            renderModalContent(data);
            modal.classList.add('show');
        }
    });
});

// 5. CERRAR MODAL
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modalBody.innerHTML = ""; // Esto detiene el video al cerrar
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modalBody.innerHTML = "";
    }
});



