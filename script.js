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
    const iframe = modalAyuda ? modalAyuda.querySelector('iframe') : null;
    const videoSrcBase = "https://www.youtube.com/embed/8hly31xKli0";

    if (ayudaBtn && modalAyuda && closeAyuda && iframe) {
        ayudaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            iframe.src = videoSrcBase + "?autoplay=1";
            modalAyuda.style.display = 'flex';
        });

        function cerrarModalAyuda() {
            modalAyuda.style.display = 'none';
            iframe.src = "";
        }

        closeAyuda.addEventListener('click', cerrarModalAyuda);

        window.addEventListener('click', function(e) {
            if (e.target === modalAyuda) {
                cerrarModalAyuda();
            }
        });
    }
});