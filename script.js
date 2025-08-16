document.addEventListener('DOMContentLoaded', function() {
    
    const infoSection = document.querySelector('.info');
    const mainSection = document.querySelector('.main');
    if (infoSection && mainSection) {
        infoSection.addEventListener('wheel', function(e) {
            if (e.deltaY > 0) {
                e.preventDefault();
                mainSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, { passive: false });

        mainSection.addEventListener('wheel', function(e) {
            if (e.deltaY < 0) {
                e.preventDefault();
                infoSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, { passive: false });
    }

    const ayudaBtn = document.getElementById('ayuda-btn');
    const modalAyuda = document.getElementById('modal-ayuda');
    const closeAyuda = document.querySelector('.close-ayuda');
    const iframeAyuda = modalAyuda ? modalAyuda.querySelector('#iframe-ayuda') : null;
    const videoSrcBaseArray = "https://www.youtube.com/embed/ECg_yg9YdnE?si=eWEwxydJexAilPVW";

    if (ayudaBtn && modalAyuda && closeAyuda && iframeAyuda) {
        ayudaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            iframeAyuda.src = videoSrcBaseArray + "?autoplay=1";
            modalAyuda.style.display = 'flex';
        });

        function cerrarModalAyuda() {
            modalAyuda.style.display = 'none';
            iframeAyuda.src = "";
        }

        closeAyuda.addEventListener('click', cerrarModalAyuda);

        window.addEventListener('click', function(e) {
            if (e.target === modalAyuda) {
                cerrarModalAyuda();
            }
        });
    }

    const ayudaArreglos = document.getElementById('icono-ayuda-arreglos');
    const popupArreglos = document.getElementById('pop-up-arreglos');
    const popupArreglosCerrar = document.querySelector('.pop-up-arreglos-cerrar');
    const galeriaArreglos = document.getElementById('galeria-arreglos');
    const imagenGaleria = document.getElementById('imagen-galeria');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    const rutasImagenes = ["Recursos/1.png", "Recursos/2.png", "Recursos/3.png", "Recursos/4.png", "Recursos/5.png", "Recursos/6.png", "Recursos/7.png", "Recursos/8.png", "Recursos/9.png"];
    let imagenActual = 0;

    function mostrarImagen(indice) {
        if (imagenGaleria && rutasImagenes.length > 0) {
            imagenGaleria.src = rutasImagenes[indice];
        }
    }

    if (ayudaArreglos && popupArreglos && popupArreglosCerrar) {
        ayudaArreglos.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarImagen(imagenActual);
            popupArreglos.style.display = 'flex';
        });

        function cerrarPopupArreglos() {
            popupArreglos.style.display = 'none';
        }

        popupArreglosCerrar.addEventListener('click', cerrarPopupArreglos);

        window.addEventListener('click', function(e) {
            if (e.target === popupArreglos) {
                cerrarPopupArreglos();
            }
        });

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                imagenActual = (imagenActual - 1 + rutasImagenes.length) % rutasImagenes.length;
                mostrarImagen(imagenActual);
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                imagenActual = (imagenActual + 1) % rutasImagenes.length;
                mostrarImagen(imagenActual);
            });
        }
    }
});

function ajustarFontSize(elemento) {
    let span = elemento.querySelector('span');
    if (!span) return;

    const contenedorAncho = elemento.offsetWidth;
    const textoAncho = span.scrollWidth;

    if (textoAncho > contenedorAncho) {
        let ratio = contenedorAncho / textoAncho;
        let tamanoFuenteActual = parseFloat(window.getComputedStyle(span).fontSize);
        let nuevoTamano = tamanoFuenteActual * ratio * 0.7;
        span.style.fontSize = `${nuevoTamano}px`;
    } else {
        span.style.fontSize = ''; 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let arreglo = [];

    const contenedor = document.querySelector(".content");
    const inputValor = document.getElementById("valor");
    const inputIndice = document.getElementById("indice");

    const btnAñadir = document.getElementById("añadir");
    const btnAcceder = document.getElementById("acceder");
    const btnActualizar = document.getElementById("actualizar");
    const btnEliminar = document.getElementById("eliminar");

    const modalAcceder = document.getElementById('modal-acceder');
    const closeAcceder = document.querySelector('.close-acceder');
    const modalMensaje = document.getElementById('modal-acceder-mensaje');
    
    inputValor.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnAñadir.click();
        }
    });

    function renderizarArreglo() {
        contenedor.innerHTML = "";
        if (arreglo.length === 0) {
            contenedor.innerHTML = "<p>Arreglo vacio. ¡Añade elementos!</p>";
            return;
        }
        arreglo.forEach((elemento, i) => {
            const div = document.createElement("div");
            div.classList.add("elemento-arreglo");
            div.innerHTML = `<span>${elemento}</span><small>${i}</small>`;
            contenedor.appendChild(div);
            ajustarFontSize(div);
        });
    }

    btnAñadir.addEventListener("click", () => {
        const valor = inputValor.value.trim();
        if (valor) {
            const mensajeVacio = contenedor.querySelector('p');
            if (mensajeVacio) {
                mensajeVacio.remove();
            }

            arreglo.push(valor);
            const div = document.createElement("div");
            div.classList.add("elemento-arreglo");
            div.innerHTML = `<span>${valor}</span><small>${arreglo.length - 1}</small>`;
        
            contenedor.appendChild(div);
            ajustarFontSize(div);
        
            div.classList.add("apareciendo");
            setTimeout(() => {
                div.classList.remove("apareciendo");
            }, 300);
        
            inputValor.value = "";
        }
    });

    btnAcceder.addEventListener("click", () => {
        const i = parseInt(inputIndice.value);
        if (!isNaN(i) && i >= 0 && i < arreglo.length) {
            const elementoDOM = contenedor.querySelectorAll(".elemento-arreglo")[i];
            if (elementoDOM) {
                elementoDOM.classList.add("resaltando");
                setTimeout(() => {
                    elementoDOM.classList.remove("resaltando");
                }, 1000);
            }

            modalMensaje.textContent = `El índice ${i} contiene "${arreglo[i]}" como valor.`;
            modalAcceder.style.display = 'flex';
        } else {
            modalMensaje.textContent = "Debes indicar un índice existente.";
            modalAcceder.style.display = 'flex';
        }
        inputIndice.value = "";
    });

    closeAcceder.addEventListener('click', () => {
        modalAcceder.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalAcceder) {
            modalAcceder.style.display = 'none';
        }
    });

    btnActualizar.addEventListener("click", () => {
        const i = parseInt(inputIndice.value);
        const valor = inputValor.value.trim();
        if (!isNaN(i) && i >= 0 && i < arreglo.length && valor) {
            arreglo[i] = valor;
            const elementoDOM = contenedor.querySelectorAll(".elemento-arreglo")[i];
            if (elementoDOM) {
                elementoDOM.querySelector("span").textContent = valor;
                elementoDOM.classList.add("actualizando");
                setTimeout(() => {
                    elementoDOM.classList.remove("actualizando");
                }, 500);
                ajustarFontSize(elementoDOM);
            }
        } else {
            alert("Debes indicar un índice existente y un nuevo valor.");
        }
        inputIndice.value = "";
        inputValor.value = "";
    });

    btnEliminar.addEventListener("click", () => {
        const i = parseInt(inputIndice.value);
        if (!isNaN(i) && i >= 0 && i < arreglo.length) {
            const elementosDOM = contenedor.querySelectorAll(".elemento-arreglo");
            const elementoAEliminar = elementosDOM[i];
            if (!elementoAEliminar) return;

            elementoAEliminar.classList.add("eliminando");
            setTimeout(() => {
                arreglo.splice(i, 1);
                elementoAEliminar.remove();
                renderizarArreglo();
            }, 300);
        } else {
            alert("Debes indicar un índice existente.");
        }
        inputIndice.value = "";
    });

    renderizarArreglo();
});

window.addEventListener('resize', () => {
    const elementos = document.querySelectorAll(".elemento-arreglo");
    elementos.forEach(ajustarFontSize);
});