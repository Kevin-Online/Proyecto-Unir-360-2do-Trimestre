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
    const videoSrcBaseArray = "https://www.youtube.com/embed/8hly31xKli0";

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
    const iframeArreglos = popupArreglos ? popupArreglos.querySelector('#iframe-arreglos') : null;
    const videoSrcBase = "https://www.youtube.com/embed/8hly31xKli0";

    if (ayudaArreglos && popupArreglos && popupArreglosCerrar && iframeArreglos) {
        ayudaArreglos.addEventListener('click', function(e) {
            e.preventDefault();
            iframeArreglos.src = videoSrcBase + "?autoplay=1";
            popupArreglos.style.display = 'flex';
        });

        function cerrarPopupArreglos() {
            popupArreglos.style.display = 'none';
            iframeArreglos.src = "";
        }

        popupArreglosCerrar.addEventListener('click', cerrarPopupArreglos);

        window.addEventListener('click', function(e) {
            if (e.target === popupArreglos) {
                cerrarPopupArreglos();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let arreglo = [];

    const contenedor = document.querySelector(".content");
    const inputValor = document.getElementById("valor");
    const inputIndice = document.getElementById("indice");

    const btnAñadir = document.getElementById("añadir");
    const btnAcceder = document.getElementById("acceder");
    const btnActualizar = document.getElementById("actualizar");
    const btnEliminar = document.getElementById("eliminar");

    function renderizarArreglo() {
        contenedor.innerHTML = "";
        arreglo.forEach((elemento, i) => {
            const div = document.createElement("div");
            div.classList.add("elemento-arreglo");
            div.textContent = arreglo[i];
            div.className = "elemento-arreglo";
            div.innerHTML = `<span>${elemento}</span><small>${i}</small>`;
            contenedor.appendChild(div);
        });
    }

    btnAñadir.addEventListener("click", () => {
        const valor = inputValor.value.trim();
        if (valor) {
            arreglo.push(valor);
            renderizarArreglo();
            inputValor.value = "";
        }
    });

    btnAcceder.addEventListener("click", () => {
        const i = parseInt(inputIndice.value);
        if (!isNaN(i) && i >= 0 && i < arreglo.length) {
            alert(`El índice ${i} contiene ${arreglo[i]} como valor`);
        } else {
            alert("índice inexistente");
        }
    });

    btnActualizar.addEventListener("click", () => {
        const i = parseInt(inputIndice.value);
        const valor = inputValor.value.trim();
        if (!isNaN(i) && i >= 0 && i < arreglo.length && valor) {
            arreglo[i] = valor;
            renderizarArreglo();
        } else {
            alert("Índice inexistente o valor vacío");
        }
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
                renderizarArreglo();
            }, 300);
        } else {
            alert("Índice inexistente");
        }
    });
});