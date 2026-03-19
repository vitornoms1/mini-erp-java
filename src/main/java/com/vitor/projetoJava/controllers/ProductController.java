package com.vitor.projetoJava.controllers;

import com.vitor.projetoJava.models.Product;
import com.vitor.projetoJava.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid; // IMPORTAÇÃO DA VALIDAÇÃO
import java.net.URI;

@RestController
@RequestMapping(value = "/products")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public ResponseEntity<Page<Product>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size
    ) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Product> list = service.findAllPaged(pageRequest);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Product> findById(@PathVariable String id) {
        Product obj = service.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    // ADICIONADO O @Valid AQUI
    @PostMapping
    public ResponseEntity<Product> insert(@Valid @RequestBody Product obj) {
        obj = service.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ADICIONADO O @Valid AQUI
    @PutMapping(value = "/{id}")
    public ResponseEntity<Product> update(@PathVariable String id, @Valid @RequestBody Product obj) {
        obj = service.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping(value = "/{id}/reduce")
    public ResponseEntity<Product> reduceStock(
            @PathVariable String id,
            @RequestParam Integer quantity) {
        Product updatedObj = service.reduceStock(id, quantity);
        return ResponseEntity.ok().body(updatedObj);
    }
}