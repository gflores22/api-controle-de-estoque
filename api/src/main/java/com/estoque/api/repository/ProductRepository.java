package com.estoque.api.repository;

import com.estoque.api.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    public List<Product> findByQuantityLessThan(int quantity);
}
