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
    const iframeArreglos = popupArreglos ? popupArreglos.querySelector('#iframe-Arreglos') : null;
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