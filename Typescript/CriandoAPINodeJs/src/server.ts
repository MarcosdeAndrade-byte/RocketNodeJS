import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Dedicamos o arquivo index.ts para armazenar as rotas da nossa aplicação
app.use(router);

app.listen(3333, () => console.log('Servidor rodando na porta 3333'));
