document.addEventListener('DOMContentLoaded', function() {
    // Находим все контейнеры с вкладками
    const tabsContainers = document.querySelectorAll('.tabs');
    
    tabsContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const contents = container.querySelectorAll('.tab__content');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Убираем активный класс у всех вкладок
                tabs.forEach(t => t.classList.remove('tab_active'));
                
                // Убираем активный класс у всех содержимых
                contents.forEach(c => c.classList.remove('tab__content_active'));
                
                // Добавляем активный класс текущей вкладке
                tab.classList.add('tab_active');
                
                // Добавляем активный класс соответствующему содержимому
                if (contents[index]) {
                    contents[index].classList.add('tab__content_active');
                }
            });
        });
    });
});