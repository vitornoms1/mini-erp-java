package com.vitor.projetoJava.services;

import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for Product operations.
 * Implements full CRUD logic with MongoDB.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(String id) {
        Optional<Product> obj = repository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    public Product insert(Product obj) {
        return repository.save(obj);
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Product not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    public Product update(String id, Product obj) {
        Product entity = findById(id); // Substituindo o antigo getReferenceById
        updateData(entity, obj);
        return repository.save(entity);
    }

    private void updateData(Product entity, Product obj) {
        entity.setName(obj.getName());
        entity.setPrice(obj.getPrice());
        entity.setQuantity(obj.getQuantity());
        // Se a categoria vier no objeto de atualização, você pode atualizar também:
        if(obj.getCategory() != null) {
            entity.setCategory(obj.getCategory());
        }
    }

    public Product reduceStock(String id, Integer quantityToReduce) {
        Product product = findById(id);
        if (product.getQuantity() < quantityToReduce) {
            throw new RuntimeException("Not enough stock for product: " + product.getName());
        }
        product.setQuantity(product.getQuantity() - quantityToReduce);
        return repository.save(product);
    }
}