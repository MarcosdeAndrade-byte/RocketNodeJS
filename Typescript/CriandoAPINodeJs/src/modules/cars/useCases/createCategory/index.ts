import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { CreatedCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoriesRepository = new CategoriesRepository();

const createCategoryUserCase = new CreateCategoryUseCase(categoriesRepository);

// eslint-disable-next-line prettier/prettier
const createCategoryController = new CreatedCategoryController(createCategoryUserCase);

export { createCategoryController };
