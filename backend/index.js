const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');
const slotRoutes = require('./routes/slotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { generateSlots } = require('./utils/slotGenerator');

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/all-bookings', bookingRoutes);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await generateSlots();
    await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin',
        email: 'admin@example.com',
        password: require('bcrypt').hashSync('Password!', 10),
        role: 'admin',
      },
    });
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server running on port ${process.env.PORT || 3001}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
  }
};

startServer();