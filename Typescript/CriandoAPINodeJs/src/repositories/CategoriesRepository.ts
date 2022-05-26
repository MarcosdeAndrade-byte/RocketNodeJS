import { Category } from '../model/Category';

// DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}
class CategoriesRepository {
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
}

export { CategoriesRepository };
