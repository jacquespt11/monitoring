-- CreateTable
CREATE TABLE "Reseau" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "temps" TEXT NOT NULL,
    "test" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reseau_pkey" PRIMARY KEY ("id")
);
