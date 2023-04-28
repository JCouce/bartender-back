import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';
import cors from 'cors';


const app = express();
const port = 3030;

const corsOptions = {
  origin: '*', // Reemplaza esto con el dominio de tu frontend
  methods: ['GET', 'POST'], // Añade los métodos HTTP permitidos
  allowedHeaders: ['Content-Type'] // Añade los encabezados permitidos
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
