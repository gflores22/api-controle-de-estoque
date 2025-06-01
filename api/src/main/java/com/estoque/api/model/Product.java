package com.estoque.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Nome")
    @NotBlank(message = "O nome do produto não pode estar vazio")
    @Size(max = 100, message = "O nome do produto deve ter no máximo 100 caracteres")
    private String name;

    @Column(name = "Descricao")
    @Size(max = 500, message = "A descrição do produto deve ter no máximo 500 caracteres")
    private String description;

    @Column(name = "Quantidade")
    @NotNull(message = "A quantidade do produto não pode estar vazia")
    @PositiveOrZero(message = "A quantidade deve ser maior ou igual a zero")
    private Integer quantity;

    @Column(name = "Preco", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "O preço do produto não pode estar vazio")
    @PositiveOrZero(message = "O preço deve ser maior ou igual a zero")
    private BigDecimal price;

}