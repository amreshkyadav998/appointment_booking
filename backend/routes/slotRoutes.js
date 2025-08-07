const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', authMiddleware(), async (req, res, next) => {
  try {
    const slots = await prisma.slot.findMany({
      where: { booking: null },
      orderBy: { startAt: 'asc' },
    });
    res.json(slots);
  } catch (error) {
    next(error);
  }
});

module.exports = router;