package com.vitor.projetoJava.services;

import com.vitor.projetoJava.models.Category;
import com.vitor.projetoJava.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for Category operations.
 */
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findById(Long id) {
        Optional<Category> obj = repository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }
}