document.addEventListener('DOMContentLoaded', function () {
    const rotators = document.querySelectorAll('.rotator');

    rotators.forEach(rotator => {
        const cases = rotator.querySelectorAll('.rotator__case');
        let activeIndex = 0;

        // Находим активный элемент и применяем его настройки
        cases.forEach((item, index) => {
            if (item.classList.contains('rotator__case_active')) {
                activeIndex = index;
                applyCaseSettings(item);
            }
        });

        function applyCaseSettings(caseElement) {
            // Применяем цвет из data-color
            const color = caseElement.dataset.color;
            if (color) {
                caseElement.style.color = color;
            }
        }

        function rotate() {
            // Получаем текущий активный элемент
            const currentCase = cases[activeIndex];

            // Получаем скорость для следующего элемента
            const nextIndex = (activeIndex + 1) % cases.length;
            const nextCase = cases[nextIndex];
            const speed = parseInt(nextCase.dataset.speed) || 1000;

            // Убираем активный класс у текущего элемента
            currentCase.classList.remove('rotator__case_active');

            // Добавляем активный класс следующему элементу
            nextCase.classList.add('rotator__case_active');
            applyCaseSettings(nextCase);

            // Обновляем индекс
            activeIndex = nextIndex;

            // Устанавливаем следующий таймер с новой скоростью
            setTimeout(rotate, speed);
        }

        // Запускаем ротатор со скоростью первого элемента или 1000мс по умолчанию
        const initialSpeed = parseInt(cases[0].dataset.speed) || 1000;
        setTimeout(rotate, initialSpeed);
    });
});