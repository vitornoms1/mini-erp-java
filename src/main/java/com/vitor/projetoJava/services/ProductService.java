package com.vitor.projetoJava.services;

import com.vitor.projetoJava.models.Category;
import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.repositories.CategoryRepository;
import com.vitor.projetoJava.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<Product> findAllPaged(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Product findById(String id) {
        Optional<Product> obj = repository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    public Product insert(Product obj) {
        if (obj.getCategory() != null && obj.getCategory().getId() != null) {
            Category categoryCompleta = categoryRepository.findById(obj.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + obj.getCategory().getId()));
            obj.setCategory(categoryCompleta);
        }
        return repository.save(obj);
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Product not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    public Product update(String id, Product obj) {
        Product entity = findById(id);
        updateData(entity, obj);
        return repository.save(entity);
    }

    private void updateData(Product entity, Product obj) {
        entity.setName(obj.getName());
        entity.setPrice(obj.getPrice());
        entity.setQuantity(obj.getQuantity());

        if(obj.getCategory() != null && obj.getCategory().getId() != null) {
            Category categoryCompleta = categoryRepository.findById(obj.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            entity.setCategory(categoryCompleta);
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