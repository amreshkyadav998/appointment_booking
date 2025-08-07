const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/', authMiddleware('patient'), bookingController.createBooking);
router.get('/', authMiddleware('patient'), bookingController.getUserBookings);
router.get('/all-bookings', authMiddleware('admin'), bookingController.getAllBookings);

module.exports = router;