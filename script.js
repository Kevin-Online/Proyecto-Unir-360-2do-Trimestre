document.addEventListener('DOMContentLoaded', function() {
    // Scroll entre secciones
    const infoSection = document.querySelector('.info');
    const mainSection = document.querySelector('.main');
    if (infoSection && mainSection) {
        // Scroll hacia abajo: de info a main
        infoSection.addEventListener('wheel', function(e) {
            if (e.deltaY > 0) {
                e.preventDefault();
                mainSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, { passive: false });

        // Scroll hacia arriba: de main a info
        mainSection.addEventListener('wheel', function(e) {
            if (e.deltaY < 0) {
                e.preventDefault();
                infoSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, { passive: false });
    }

    // Modal de ayuda con video autoplay
    const ayudaBtn = document.getElementById('ayuda-btn');
    const modalAyuda = document.getElementById('modal-ayuda');
    const closeAyuda = document.querySelector('.close-ayuda');
    const iframe = modalAyuda ? modalAyuda.querySelector('iframe') : null;
    const videoSrcBase = "https://www.youtube.com/embed/8hly31xKli0";

    if (ayudaBtn && modalAyuda && closeAyuda && iframe) {
        ayudaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Agrega autoplay=1 al abrir
            iframe.src = videoSrcBase + "?autoplay=1";
            modalAyuda.style.display = 'flex';
        });

        function cerrarModalAyuda() {
            modalAyuda.style.display = 'none';
            iframe.src = ""; // Detiene el video
        }

        closeAyuda.addEventListener('click', cerrarModalAyuda);

        window.addEventListener('click', function(e) {
            if (e.target === modalAyuda) {
                cerrarModalAyuda();
            }
        });
    }
});