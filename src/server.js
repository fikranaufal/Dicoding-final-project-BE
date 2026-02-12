import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const port = 9000;
const host = 'localhost';

app.use(express.json());
app.use('/', routes);

app.use(cors({ 
    origin: '*' 
}));

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`)
})