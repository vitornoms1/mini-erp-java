# 📦 Mini-ERP: Full-Stack Inventory Management System

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A full-stack Enterprise Resource Planning (ERP) application developed to manage products, categories, and inventory stock in real-time. Built with a modern architecture separating a React frontend from a robust Spring Boot RESTful API, supported by a MongoDB NoSQL database.

## ✨ Features

* **📊 Interactive Dashboard:** Real-time metrics overview, financial stock value calculation, dynamic charts (Recharts), and low-stock automatic alerts.
* **📦 Product Management:** Complete CRUD operations with server-side pagination, real-time search filtering (by name or category), and a dedicated stock-reduction workflow.
* **🏷️ Category Management:** Manage product categories with intelligent deletion validation (prevents deleting categories that have linked products).
* **🔒 Backend Validation:** Strong data integrity enforcement using Spring Boot Validation (`@NotBlank`, `@Min`, `@NotNull`).
* **📱 Responsive UI:** Mobile-first design using Tailwind CSS, featuring a collapsible sidebar and modern toast notifications.

## 🛠️ Technologies & Tools

**Frontend:**
* React (Vite/CRA)
* Tailwind CSS (Styling & Responsiveness)
* React Router DOM (Global Navigation)
* Recharts (Data Visualization)
* React Hot Toast (Notifications)
* Axios (HTTP Client)

**Backend:**
* Java
* Spring Boot (Web, Data MongoDB, Validation)
* MongoDB (NoSQL Database)
* Maven

## 🚀 How to Run

### Prerequisites
You need to have **Node.js**, **Java (JDK)**, and **MongoDB** installed and running on your machine.

### 1. Running the Backend
1. Open the backend folder in your preferred IDE (e.g., IntelliJ IDEA).
2. The Maven dependencies will download automatically.
3. Ensure your local MongoDB instance is running on the default port (`27017`).
4. Run the Spring Boot application. The API will start on `http://localhost:8080`.

### 2. Running the Frontend
1. Open a terminal and navigate to the frontend folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev 
   ```
4. Access the application in your browser.

---


# 📦 Mini-ERP: Sistema Full-Stack de Gestão de Inventário

Uma aplicação full-stack de Planeamento de Recursos Empresariais (ERP) desenvolvida para gerir produtos, categorias e stock em tempo real. Construída com uma arquitetura moderna que separa o frontend em React de uma API RESTful robusta em Spring Boot, suportada por um banco de dados NoSQL MongoDB.

## ✨ Funcionalidades

* **📊 Dashboard Interativo:** Visão geral de métricas em tempo real, cálculo financeiro do valor em stock, gráficos dinâmicos (Recharts) e alertas automáticos de stock baixo.
* **📦 Gestão de Produtos:** CRUD completo com paginação no lado do servidor, filtros de pesquisa em tempo real (por nome ou categoria) e um fluxo dedicado para baixa de stock.
* **🏷️ Gestão de Categorias:** Controle de categorias com validação inteligente de exclusão (impede a exclusão de categorias que possuem produtos vinculados).
* **🔒 Validação no Backend:** Garantia de integridade dos dados utilizando o Spring Boot Validation (`@NotBlank`, `@Min`, `@NotNull`).
* **📱 Interface Responsiva:** Design *mobile-first* construído com Tailwind CSS, incluindo uma barra lateral retrátil e notificações modernas (toasts).

## 🛠️ Tecnologias e Ferramentas

**Frontend:**
* React (Vite/CRA)
* Tailwind CSS (Estilização e Responsividade)
* React Router DOM (Navegação Global)
* Recharts (Visualização de Dados)
* React Hot Toast (Notificações)
* Axios (Cliente HTTP)

**Backend:**
* Java
* Spring Boot (Web, Data MongoDB, Validation)
* MongoDB (Banco de Dados NoSQL)
* Maven

## 🚀 Como Executar

### Pré-requisitos
É necessário ter o **Node.js**, **Java (JDK)** e o **MongoDB** instalados e a correr na sua máquina.

### 1. Executando o Backend
1. Abra a pasta do backend na sua IDE de preferência (ex: IntelliJ IDEA).
2. As dependências do Maven serão descarregadas automaticamente.
3. Certifique-se de que o seu serviço local do MongoDB está ativo na porta padrão (`27017`).
4. Execute a aplicação Spring Boot. A API ficará disponível em `http://localhost:8080`.

### 2. Executando o Frontend
1. Abra um terminal e navegue até à pasta do frontend.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev 
   ```
4. Acesse à aplicação no seu navegador.

---