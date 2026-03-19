import axios from 'axios';

const api = axios.create({
  // Deixe exatamente assim, removendo qualquer "/api" que estivesse no final
  baseURL: 'http://localhost:8080', 
});

export default api;