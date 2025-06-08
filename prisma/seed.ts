import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Supprimer anciennes données
  await prisma.traffic.deleteMany();
  await prisma.alerte.deleteMany();

  const jours = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  // Seed Traffic
  for (let i = 0; i < jours.length; i++) {
    await prisma.traffic.create({
      data: {
        jour: jours[i],
        valeur: Math.floor(Math.random() * 300),
      },
    });

    await prisma.alerte.create({
      data: {
        jour: jours[i],
        total: Math.floor(Math.random() * 10),
      },
    });
  }
}

main()
  .then(() => {
    console.log("✅ Données insérées avec succès");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
