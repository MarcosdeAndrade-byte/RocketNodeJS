import { Router } from 'express';
import { v4 as uuidV4 } from 'uuid';
const categoriesRoutes = Router();


const categories = [];

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    //Podemos criar uma variável que recebe apenas o objeto
    const categorie = {
        name,
        description,
        id: uuidV4(),
    };

    //Depois podemos utilizar o método push para adicionar o objeto
    categories.push(categorie);
    return response.status(201).json(categories).send();
});

export { categoriesRoutes };
