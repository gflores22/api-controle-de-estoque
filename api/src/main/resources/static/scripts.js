const apiUrl = 'http://localhost:8080/api/products';

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if(!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const products = await response.json();
        renderProducts(products); // IMPLEMENTAR: função para renderizar os produtos
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}