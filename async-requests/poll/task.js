document.addEventListener('DOMContentLoaded', function() {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');
    let pollId = null;
    
    // Загружаем опрос
    const xhrGet = new XMLHttpRequest();
    xhrGet.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
    xhrGet.send();
    
    xhrGet.onload = function() {
        if (xhrGet.status === 200) {
            const response = JSON.parse(xhrGet.responseText);
            pollId = response.id;
            
            // Отображаем заголовок
            pollTitle.textContent = response.data.title;
            
            // Отображаем кнопки с ответами
            response.data.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.classList.add('poll__answer');
                button.textContent = answer;
                button.dataset.index = index;
                
                button.addEventListener('click', function() {
                    // Показываем alert
                    alert('Спасибо, ваш голос засчитан!');
                    
                    // Отправляем голос на сервер
                    const xhrPost = new XMLHttpRequest();
                    xhrPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
                    xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhrPost.send(`vote=${pollId}&answer=${this.dataset.index}`);
                    
                    xhrPost.onload = function() {
                        // Проверяем и статус 200, и статус 201
                        if (xhrPost.status === 200 || xhrPost.status === 201) {
                            const result = JSON.parse(xhrPost.responseText);
                            
                            // Очищаем контейнер
                            pollAnswers.innerHTML = '';
                            
                            // Вычисляем общее количество голосов
                            let totalVotes = 0;
                            for (let i = 0; i < result.stat.length; i++) {
                                totalVotes += result.stat[i].votes;
                            }
                            
                            // Создаем элементы для статистики
                            for (let i = 0; i < result.stat.length; i++) {
                                const item = result.stat[i];
                                const percentage = ((item.votes / totalVotes) * 100).toFixed(2);
                                
                                // Создаем div для результата
                                const resultDiv = document.createElement('div');
                                resultDiv.classList.add('poll__result');
                                resultDiv.style.margin = '10px 0';
                                resultDiv.style.padding = '8px';
                                resultDiv.style.backgroundColor = '#f0f0f0';
                                resultDiv.style.borderRadius = '4px';
                                resultDiv.textContent = `${item.answer}: ${item.votes} голосов (${percentage}%)`;
                                
                                pollAnswers.appendChild(resultDiv);
                            }
                        }
                    };
                });
                
                pollAnswers.appendChild(button);
            });
        }
    };
});