import app from './app';
import sequelize from './utils/database';
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
});
