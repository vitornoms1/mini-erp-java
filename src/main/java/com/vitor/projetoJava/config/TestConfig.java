package com.vitor.projetoJava.config;

import com.vitor.projetoJava.models.Category;
import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.repositories.CategoryRepository;
import com.vitor.projetoJava.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;
import java.util.Arrays;

/**
 * Configuration class to seed the database with initial data.
 * This runs automatically when the application starts.
 */
@Configuration
@Profile("test") // This ensures this data only loads in test mode
public class TestConfig implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {

        // 1. Creating categories first
        Category cat1 = new Category();
        cat1.setName("Electronics");

        Category cat2 = new Category();
        cat2.setName("Accessories");

        // Saving categories to the H2 database
        categoryRepository.saveAll(Arrays.asList(cat1, cat2));

        // 2. Creating products and linking them to categories
        Product p1 = new Product();
        p1.setName("Laptop SAP Edition");
        p1.setPrice(new BigDecimal("3500.00"));
        p1.setQuantity(10);
        p1.setCategory(cat1); // Linking to Electronics

        Product p2 = new Product();
        p2.setName("Wireless Mouse");
        p2.setPrice(new BigDecimal("150.00"));
        p2.setQuantity(50);
        p2.setCategory(cat2); // Linking to Accessories

        // Saving products to the H2 database
        productRepository.saveAll(Arrays.asList(p1, p2));

        System.out.println("Database seeded successfully with Categories and Products!");
    }
}