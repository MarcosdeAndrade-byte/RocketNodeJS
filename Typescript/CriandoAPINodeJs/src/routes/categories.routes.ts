import { Router } from 'express';

import { Category } from '../model/Category';

const categoriesRoutes = Router();

// a variável categories do tipo category[] recebe um Array
const categories: Category[] = [];

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    // Instanciamos uma variável do tipo Category
    const category = new Category();

    // Uma nova forma de adicionar informação no objeto category(Objeto,O que vai ser adicionado)
    Object.assign(category, {
        name,
        description,
        // id: uuidV4(),<-- Delegamos a responsabilidade de gerar um Id para Classe Category
        created_at: new Date(),
    });

    // Depois podemos utilizar o método push para adicionar o objeto
    categories.push(category);
    return response.status(201).json(category).send();
});

export { categoriesRoutes };
