import express from 'express';

import { router } from './routes';

const app = express();

app.use(express.json());

// Dedicamos o arquivo index.ts para armazenar as rotas da nossa aplicação
app.use(router);

app.listen(3333, () => console.log('Servidor rodando'));
