package com.vitor.projetoJava.services;

import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for Product operations.
 * Implements full CRUD logic.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(Long id) {
        Optional<Product> obj = repository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    public Product insert(Product obj) {
        return repository.save(obj);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Product not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    public Product update(Long id, Product obj) {
        Product entity = repository.getReferenceById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }

    private void updateData(Product entity, Product obj) {
        entity.setName(obj.getName());
        entity.setPrice(obj.getPrice());
        entity.setQuantity(obj.getQuantity());
    }

    public Product reduceStock(Long id, Integer quantityToReduce) {
        Product product = findById(id);
        if (product.getQuantity() < quantityToReduce) {
            throw new RuntimeException("Not enough stock for product: " + product.getName());
        }
        product.setQuantity(product.getQuantity() - quantityToReduce);
        return repository.save(product);
    }
}