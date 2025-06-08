-- AlterTable
ALTER TABLE "Reseau" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "temps" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Traffic" (
    "id" SERIAL NOT NULL,
    "jour" TEXT NOT NULL,
    "valeur" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Traffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerte" (
    "id" SERIAL NOT NULL,
    "jour" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alerte_pkey" PRIMARY KEY ("id")
);
