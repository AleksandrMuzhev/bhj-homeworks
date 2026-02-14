document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    
    // Проверяем, есть ли сохраненные данные в localStorage
    const cachedData = localStorage.getItem('currencyRates');
    const cacheTime = localStorage.getItem('currencyRatesTime');
    const now = new Date().getTime();
    
    // Если есть данные и они не старше 1 часа (3600000 мс), показываем их
    if (cachedData && cacheTime && (now - parseInt(cacheTime) < 3600000)) {
        const valutes = JSON.parse(cachedData);
        renderCurrencies(valutes);
        loader.classList.remove('loader_active');
    } else {
        // Загружаем новые данные
        loadCurrencies();
    }
    
    function loadCurrencies() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
        xhr.send();
        
        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const valutes = response.response.Valute;
                
                // Сохраняем в localStorage
                localStorage.setItem('currencyRates', JSON.stringify(valutes));
                localStorage.setItem('currencyRatesTime', new Date().getTime().toString());
                
                // Отображаем валюты
                renderCurrencies(valutes);
                
                // Скрываем загрузчик
                loader.classList.remove('loader_active');
            }
        });
    }
    
    function renderCurrencies(valutes) {
        itemsContainer.innerHTML = '';
        
        for (let key in valutes) {
            const valute = valutes[key];
            
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            
            itemDiv.innerHTML = `
                <div class="item__code">${valute.CharCode}</div>
                <div class="item__value">${valute.Value}</div>
                <div class="item__currency">руб.</div>
            `;
            
            itemsContainer.appendChild(itemDiv);
        }
    }
});