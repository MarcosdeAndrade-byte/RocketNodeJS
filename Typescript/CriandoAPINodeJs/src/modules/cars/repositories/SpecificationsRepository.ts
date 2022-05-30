// Classe implementadora da interface ISpecificationsRepository
// eslint-disable-next-line prettier/prettier
import { Specification } from '../model/Specification';
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({ description, name }: ICreateSpecificationDTO): void {
        const specifications = new Specification();

        // Método usado para inserir os dados dentro do objeto specifications
        Object.assign(specifications, {
            name,
            description,
            created_at: new Date(),
        });
        this.specifications.push(specifications);
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(i => i.name === name);
        return specification;
    }
}

export { SpecificationsRepository };
