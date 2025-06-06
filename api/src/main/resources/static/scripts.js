document.addEventListener('DOMContentLoaded', () => {
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');
    const productQuantity = document.getElementById('productQuantity');
    const productList = document.getElementById('productList');
    const productForm = document.getElementById('productForm');
    const loadingMessage = document.getElementById('loadingMessage');
    const apiUrl = 'http://localhost:8080/api/products';

    if (!productForm) {
        console.error('Elemento productForm não encontrado no DOM.');
        return;
    }

    productForm.addEventListener('submit' , async (event) => {
        event.preventDefault();

        const name = productName.value.trim();
        const price = parseFloat(productPrice.value);
        const description = productDescription.value.trim();
        const quantity = parseInt(productQuantity.value, 10);

        await addProduct(name, price, description, quantity);

        // Limpa os campos do formulário após adicionar o produto
        productName.value = '';
        productPrice.value = '';
        productDescription.value = '';
        productQuantity.value = '';

        await fetchProducts(); // Recarrega a lista de produtos após adicionar
    });

    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            productList.innerHTML = `<td colspan="5" class="text-center">Erro ao carregar produtos: ${error.message}</td>`;
        } finally {
            if(loadingMessage) loadingMessage.style.display = 'none';
        }
    }

    async function addProduct(name, price, description, quantity) {
        // Validações simples
        if (!name.trim()) {
            alert('O nome do produto é obrigatório.');
            return;
        }
        if (isNaN(price) || price <= 0) {
            alert('O preço do produto deve ser um número positivo.');
            return;
        }
        if (isNaN(quantity) || quantity < 0) {
            alert('A quantidade do produto deve ser um número positivo.');
            return;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim(),
                    price: parseFloat(price),
                    quantity: parseInt(quantity, 10)
                })
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            alert(`Erro ao adicionar produto: ${error.message}`);
        }
    }

    async function updateProduct(productId, newName, newPrice, newDescription, newQuantity) {
        if (!newName.trim()) {
            alert('O nome do produto é obrigatório.');
            return;
        }
        if (isNaN(newPrice) || newPrice <= 0) {
            alert('O preço do produto deve ser um número positivo.');
            return;
        }
        if (isNaN(newQuantity) || newQuantity < 0) {
            alert('A quantidade do produto deve ser um número positivo.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: newName,
                    price: newPrice,
                    description: newDescription,
                    quantity: newQuantity
                })
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            await fetchProducts(); // Recarrega a lista de produtos
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert(`Erro ao atualizar produto: ${error.message}`);
        }
    }

    async function deleteProduct(productId) {
        try {
            const response = await fetch(`${apiUrl}/${productId}`, {
               method: 'DELETE'
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.warn(`Produto com ID ${productId} não encontrado.`);
                } else {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
            }

            const productElement = document.getElementById(`product-${productId}`);

            if (productElement) {
                productElement.remove(); // Remove o elemento do DOM
            } else {
                await fetchProducts(); // Recarrega a lista de produtos
            }

            checkEmptyList();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert(`Erro ao excluir produto: ${error.message}`);
        }
    }

    function createEditableCell(value, field, product) {
        const td = document.createElement('td');
        td.classList.add('editable-cell', `editable-${field}`);
        td.innerHTML = `<span class="cell-value">${field === 'price' ? `R$ ${value.toFixed(2)}` : value || 'Sem descrição'}</span>
            <button class="edit-icon btn btn-link p-0 d-none" title="Editar">
                <i class="bi bi-pencil"></i>
            </button>
        `;

        if(field !== 'id') {
            const editButton = document.createElement('button');
            editButton.className = 'edit-icon btn btn-link p-0 d-none';
            editButton.title = 'Editar';
            editButton.innerHTML = '<i class="bi bi-pencil"></i>';
            td.appendChild(editButton);

            const editIcon = td.querySelector('.edit-icon');
            const cellValue = td.querySelector('.cell-value');

            td.addEventListener('mouseenter', () => {
                editIcon.classList.remove('d-none');
            });
            td.addEventListener('mouseleave', () => {
                editIcon.classList.add('d-none');
            });

            editIcon.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = (field === 'price' || field === 'quantity') ? 'number' : 'text';
                input.className = 'form-control form-control-sm';
                input.value = value;
                if (field === 'price') input.step = '0.01';
                if (field === 'quantity') input.step = '1';

                const saveButton = document.createElement('button');
                saveButton.className = 'btn btn-success btn-sm me-1';
                saveButton.innerHTML = '<i class="bi bi-check"></i>';

                const cancelButton = document.createElement('button');
                cancelButton.className = 'btn btn-secondary btn-sm';
                cancelButton.innerHTML = '<i class="bi bi-x"></i>';

                td.innerHTML = ''; // Limpa o conteúdo da célula
                td.appendChild(input);
                td.appendChild(saveButton);
                td.appendChild(cancelButton);

                saveButton.addEventListener('click', async () => {
                    const newValue = field === 'price' ? parseFloat(input.value) :
                                     field === 'quantity' ? parseInt(input.value, 10) :
                                     input.value.trim();

                    const updatedProduct = { ...product, [field]: newValue };
                    await updateProduct(
                        product.id,
                        updatedProduct.name,
                        updatedProduct.price,
                        updatedProduct.description,
                        updatedProduct.quantity
                    );
                    await fetchProducts(); // Recarrega a lista de produtos
                });

                cancelButton.addEventListener('click', () => {
                    fetchProducts(); // Recarrega a lista de produtos sem salvar alterações
                });
            });
        }
        return td;
    }

    function renderProducts(products) {
        productList.innerHTML = ''; // Limpa a lista antes de renderizar
        if (products.length === 0) {
            checkEmptyList();
            return;
        }
        products.sort((a, b) => a.id - b.id); // Ordena os produtos por ID
        products.forEach(product => {
            const row = document.createElement('tr');
            row.id = `product-${product.id}`;

            row.appendChild(createEditableCell(product.id, 'id', product));
            row.appendChild(createEditableCell(product.name, 'name', product));
            row.appendChild(createEditableCell(product.description, 'description', product));
            row.appendChild(createEditableCell(product.price, 'price', product));
            row.appendChild(createEditableCell(product.quantity, 'quantity', product));

            const actionsTd = document.createElement('td');
            actionsTd.innerHTML = `
                <button class="btn btn-danger btn-sm" title="Excluir produto">
                    <i class="bi bi-trash"></i>
                </button>
            `;

            const deleteButton = actionsTd.querySelector('.btn-danger');
            deleteButton.addEventListener('click', () => {
                if (confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
                    deleteProduct(product.id);
                }
            });

            row.appendChild(actionsTd);
            productList.appendChild(row);
        });
        checkEmptyList();
    }

    function checkEmptyList() {
        const existingEmptyMessage = productList.querySelector('.empty-list-message');
        if (productList.children.length === 0 || (productList.children.length === 1 && productList.children[0] === loadingMessage)) {
            if (!existingEmptyMessage && loadingMessage && loadingMessage.style.display === 'none') {

                const emptyMessage = document.createElement('td');
                const emptyRow = document.createElement('tr');
                emptyMessage.className = 'text-center empty-list-message';
                emptyMessage.colSpan = 6;
                emptyMessage.textContent = 'Nenhum produto encontrado.';
                emptyRow.appendChild(emptyMessage);
                productList.appendChild(emptyRow);
            }
        } else {
            if (existingEmptyMessage) {
                existingEmptyMessage.remove(); // Remove a mensagem de lista vazia se houver produtos
            }
            if (loadingMessage && loadingMessage.parentNode === productList) {
                loadingMessage.remove(); // Remove a mensagem de carregamento se ela ainda estiver na lista
            }
        }
    }

    // #### Inicialização ###
    fetchProducts();
});