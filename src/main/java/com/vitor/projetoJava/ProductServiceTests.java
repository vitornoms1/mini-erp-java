package com.vitor.projetoJava;

import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.services.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

/**
 * Unit tests for ProductService business logic.
 */
@SpringBootTest
@Transactional
public class ProductServiceTests {
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private ProductService service;

    @Test
    public void reduceStockShouldDecreaseQuantityWhenStockIsSufficient() {
        // Testing if stock reduces correctly
        Integer initialStock = 10;
        Integer quantityToReduce = 3;

        Product product = service.reduceStock(1L, quantityToReduce);

        Assertions.assertEquals(7, product.getQuantity());
    }

    @Test
    public void reduceStockShouldThrowExceptionWhenStockIsInsufficient() {
        // Testing if system prevents negative stock
        Assertions.assertThrows(RuntimeException.class, () -> {
            service.reduceStock(1L, 100);
        });
    }
}