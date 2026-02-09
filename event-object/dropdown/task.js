document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownValue = dropdown.querySelector('.dropdown__value');
        const dropdownList = dropdown.querySelector('.dropdown__list');
        
        // Открытие/закрытие списка при клике на значение
        dropdownValue.addEventListener('click', function() {
            dropdownList.classList.toggle('dropdown__list_active');
        });
        
        // Обработка клика на элементы списка
        dropdownList.addEventListener('click', function(event) {
            event.preventDefault(); // Запрещаем переход по ссылке
            
            // Проверяем, что кликнули именно по ссылке
            const target = event.target;
            if (target.classList.contains('dropdown__link')) {
                // Устанавливаем новое значение
                dropdownValue.textContent = target.textContent.trim();
                // Закрываем список
                dropdownList.classList.remove('dropdown__list_active');
            }
        });
        
        // Закрытие списка при клике вне его области
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                dropdownList.classList.remove('dropdown__list_active');
            }
        });
    });
});