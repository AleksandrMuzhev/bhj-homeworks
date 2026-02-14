document.addEventListener('DOMContentLoaded', function() {
    const revealBlocks = document.querySelectorAll('.reveal');

    function checkReveal() {
        revealBlocks.forEach(block => {
            const viewportHeight = window.innerHeight;
            const blockRect = block.getBoundingClientRect();

            // Проверяем, виден ли блок в окне браузера
            if (blockRect.top < viewportHeight && blockRect.bottom > 0) {
                block.classList.add('reveal_active');
            } else {
                block.classList.remove('reveal_active');
            }
        });
    }

    // Проверяем при прокрутке
    window.addEventListener('scroll', checkReveal);
    
    // Проверяем сразу после загрузки страницы
    checkReveal();
})