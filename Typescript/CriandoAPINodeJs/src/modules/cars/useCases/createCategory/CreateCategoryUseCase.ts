import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// Para ter acesso aos dados teríamos que instanciar
interface IRequest {
    name: string;
    description: string;
}

// Classe para criar categorias
class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ name, description }: IRequest): void {
        // Verificamos se a categoria não existe através do nome
        // eslint-disable-next-line prettier/prettier
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            // Não utilizamos o response para não ficar dependente do express
            throw new Error('Category Already exists!');
        }

        // Caso não exista,criamos a categoria no repositório
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
