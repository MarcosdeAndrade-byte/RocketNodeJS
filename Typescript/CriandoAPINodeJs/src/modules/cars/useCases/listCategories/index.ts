import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

// categoriesRepository não depende de ninguém
const categoriesRepository = CategoriesRepository.getInstance();

// listCategoriesUseCase depende de categoriesRepository
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

// listCategoriesController depende de listCategoriesUseCase
const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
);

export { listCategoriesController };
