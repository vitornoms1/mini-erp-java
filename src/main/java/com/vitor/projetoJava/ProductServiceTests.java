package com.vitor.projetoJava;

import com.vitor.projetoJava.models.Category;
import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.repositories.CategoryRepository;
import com.vitor.projetoJava.repositories.ProductRepository;
import com.vitor.projetoJava.services.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
public class ProductServiceTests {

    @Autowired
    private ProductService service;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private String validProductId;

    @BeforeEach
    public void setUp() {
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        Category cat = new Category();
        cat.setName("Test Category");
        categoryRepository.save(cat);

        Product p = new Product();
        p.setName("Test Product");

        p.setPrice(100.00);

        p.setQuantity(10);
        p.setCategory(cat);

        p = productRepository.save(p);
        validProductId = p.getId();
    }

    @Test
    public void reduceStockShouldDecreaseQuantityWhenStockIsSufficient() {
        Integer quantityToReduce = 3;

        Product product = service.reduceStock(validProductId, quantityToReduce);

        Assertions.assertEquals(7, product.getQuantity());
    }

    @Test
    public void reduceStockShouldThrowExceptionWhenStockIsInsufficient() {
        Assertions.assertThrows(RuntimeException.class, () -> {
            service.reduceStock(validProductId, 100);
        });
    }
}