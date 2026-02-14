document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    const cartProducts = document.querySelector('.cart__products');
    const cart = document.querySelector('.cart');
    
    // Управление количеством товаров
    products.forEach(product => {
        const decButton = product.querySelector('.product__quantity-control_dec');
        const incButton = product.querySelector('.product__quantity-control_inc');
        const quantityValue = product.querySelector('.product__quantity-value');
        
        decButton.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            if (value > 1) {
                quantityValue.textContent = value - 1;
            }
        });
        
        incButton.addEventListener('click', () => {
            let value = parseInt(quantityValue.textContent);
            quantityValue.textContent = value + 1;
        });
        
        // Добавление в корзину с анимацией
        const addButton = product.querySelector('.product__add');
        addButton.addEventListener('click', () => {
            const productId = product.dataset.id;
            const productImage = product.querySelector('.product__image');
            const quantity = parseInt(quantityValue.textContent);
            
            // Анимация
            const imageClone = productImage.cloneNode();
            imageClone.style.position = 'absolute';
            imageClone.style.zIndex = '1000';
            imageClone.style.width = '50px';
            imageClone.style.height = '50px';
            
            const startRect = productImage.getBoundingClientRect();
            imageClone.style.left = startRect.left + 'px';
            imageClone.style.top = startRect.top + 'px';
            
            document.body.appendChild(imageClone);
            
            // Проверяем, есть ли уже такой товар в корзине
            const existingCartItem = document.querySelector(`.cart__product[data-id="${productId}"]`);
            
            let endRect;
            if (existingCartItem) {
                const cartImage = existingCartItem.querySelector('.cart__product-image');
                endRect = cartImage.getBoundingClientRect();
            } else {
                // Если товара нет, анимируем к корзине
                endRect = cart.getBoundingClientRect();
            }
            
            // Анимация перемещения
            const startLeft = startRect.left;
            const startTop = startRect.top;
            const endLeft = endRect.left;
            const endTop = endRect.top;
            
            const diffLeft = endLeft - startLeft;
            const diffTop = endTop - startTop;
            
            let step = 0;
            const maxSteps = 30;
            
            const interval = setInterval(() => {
                step++;
                
                const left = startLeft + (diffLeft * step / maxSteps);
                const top = startTop + (diffTop * step / maxSteps);
                
                imageClone.style.left = left + 'px';
                imageClone.style.top = top + 'px';
                
                if (step >= maxSteps) {
                    clearInterval(interval);
                    imageClone.remove();
                    
                    // Добавляем товар в корзину после анимации
                    if (existingCartItem) {
                        const countElement = existingCartItem.querySelector('.cart__product-count');
                        countElement.textContent = parseInt(countElement.textContent) + quantity;
                    } else {
                        const cartItem = document.createElement('div');
                        cartItem.classList.add('cart__product');
                        cartItem.dataset.id = productId;
                        
                        cartItem.innerHTML = `
                            <img class="cart__product-image" src="${productImage.src}">
                            <div class="cart__product-count">${quantity}</div>
                            <button class="cart__product-remove">Удалить</button>
                        `;
                        
                        // Добавляем обработчик удаления
                        cartItem.querySelector('.cart__product-remove').addEventListener('click', function() {
                            cartItem.remove();
                            
                            // Прячем корзину, если она пуста
                            if (cartProducts.children.length === 0) {
                                cart.style.display = 'none';
                            }
                        });
                        
                        cartProducts.appendChild(cartItem);
                    }
                    
                    // Показываем корзину
                    cart.style.display = 'block';
                }
            }, 20);
        });
    });
    
    // Скрываем корзину, если она пуста
    if (cartProducts.children.length === 0) {
        cart.style.display = 'none';
    }
});