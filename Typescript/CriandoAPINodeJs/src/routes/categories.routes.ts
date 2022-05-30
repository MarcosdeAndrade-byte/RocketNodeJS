import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

// Modificamos nossa rota para atender ao princípio SOLID de responsabilidade única (Nossa rota é responsável apenas por servir os dados)
categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    // Criamos uma nova categoria e passamos o repositório principal
    // eslint-disable-next-line prettier/prettier
    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({ name, description });
    return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
    return response.json(categoriesRepository.list()).send();
});

export { categoriesRoutes };
