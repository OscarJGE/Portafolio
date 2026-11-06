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
        description: "Compilador educativo desarrollado con JFlex y CUP, con interfaz en JavaFX. Interpreta un lenguaje propio con sintaxis simplificada (estilo Python), diseñado específicamente para introducir a niños de primaria en la lógica de programación. Elimina abstracciones complejas para que el usuario pueda crear animaciones gráficas de forma intuitiva y visual. El proyecto incluye documentación completa, ejemplos y un ejecutable para Linux.",
        videoPath: "videos/ejemplos.webm",
        pdfLink: "manuales/Manual_Tecnico_Compilador.pdf",
        examplesLink: "manuales/Ejemplos_Compilador.pdf",
        downloads: {
            windows: "descargas/compilador-win.exe",
            mac: "descargas/compilador-mac.dmg",
            linux: "descargas/kinderfes_1.0-1_amd64.deb"
        }
    },
    "lockers": {
        title: "Sistema de Seguridad Biométrico (IA, IoT & Ensamblador)",
        description: "Sistema de control de acceso que fusiona procesamiento de alto y bajo nivel en tiempo real. Implementa visión artificial con redes neuronales en Python (OpenCV, MTCNN) para el reconocimiento facial. La interfaz se comunica vía Bluetooth (HC-05) con un microcontrolador PIC16F877A, programado íntegramente en lenguaje Ensamblador (ASM). Este gestiona la interacción física local, controlando una pantalla LCD, teclado matricial 4x4 y periféricos audiovisuales. El proyecto demuestra una sólida integración entre Inteligencia Artificial moderna y electrónica de control a muy bajo nivel.",
        videoPath: "", 
        esquematico: [
            "imagenes/simulacion.jpeg"
        ],
        alambrado: [
            "imagenes/esquematico.jpeg",
        ],
        software: [
            "imagenes/1.jpeg",
            "imagenes/2.jpeg",
            "imagenes/3.jpeg",
            "imagenes/4.jpeg",
            "imagenes/5.jpeg",
        ],
        repoLink: "https://github.com/OscarJGE/PIC-Facial-Locker-Control-.git"
    },
    "guia-estilo": {
        title: "Guia de estilo de procesos almacenados y triggers",
        description: "Este proyecto establece un conjunto integral de normas, convenciones y buenas prácticas para la creación, uso y mantenimiento de procesos almacenados y triggers en bases de datos SQL, garantizando consistencia, eficiencia y seguridad en el desarrollo; e incluye un entorno de base de datos SQL descargable con tablas y esquemas listos para ejecutar los ejemplos de la guía, además de un laboratorio interactivo final diseñado para afianzar los conceptos mediante cuestionarios dinámicos y ejercicios guiados orientados a la estructuración de triggers bajo las mejores prácticas de la industria.",
        images: [
            "imagenes/sql1.png",
            "imagenes/sql2.png",
            "imagenes/sql3.png",
            "imagenes/sql4.png",
            "imagenes/sql_lab.png"
        ],
        sitioWebLink: "https://oscarjimenezg.github.io/GUIA-DE-ESTILO-BD2/"
    },
    "metodos-ordenacion": {
        title: "Métodos de ordenación animados",
        description: "Visualización interactiva de algoritmos de ordenación comunes como Bubble Sort, Quick Sort y Merge Sort, diseñada para facilitar la comprensión de su funcionamiento a través de animaciones claras y educativas.",
        videoPath: "videos/ordenacion.webm",
        repoLink: "#"
    },
    "electronica": {
        title: "Prácticas de electrónica digital",
        description: "Conjunto de prácticas diseñadas para enseñar los fundamentos de la electrónica digital, incluyendo el uso de microcontroladores PIC y diversos periféricos, a través de ejercicios prácticos y proyectos hands-on.",
        repoLink: "#"
    },
    "busqueda-grafo": {
        title: "Algoritmos de búsqueda en un grafo",
        description: "Este proyecto consiste en una herramienta gráfica desarrollada en JavaFX diseñada para el estudio, simulación y comprensión visual de algoritmos clásicos de búsqueda en inteligencia artificial y teoría de grafos, permitiendo simular de forma dinámica estrategias de resolución de problemas como algoritmos no heurísticos (Búsqueda en Anchura [BFS] y Búsqueda en Profundidad [DFS]) y heurísticos (Escalada Simple, Escalada de Máxima Pendiente y Primero-Mejor [Best-First Search]), con una interfaz que facilita la interacción con los nodos y aristas para observar en tiempo real el orden de evaluación, la expansión de estados y la ruta solución seleccionada por cada algoritmo.",
        videoPath: "videos/Busquedas.mp4",
        downloads: {
            linux: "descargas/ia-busquedas_1.0-1_amd64.deb"
        },
        elementos_busqueda: [
            "imagenes/grafo.jpg",  
            "imagenes/grafo_tabla.jpg"
        ]
    },
    "red-neuronal": {
        title: "Red neuronal de 2 perceptrones para clasificar distancias con Arduino",
        images: [
            "imagenes/3cms.webp",
            "imagenes/12cms.webp",
            "imagenes/25cms.webp",
            "imagenes/43cms.webp"
        ],
        description: "Este proyecto implementa una red neuronal de 3 perceptrones entrenada para clasificar distancias detectadas por un sensor ultrasónico. El flujo de trabajo incluye la recolección de datos, el entrenamiento en Python y el despliegue de los pesos ( w ) y sesgos ( b ) en un microcontrolador, demostrando conceptos básicos de aprendizaje automático en hardware embebido.",
        repoLink: "https://github.com/OscarJGE/TinyML-Distance-Classifier.git"
    },
    "Classificador-Transacciones-Ilícitas": {
        title: "Clasificador de Transacciones Ilícitas en Bitcoin",
        description: "Este proyecto consiste en el desarrollo de un modelo de aprendizaje automático supervisado enfocado en la detección de transacciones financieras anómalas e ilícitas utilizando el conjunto de datos Elliptic, aplicando un flujo completo que abarca limpieza de datos, análisis exploratorio y preprocesamiento, para posteriormente implementar, entrenar y optimizar algoritmos de clasificación como K-Vecinos Más Cercanos (KNN) y Árboles de Decisión, evaluando su rendimiento mediante métricas para identificar patrones sospechosos en la red de criptomonedas.",
        validaciones: [
            "imagenes/comparacion_ilicitos.png",
            "imagenes/comparacion_predicciones.png"
        ],
        repoLink: "https://github.com/OscarJGE/Crypto-Transaction-Classifier.git"
    }
};

// 2. ELEMENTOS DEL DOM
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close-btn");

// --- FUNCIÓN AUXILIAR PARA DIBUJAR SECCIONES DE IMÁGENES ---
function crearCarrusel(titulo, arrayImagenes) {
    if (!arrayImagenes || arrayImagenes.length === 0) return ""; 
    
    let html = `<div class="media-title"><h3 style="margin-top: 25px; margin-bottom: 15px;">${titulo}</h3></div>`;
    
    // Contenedor del carrusel
    html += `<div style="display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; scroll-snap-type: x mandatory; width: 100%;">`;
    
    arrayImagenes.forEach(img => {
        // LA MAGIA ESTÁ AQUÍ: 
        // 1. width: 100% -> Obliga a la imagen a ocupar todo el ancho del modal, alineándose con el texto.
        // 2. height: auto -> Deja que la altura se ajuste sola, respetando la foto original (sin deformar y sin recortes).
        // 3. scroll-snap-align: center -> Hace que al deslizar (en la galería de software), la foto se centre magnéticamente.
        html += `<img src="${img}" style="width: 100%; height: auto; flex-shrink: 0; object-fit: contain; border-radius: 8px; scroll-snap-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 1px solid #e0e0e0;" alt="${titulo}">`;
    });
    
    html += `</div>`;
    return html;
}

// 3. RENDERIZAR EL CONTENIDO DEL MODAL
function renderModalContent(data) {
    // TÍTULO
    modalTitle.innerText = data.title;
    
    // PREPARAR BOTONES DE DESCARGA O REPOSITORIO
    let buttonsHTML = ''; 

    if (data.downloads) {
        /*if (data.downloads.windows) {
            buttonsHTML += `<a href="${data.downloads.windows}" class="btn-os btn-win" download>Windows (.exe)</a> `;
        }
        if (data.downloads.mac) {
            buttonsHTML += `<a href="${data.downloads.mac}" class="btn-os btn-mac" download>MacOS (.dmg)</a> `;
        }*/
        if (data.downloads.linux) {
            buttonsHTML += `<a href="${data.downloads.linux}" class="btn-os btn-linux" download>Linux (.deb)</a>`;
        }
    }

    let buttonGITHUB = '';

    if (data.repoLink) {
        buttonGITHUB += `<a href="${data.repoLink}" target="_blank" class="btn-primary">Ver en GitHub</a>`;
    }

    let buttonWEB = '';

    if (data.sitioWebLink) {
            buttonWEB += `<a href="${data.sitioWebLink}" target="_blank" class="btn-primary">Ir al sitio web</a>`;
    }

    // Limpiar contenedor estático
    const downloadContainer = document.getElementById('download-buttons');
    if (downloadContainer) {
        downloadContainer.innerHTML = ''; 
    }

    // LÓGICA DEL PDF Y EJEMPLOS 
    const pdfBtn = document.getElementById('modal-pdf-link');
    if (pdfBtn) {
        if (data.pdfLink) {
            pdfBtn.href = data.pdfLink;
            pdfBtn.style.display = ''; 
        } else {
            pdfBtn.style.display = 'none';
        }
    }

    const examplesBtn = document.getElementById('modal-examples-link');
    if (examplesBtn) {
        if (data.examplesLink) {
            examplesBtn.href = data.examplesLink;
            examplesBtn.style.display = ''; 
        } else {
            examplesBtn.style.display = 'none';
        }
    }
    
    // GENERAR EL CONTENIDO DINÁMICO (modalBody)
    let htmlContent = "";

    // A. VIDEO
    if (data.videoPath) {
        htmlContent += `
            <div class="media-title"></div>
            <div class="video-container" style="margin-bottom: 25px;">
                <video controls width="100%" style="border-radius: 8px;">
                    <source src="${data.videoPath}">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </div>
        `;
    }

    // B. DESCRIPCIÓN 
    htmlContent += `
        <div class="media-title"><h3 style="margin-bottom: 10px;">Descripción</h3></div>
        <p style="margin-bottom: 20px; line-height: 1.6;">${data.description}</p> 
    `;

    // C. GENERACIÓN DE IMÁGENES
    htmlContent += crearCarrusel("Esquemático", data.esquematico);
    htmlContent += crearCarrusel("Alambrado Físico", data.alambrado);
    htmlContent += crearCarrusel("Pruebas de Software", data.software);
    htmlContent += crearCarrusel("Galería", data.images); 
    htmlContent += crearCarrusel("Validaciones de los modelos:", data.validaciones); 
    htmlContent += crearCarrusel("Datos para la Búsqueda", data.elementos_busqueda); 

    // D. BOTONES / DOWNLOAD
    if (buttonsHTML !== '') {
        htmlContent += `
            <h3 style="margin-bottom: 10px; margin-top: 30px;">Instalador:</h3>
            <div style="margin-bottom: 15px;">${buttonsHTML}</div>
        `;
    }

    // E. BOTONES / SITIO WEB
    if (buttonWEB !== '') {
        htmlContent += `
            <h3 style="margin-bottom: 10px; margin-top: 30px;">Sitio Web:</h3>
            <div style="margin-bottom: 15px;">${buttonWEB}</div>
        `;
    }

    // F. BOTONES / GITHUB
    if (buttonGITHUB !== '') {
        htmlContent += `
            <h3 style="margin-bottom: 10px; margin-top: 30px;">Repositorio:</h3>
            <div style="margin-bottom: 15px;">${buttonGITHUB}</div>
        `;
    }   

    // G. MANUALES PDF Y EJEMPLOS

    if (data.pdfLink || data.examplesLink) {
        htmlContent += `
            <h3 style="margin-bottom: 10px; margin-top: 20px;">Manuales:</h3>
        `;
    }

    modalBody.innerHTML = htmlContent;
}

// 4. EVENTOS DE APERTURA DEL MODAL
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-id');
        const data = projectData[projectId]; 

        if (data) {
            renderModalContent(data);
            modal.classList.add('show');
        }
    });
});

// 5. CERRAR MODAL
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modalBody.innerHTML = ""; 
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        modalBody.innerHTML = "";
    }
});