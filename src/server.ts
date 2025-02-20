import express from 'express';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import db from './db';

const app = express();
app.use(express.json());

app.use('/api/auth', loginRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes);

const PORT = 3000;
app.listen(PORT, async () => {
    await db.init();
    console.log(`Server is running on port ${PORT}`);
});



