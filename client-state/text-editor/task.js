const editor = document.getElementById('editor');
const clearButton = document.getElementById('clear-button');
const storageKey = 'text_editor_content';

// Восстанавливаем текст при загрузке
editor.value = localStorage.getItem(storageKey) || '';

// Сохраняем при изменениях
editor.addEventListener('input', () => {
    localStorage.setItem(storageKey, editor.value);
});

// Очистка содержимого
if (clearButton) {
    clearButton.addEventListener('click', () => {
        editor.value = '';
        localStorage.removeItem(storageKey);
    });
}