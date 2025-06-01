package com.estoque.api.controller;

import com.estoque.api.DTO.CustomResponseDTO;
import com.estoque.api.model.Product;
import com.estoque.api.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> showProducts() {
        return ResponseEntity.ok(productService.showProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> showProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> showProductsByQuantityLessThan(@RequestParam int quantity) {
        return ResponseEntity.ok(productService.showProductsByQuantityLessThan(quantity));
    }

    @PostMapping
    public ResponseEntity<CustomResponseDTO> createProduct(@RequestBody @Valid Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CustomResponseDTO("Produto cadastrado com sucesso", savedProduct));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomResponseDTO> updateProduct(@PathVariable Long id, @RequestBody @Valid Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(new CustomResponseDTO("Produto atualizado com sucesso", updatedProduct));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CustomResponseDTO> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
