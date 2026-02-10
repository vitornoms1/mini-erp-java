package com.vitor.projetoJava.repositories;

import com.vitor.projetoJava.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Spring Data JPA will automatically implement this interface
}