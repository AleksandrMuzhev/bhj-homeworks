document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('.has-tooltip');
    let activeTooltip = null;
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Удаляем предыдущую подсказку
            if (activeTooltip) {
                activeTooltip.remove();
                activeTooltip = null;
                
                // Если кликнули на ту же ссылку, просто закрываем подсказку
                if (this.dataset.active === 'true') {
                    delete this.dataset.active;
                    return;
                }
            }
            
            // Создаем новую подсказку
            const newTooltip = document.createElement('div');
            newTooltip.classList.add('tooltip', 'tooltip_active');
            newTooltip.textContent = this.getAttribute('title');
            
            // Определяем позицию
            const position = this.dataset.position || 'bottom';
            const rect = this.getBoundingClientRect();
            
            switch(position) {
                case 'top':
                    newTooltip.style.left = rect.left + 'px';
                    newTooltip.style.top = (rect.top - newTooltip.offsetHeight) + 'px';
                    break;
                case 'left':
                    newTooltip.style.left = (rect.left - newTooltip.offsetWidth) + 'px';
                    newTooltip.style.top = rect.top + 'px';
                    break;
                case 'right':
                    newTooltip.style.left = rect.right + 'px';
                    newTooltip.style.top = rect.top + 'px';
                    break;
                case 'bottom':
                default:
                    newTooltip.style.left = rect.left + 'px';
                    newTooltip.style.top = rect.bottom + 'px';
            }
            
            // Добавляем подсказку на страницу
            document.body.appendChild(newTooltip);
            activeTooltip = newTooltip;
            
            // Отмечаем текущую ссылку как активную
            this.dataset.active = 'true';
        });
    });
    
    // Закрываем подсказку при клике вне её
    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('has-tooltip') && activeTooltip) {
            activeTooltip.remove();
            activeTooltip = null;
            
            // Убираем активность со всех ссылок
            tooltips.forEach(t => delete t.dataset.active);
        }
    });
});