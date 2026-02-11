# Mini-ERP - Inventory Management System

This is a backend project developed in **Java 25** and **Spring Boot**, focused on enterprise inventory management. It was built as part of my software engineering portfolio, aiming for high scalability and clean architecture standards—skills highly valued by companies like **SAP**.

## 🚀 Technologies
* **Java 25**
* **Spring Boot 3.2.2**
* **Spring Data JPA** (Hibernate)
* **H2 Database** (In-memory)
* **JUnit 5** (Unit Testing)
* **Maven** (Dependency Management)
* **Swagger/OpenAPI** (API Documentation)

## 📋 Features
* **Full CRUD**: Create, Read, Update, and Delete products.
* **Category Relationship**: Products are linked to categories using a @ManyToOne relationship.
* **Audit Fields**: Automatic tracking of `createdAt` and `updatedAt` for every product.
* **Business Logic**: Automatic stock reduction endpoint with validation (cannot reduce below zero).
* **Automated Testing**: Unit tests to ensure business rules are always met.
* **Global Exception Handling**: Standardized error responses for business logic failures.
* **Database Seeding**: Automatic data population on startup for testing.

## 🛠️ How to run the project locally

Follow these steps to get the project up and running on your machine:

### Prerequisites
* **JDK 21 or 25** installed.
* **Git** installed.
* An IDE (IntelliJ IDEA, Eclipse, or VS Code).

### Steps
1. **Clone the repository:**
   git clone https://github.com/vitornoms1/mini-erp-java.git

2. **Navigate to the project folder:**
   cd mini-erp-java

3. **Run the application:**
    - If you are using IntelliJ, just run the ProjetoJavaApplication.java file.
    - Or via terminal using Maven: ./mvnw spring-boot:run

4. **Run Tests:**
    - Execute: ./mvnw test

### 🔗 Testing the API
Once the application starts, you can interact with it using:

* **API Endpoints**: http://localhost:8080/products
* **Interactive Documentation (Swagger)**: http://localhost:8080/swagger-ui/index.html
* **H2 Database Console**: http://localhost:8080/h2-console
    * **JDBC URL**: jdbc:h2:mem:testdb
    * **User**: sa
    * **Password**: (leave blank)

---
Developed by Vitor Noms Kuhn - Software Engineering Student at Unilasalle.