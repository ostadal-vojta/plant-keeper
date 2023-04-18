import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient;

const main = async () => {
  const deletePlants = await prisma.plant.deleteMany({});
  const deletePlaces = await prisma.place.deleteMany({});

  const home = await  prisma.place.create({
    data: {
      name: 'Home',
    }
  });

  const Aggy = await prisma.plant.create({
    data: {
      name: "Aglaonema",
      description: 'Thrives in medium to bright indirect light, but can tolerate low indirect light.',
      watered: dayjs().subtract(1, "day").toISOString(),
      interval: 7,
      amount: 0.5,
      placeId: home.id,
      }
    }
  );
  const Siam = await prisma.plant.create({
    data: {
      name: "Aglaonema Siam",
      description: 'Thrives in medium to bright indirect light. Can tolerate low light conditions. Not suited for direct sun.',
      watered: dayjs().subtract(2, "day").toISOString(),
      interval: 14,
      amount: 0.3,
      placeId: home.id,
    }
  });
  const Wish = await prisma.plant.create({
    data: {
      name: "Aglaonema Wishes",
      description: 'Thrives in medium to bright indirect light. Can tolerate low light conditions. Not suited for direct sun.',
      watered: dayjs().subtract(5, "day").toISOString(),
      interval: 14,
      amount: 0.5,
      placeId:home.id,
    }
  });

  console.log(Aggy, Siam, Wish);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });