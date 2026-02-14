document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    
    // Управление размером шрифта
    const fontSizeControls = document.querySelector('.book__control_font-size');
    const fontSizeButtons = fontSizeControls.querySelectorAll('.font-size');
    
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            fontSizeButtons.forEach(btn => btn.classList.remove('font-size_active'));
            this.classList.add('font-size_active');
            
            const size = this.dataset.size;
            book.classList.remove('book_fs-small', 'book_fs-big');
            
            if (size === 'small') {
                book.classList.add('book_fs-small');
            } else if (size === 'big') {
                book.classList.add('book_fs-big');
            }
        });
    });
    
    // Управление цветом текста
    const colorControls = document.querySelector('.book__control_color');
    if (colorControls) {
        const colorButtons = colorControls.querySelectorAll('.color');
        
        colorButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                colorButtons.forEach(btn => btn.classList.remove('color_active'));
                this.classList.add('color_active');
                
                const textColor = this.dataset.textColor;
                
                // Убираем все классы цвета текста
                book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
                
                // Добавляем соответствующий класс
                if (textColor) {
                    book.classList.add(`book_color-${textColor}`);
                }
            });
        });
    }
    
    // Управление цветом фона
    const bgControls = document.querySelector('.book__control_background');
    if (bgControls) {
        const bgButtons = bgControls.querySelectorAll('.color');
        
        bgButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                bgButtons.forEach(btn => btn.classList.remove('color_active'));
                this.classList.add('color_active');
                
                const bgColor = this.dataset.bgColor;
                
                // Убираем все классы фона
                book.classList.remove('book_bg-black', 'book_bg-gray', 'book_bg-white');
                
                // Добавляем соответствующий класс
                if (bgColor) {
                    book.classList.add(`book_bg-${bgColor}`);
                }
            });
        });
    }
});