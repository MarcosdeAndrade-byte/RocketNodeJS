import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

// Ao invés de repetir o patch(categories) nos métodos,podemos adicionar ele diretamente no middleware
app.use('/categories', categoriesRoutes);

app.listen(3333, () => console.log('Servidor rodando'));
