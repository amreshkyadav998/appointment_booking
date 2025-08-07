const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAvailableSlots = async (req, res, next) => {
  try {
    const slots = await prisma.slot.findMany({
      where: { booking: null }, // Only return slots without bookings
      orderBy: { startAt: 'asc' }, // Sort by start time
    });
    res.json(slots);
  } catch (error) {
    next(error);
  }
};