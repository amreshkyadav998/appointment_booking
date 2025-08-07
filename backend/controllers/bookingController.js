const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createBooking = async (req, res, next) => {
  try {
    const { slotId } = req.body;
    const userId = req.user.id;
    const existingBooking = await prisma.booking.findUnique({ where: { slotId } });
    if (existingBooking) {
      return res.status(409).json({ error: 'Slot already booked' });
    }
    const booking = await prisma.booking.create({
      data: { userId, slotId },
      include: { slot: true },
    });
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { slot: true },
    });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: true, slot: true },
    });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};