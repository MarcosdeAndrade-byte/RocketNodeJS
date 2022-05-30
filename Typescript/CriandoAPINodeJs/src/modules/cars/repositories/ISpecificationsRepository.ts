import { Specification } from '../model/Specification';

// Interface criada para descrever o que as classes derivadas devem implementar
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ description, name }: ICreateSpecificationDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
