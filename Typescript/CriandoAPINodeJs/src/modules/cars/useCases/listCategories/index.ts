import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

// categoriesRepository não depende de ninguém
const categoriesRepository = new CategoriesRepository();

// listCategoriesUseCase depende de categoriesRepository
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

// listCategoriesController depende de listCategoriesUseCase
const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
);

export { listCategoriesController };
