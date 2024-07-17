import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes';
import cors from 'cors';
import IndexRoutes from './routes/IndexRoutes'

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/', IndexRoutes)

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

export default app;
