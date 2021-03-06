import express from 'express';
import cors from 'cors';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';

import { routes } from './routes';

const app = express();
const API_PORT = process.env.PORT || 3333;

app.use(cors());

app.use(express.json()); 

app.use(routes);

app.use(errorHandlerMiddleware);

app.listen(API_PORT, () => { 
    console.log(`HTTP server is running on port ${API_PORT}`);
});
