import { Category } from '../model/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    // O atributo categories do tipo Category é privado!
    private categories: Category[];

    // Ao invés de inicializar a variável automaticamente,vamos delegar essa função ao construtor!
    constructor() {
        this.categories = [];
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
