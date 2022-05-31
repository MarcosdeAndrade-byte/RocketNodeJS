import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

// Modificamos nossa rota para atender ao princípio SOLID de responsabilidade única (Nossa rota é responsável apenas por servir os dados)
categoriesRoutes.post('/', (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
