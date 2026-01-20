// Получаем элемент таймера из DOM
const timerElement = document.getElementById('timer');

// Функция для форматирования времени в формат hh:mm:ss
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Добавляем ведущий нуль, если число меньше 10
    const formatNumber = (num) => num.toString().padStart(2, '0');

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(secs)}`;   
}

// Основная функция таймера
function startTimer() {
    // Получаем начальное значение таймера из текста элемента
    let timeLeft = parseInt(timerElement.textContent);

    // Если текст в формате hh:mm:ss, парсим его
    if (timerElement.textContent.includes(':')) {
        const timeParts = timerElement.textContent.split(':');
        timeLeft = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
    }

    // Запускаем таймер
    const timerInterval = setInterval(() => {
        timeLeft--;

        // Обновляем отображение таймера
        timerElement.textContent = formatTime(timeLeft);

        // Проверяем, не закончилось ли время
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "00:00:00";

            // Показываем сообщение о победе
            alert('Вы победили в конкурсе');

            // Бонус: запускаем загрузку файла
            startFileDownloaded();
        }
    }, 1000);
}

// Функция для запуска загрузки файла
function startFileDownloaded() {
    // Создаем невидимую ссылку для загрузки
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';

    // Указываем ссылку на файл для загрузки
    downloadLink.href = "https://example.com/sample-file.txt";
    downloadLink.download = 'winner-file.txt' //Имя файла для сохранения
    downloadLink.target = '_blank' // Для старых браузеров

    // Добавляем ссылку в документ
    document.body.appendChild(downloadLink);

    // Имитируем клик для запуска загрузки
    downloadLink.click();

    // Удаляем ссылку из документа
    document.body.removeChild(downloadLink);

    // Также способ: перенаправление
    window.location.href = 'https://example.com/sample-file.txt';
}

// Запускаем таймер при загрузке страницы
document.addEventListener('DOMContentLoaded', startTimer)