package com.vitor.projetoJava.services;

import com.vitor.projetoJava.models.Category;
import com.vitor.projetoJava.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findById(String id) {
        Optional<Category> obj = repository.findById(id);
        return obj.orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }

    public Category insert(Category obj) {
        return repository.save(obj);
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Cannot delete. Category not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    public Category update(String id, Category obj) {
        Category entity = findById(id);
        entity.setName(obj.getName());

        entity.setDescription(obj.getDescription());

        return repository.save(entity);
    }
}