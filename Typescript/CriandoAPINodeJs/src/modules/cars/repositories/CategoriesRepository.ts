import { Category } from '../model/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from './ICategoriesRepository';

// singleton

class CategoriesRepository implements ICategoriesRepository {
    // O atributo categories do tipo Category é privado!
    private categories: Category[];

    // Vamos utilizar o padrão singleton para garantir que nosso repositório seja criado apenas uma vez
    // eslint-disable-next-line no-use-before-define
    private static INSTANCE: CategoriesRepository;

    // O construtor é privado (Para garantir que apenas a instância INSTANCE seja capaz de acessar o repositório)
    private constructor() {
        this.categories = [];
    }

    // Vamos criar um get para acessar o repositório.
    public static getInstance(): CategoriesRepository {
        // Se o repositório não existir criamos um.
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        // Se existir retornamos o mesmo.
        return CategoriesRepository.INSTANCE;
    }

    // Método utilizado para cadastrar a categoria
    create({ description, name }: ICreateCategoryDTO): void {
        const category = new Category();

        // Uma nova forma de adicionar informação no objeto category(Objeto,O que vai ser adicionado)
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        // Depois podemos utilizar o método push para adicionar o objeto
        this.categories.push(category);
    }

    // O método list do tipo Category[] retorna todas as categorias
    list(): Category[] {
        return this.categories;
    }

    // Vamos verificar se existe alguma categoria repetida
    findByName(name: string): Category {
        const category = this.categories.find(i => i.name === name);
        return category;
    }
}

export { CategoriesRepository };
