import { RoomType, UserRole } from '../src/generated/prisma/index.js';
import { prisma } from '../src/lib/prismaClient.js';
import bcrypt from 'bcryptjs';


async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.roomLog.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.session.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.user.deleteMany();

  // Create 5 users (2 staff, 3 customers)
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'staff1@hotel.com',
        username: 'staff_john',
        password: hashedPassword,
        role: UserRole.STAFF,
      },
    }),
    prisma.user.create({
      data: {
        email: 'staff2@hotel.com',
        username: 'staff_sarah',
        password: hashedPassword,
        role: UserRole.STAFF,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer1@example.com',
        username: 'alice_wonder',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer2@example.com',
        username: 'bob_builder',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    }),
    prisma.user.create({
      data: {
        email: 'customer3@example.com',
        username: 'charlie_brown',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create 20 rooms with varied types and prices
  console.log('🏨 Creating rooms...');
  const roomData = [
    { number: '101', category: RoomType.SINGLE, price: 80 },
    { number: '102', category: RoomType.SINGLE, price: 80 },
    { number: '103', category: RoomType.SINGLE, price: 85 },
    { number: '104', category: RoomType.SINGLE, price: 85 },
    { number: '201', category: RoomType.DOUBLE, price: 120 },
    { number: '202', category: RoomType.DOUBLE, price: 120 },
    { number: '203', category: RoomType.DOUBLE, price: 125 },
    { number: '204', category: RoomType.DOUBLE, price: 125 },
    { number: '205', category: RoomType.DOUBLE, price: 130 },
    { number: '206', category: RoomType.DOUBLE, price: 130 },
    { number: '301', category: RoomType.LUXURY, price: 250 },
    { number: '302', category: RoomType.LUXURY, price: 250 },
    { number: '303', category: RoomType.LUXURY, price: 280 },
    { number: '304', category: RoomType.LUXURY, price: 280 },
    { number: '401', category: RoomType.SINGLE, price: 90 },
    { number: '402', category: RoomType.DOUBLE, price: 135 },
    { number: '403', category: RoomType.LUXURY, price: 300 },
    { number: '501', category: RoomType.LUXURY, price: 350 },
    { number: '502', category: RoomType.LUXURY, price: 350 },
    { number: '503', category: RoomType.LUXURY, price: 400 },
  ];

  const rooms = await Promise.all(
    roomData.map((room) =>
      prisma.room.create({
        data: room,
      })
    )
  );

  console.log(`✅ Created ${rooms.length} rooms`);

  console.log('✨ Seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: ${users.length} (2 staff, 3 customers)`);
  console.log(`   - Rooms: ${rooms.length}`);
  console.log(`   - Default password for all users: password123`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
