import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreatedCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUserCase = new CreateCategoryUseCase(categoriesRepository);

// eslint-disable-next-line prettier/prettier
const createCategoryController = new CreatedCategoryController(createCategoryUserCase);

export { createCategoryController };
