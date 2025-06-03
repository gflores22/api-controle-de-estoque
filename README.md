# API de Controle de Estoque

![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white) 
![H2](https://img.shields.io/badge/H2_Database-InMemory-red?style=for-the-badge)

Este é um projeto de uma API REST para gerenciamento de produtos em estoque, desenvolvido com **Java** e **Spring Boot**.

## ✨ Funcionalidades

- **CRUD de Produtos**:
    - Criar, listar, buscar, atualizar e excluir produtos.
- **Mensagens Personalizadas**:
    - Mensagens claras para operações bem-sucedidas e erros.
- **Validações**:
    - Validação de campos obrigatórios e limites de tamanho.
- **Consulta Personalizada**:
    - Buscar produtos com quantidade menor que um valor especificado.
- **Tratamento Global de Exceções**:
    - Respostas personalizadas para erros, como recurso não encontrado.

## 🛠️ Tecnologias Utilizadas

- **Java 17**
- **Spring Boot 3**
- **Maven**
- **Jakarta Persistence API (JPA)**
- **H2 Database** (banco de dados em memória para testes)
- **Lombok** (para reduzir boilerplate de código)

## 📂 Estrutura do Projeto

```plaintext
src/main/java/com/estoque/api
├── controller       # Controladores REST
├── service          # Regras de negócio
├── repository       # Acesso ao banco de dados
├── model            # Entidades JPA
├── exception        # Tratamento de exceções
└── DTO              # Objetos de transferência de dados
```

## 📝 Endpoints Disponíveis

**Criar Produto**

* `POST /products`
    * *Corpo da requisição:*
```json
{
  "name": "Produto A",
  "description": "Descrição do produto A",
  "quantity": 10,
  "price": 99.99
}
```

**Listar Todos os Produtos**

* `GET /products`

**Buscar Produto por ID**

* `GET /products/{id}`

**Atualizar Produto**

* `PUT /products/{id}`
  * *Corpo da requisição:*
```json
{
  "name": "Produto Atualizado",
  "description": "Descrição atualizada",
  "quantity": 5,
  "price": 49.99
}
```

**Excluir Produto**

* `DELETE /products/{id}`
  * *Resposta:*
```json
{
  "message": "Produto excluído com sucesso",
  "data": null
}
```

**Buscar Produtos com Quantidade Menor que um Valor Específico**

* `GET /products/quantity-less-than/{quantity}`
  * *Exemplo de resposta:*
```json
{
  "data": [
    {
      "id": 1,
      "name": "Produto A",
      "description": "Descrição do produto A",
      "quantity": 5,
      "price": 99.99
    }
  ]
}
```

## ✅ Validações
- **Nome**: Não pode estar vazio e deve ter no máximo 100 caracteres.
- **Descrição (opcional)**: Máximo de 500 caracteres.
- **Quantidade**: Deve ser maior ou igual a zero.
- **Preço**: Deve ser maior ou igual a zero.

## 🚀 Como Executar o Projeto

### Pré-requisitos

* **JDK 17 ou superior:** [OpenJDK](https://jdk.java.net/) / [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
* **Maven 3.6+**: [Maven](https://maven.apache.org/download.cgi)
* **IDE Java (Recomendado):** [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) ou [Eclipse](https://www.eclipse.org/downloads/)

**1. Clone o repositório:**

```bash
    git clone https://github.com/seu-usuario/estoque-api.git
    cd estoque-api
```

**2. Execute o projeto:**
```bash
    mvn spring-boot:run
```

**3. Acesse a API:**
Abra seu navegador ou ferramenta de API (como Postman) e acesse `http://localhost:8080/products`.

## 📦 Estrutura das Classes

**Product**

Representa um produto no estoque com os seguintes atributos:
- `id`: Identificador único do produto.
- `name`: Nome do produto.
- `description`: Descrição do produto.
- `quantity`: Quantidade disponível em estoque.
- `price`: Preço do produto.

**ProductRepository**

Interface que estende JpaRepository para acesso ao banco de dados. Inclui um método customizado:
- `findByQuantityLessThan(int quantity)`: Busca produtos com quantidade menor que o valor especificado.

**ProductService**

Contém a lógica de negócio para:
- Criar, listar, buscar, atualizar e excluir produtos.
- Validar e lançar exceções apropriadas.

**ProductController**

Controlador REST responsável por expor os endpoints da API. Ele:
- Recebe as requisições HTTP.
- Chama os métodos do `ProductService`.
- Retorna as respostas apropriadas (dados ou mensagens).

**CustomResponseDTO**

Um objeto de transferência de dados utilizado para padronizar as respostas da API. Contém os seguintes campos:
- `message`: Mensagem descritiva sobre o resultado da operação.
- `data`: Dados retornados pela operação (pode ser nulo em caso de erro ou operações sem retorno).

**Exception Handling**

Contém classes para tratamento de exceções personalizadas, como:
- `ResourceNotFoundException`: Lançada quando um recurso não é encontrado.
- `GlobalExceptionHandler`: Captura exceções e retorna respostas padronizadas para erros.

**ApiApplication**

Classe principal que inicia a aplicação Spring Boot.

## 🔮 Melhorias Futuras (TODO)

* [ ] Implementar testes unitários e de integração para o backend.
* [ ] Persistir dados em um banco relacional (PostgreSQL, MySQL) em vez de H2 em memória.
* [ ] Adicionar suporte a documentação da API com Swagger.
* [ ] Implementar front-end para interação com a API.
* [ ] Adicionar autenticação e autorização (JWT).

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

* **[Gabriel Flores Chinelli / gflores22]** - [Perfil GitHub](https://github.com/gflores22)

---

Sinta-se à vontade para contribuir, reportar issues ou sugerir melhorias!