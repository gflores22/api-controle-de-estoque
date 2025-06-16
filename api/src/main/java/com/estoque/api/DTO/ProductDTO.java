package com.estoque.api.DTO;

import java.math.BigDecimal;

public record ProductDTO(Long id, String name, String description, Integer quantity, BigDecimal price) {
}
