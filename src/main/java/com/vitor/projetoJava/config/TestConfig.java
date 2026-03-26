package com.vitor.projetoJava.config;

import com.vitor.projetoJava.models.Category;
import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.repositories.CategoryRepository;
import com.vitor.projetoJava.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

// A importação do BigDecimal foi removida daqui!
import java.util.Arrays;

/**
 * Configuration class to seed the database with initial data.
 * This runs automatically when the application starts.
 */
@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {

        // Limpa o banco MongoDB antes de popular para evitar duplicatas nos testes
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        // 1. Creating categories first
        Category cat1 = new Category();
        cat1.setName("Electronics");

        Category cat2 = new Category();
        cat2.setName("Accessories");

        // Saving categories to MongoDB
        categoryRepository.saveAll(Arrays.asList(cat1, cat2));

        // 2. Creating products and linking them to categories
        Product p1 = new Product();
        p1.setName("Laptop SAP Edition");

        // CORREÇÃO 1: Passando 3500.00 direto como Double
        p1.setPrice(3500.00);

        p1.setQuantity(10);
        p1.setCategory(cat1);

        Product p2 = new Product();
        p2.setName("Wireless Mouse");

        // CORREÇÃO 2: Passando 150.00 direto como Double
        p2.setPrice(150.00);

        p2.setQuantity(50);
        p2.setCategory(cat2);

        // Saving products to MongoDB
        productRepository.saveAll(Arrays.asList(p1, p2));

        System.out.println("Database seeded successfully with Categories and Products in MongoDB!");
    }
}