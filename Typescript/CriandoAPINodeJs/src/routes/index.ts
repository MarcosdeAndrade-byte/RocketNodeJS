import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specification.routes';

const router = Router();

// Rotas da aplicação
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

// Exportar rotas da aplicação para o arquivo principal
export { router };
