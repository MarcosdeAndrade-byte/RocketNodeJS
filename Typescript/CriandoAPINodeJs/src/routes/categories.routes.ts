import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
    // Recebemos os dados do Body
    const { name, description } = request.body;

    // Adicionamos na instância do CategoriesRepository
    categoriesRepository.create({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
    return response.json(categoriesRepository.list()).send();
});

export { categoriesRoutes };
