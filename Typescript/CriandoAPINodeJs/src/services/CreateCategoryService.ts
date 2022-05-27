import { CategoriesRepository } from '../repositories/CategoriesRepository';

// Para ter acesso aos dados teríamos que instanciar
interface IRequest {
    name: string;
    description: string;
}

// Classe para criar categorias
class CreateCategoryService {
    // Atributo do tipo CategoriesRepository (Nosso repositório principal)
    // Estamos fazendo um injeção de dependência, o responsável por chamar o service que tem a obrigação de passar o repositório
    private categoriesRepository: CategoriesRepository;

    constructor(categoriesRepository: CategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    execute({ name, description }: IRequest) {
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

export { CreateCategoryService };
