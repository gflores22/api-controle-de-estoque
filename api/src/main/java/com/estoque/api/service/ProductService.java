package com.estoque.api.service;

import com.estoque.api.DTO.ProductDTO;
import com.estoque.api.exception.ProductNotFoundException;
import com.estoque.api.model.Product;
import com.estoque.api.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(@Valid Product product) {
        return productRepository.save(product);
    }

    public List<ProductDTO> showProducts() {
        return productRepository.findAll().stream()
                .map(product -> new ProductDTO(
                        product.getId(),
                        product.getName(),
                        product.getDescription(),
                        product.getQuantity(),
                        product.getPrice()))
                .collect(Collectors.toList());
    }

    public List<ProductDTO> showProductsByQuantityLessThan(int quantity) {
        if(quantity < 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior ou igual a zero");
        }
        List<Product> products = productRepository.findByQuantityLessThan(quantity);
        if(products.isEmpty()) {
            throw new ProductNotFoundException("Nenhum produto encontrado com quantidade menor que " + quantity);
        }
        return products.stream()
                .map(product -> new ProductDTO(
                        product.getId(),
                        product.getName(),
                        product.getDescription(),
                        product.getQuantity(),
                        product.getPrice()))
                .collect(Collectors.toList());
    }

    public ProductDTO findProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Produto com ID " + id + " não encontrado"));
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getQuantity(),
                product.getPrice());
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
