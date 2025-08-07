const { PrismaClient } = require('@prisma/client');
     const prisma = new PrismaClient();
     const { addDays, addMinutes, formatISO } = require('date-fns');

     async function generateSlots() {
       try {
         // Delete bookings first to avoid foreign key constraint violation
         await prisma.booking.deleteMany();
         // Then delete slots
         await prisma.slot.deleteMany();
         const startDate = new Date();
         for (let day = 0; day < 7; day++) {
           const currentDate = addDays(startDate, day);
           let currentTime = new Date(currentDate.setHours(9, 0, 0, 0));
           const endTime = new Date(currentDate.setHours(17, 0, 0, 0));
        
           while (currentTime < endTime) {
             await prisma.slot.create({
               data: {
                 startAt: formatISO(currentTime),
                 endAt: formatISO(addMinutes(currentTime, 30)),
               },
             });
             currentTime = addMinutes(currentTime, 30);
           }
         }
         console.log('Slots generated successfully');
       } catch (error) {
         console.error('Error generating slots:', error);
         throw error;
       }
     }

     module.exports = { generateSlots };