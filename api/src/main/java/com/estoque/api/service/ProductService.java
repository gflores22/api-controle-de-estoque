package com.estoque.api.service;

import com.estoque.api.exception.ProductNotFoundException;
import com.estoque.api.model.Product;
import com.estoque.api.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(@Valid Product product) {
        return productRepository.save(product);
    }

    public List<Product> showProducts() {
        return productRepository.findAll();
    }

    public List<Product> showProductsByQuantityLessThan(int quantity) {
        if(quantity < 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior ou igual a zero");
        }
        if(productRepository.findByQuantityLessThan(quantity).isEmpty()) {
            throw new ProductNotFoundException("Nenhum produto encontrado com quantidade menor que " + quantity);
        }
        return productRepository.findByQuantityLessThan(quantity);
    }

    public Product findProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Produto com ID " + id + " não encontrado"));
    }

    public Product updateProduct(Long id, @Valid Product updatedProduct) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Produto com ID " + id + " não encontrado"));

        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setQuantity(updatedProduct.getQuantity());
        existingProduct.setPrice(updatedProduct.getPrice());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(Long id) {
        if(!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Produto com ID " + id + " não encontrado");
        }
        productRepository.deleteById(id);
    }
}
