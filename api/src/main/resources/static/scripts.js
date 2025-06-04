fetch('http://localhost:8080/api/products')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - $${product.price} - ${product.description}`;
            productList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Erro ao buscar produtos:', error));