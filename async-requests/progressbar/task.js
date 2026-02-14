document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');
    const fileInput = document.getElementById('file');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Проверяем, выбран ли файл
        if (fileInput.files.length === 0) {
            alert('Пожалуйста, выберите файл');
            return;
        }

        // Создаем FormData и добавляем файл
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        // Создаем XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Открываем POST-запрос
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

        // Отслеживаем прогресс загрузки
        xhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
                // Вычисляем процент загрузки
                const percent = e.loaded / e.total;
                progress.value = percent;
            }
        });

        // Обработчик завершения загрузки
        xhr.addEventListener('load', function () {
            if (xhr.status === 200) {
                alert('Файл успешно загружен!');
                progress.value = 0; // Сбрасываем прогресс
                fileInput.value = ''; // Очищаем поле выбора файла
            } else {
                alert('Ошибка при загрузке файла');
            }
        });

        // Обработчик ошибки
        xhr.addEventListener('error', function () {
            alert('Произошла ошибка при отправке файла');
        });

        // Отправляем данные
        xhr.send(formData);
    });
});