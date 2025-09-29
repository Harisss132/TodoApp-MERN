import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import router from './routes/todoRoutes.js';
configDotenv();

const app = express();
const PORT = process.env.PORT || 4004;

app.use(express.json());
app.use(cors());
app.use('/api/todo', router);

app.listen(PORT, () => {
    console.log(`Server berjalan pada localhost:${PORT}`);
})