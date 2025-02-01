/*
  Warnings:

  - Added the required column `area` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emprego` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nacionalidade` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `nome` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "emprego" TEXT NOT NULL,
ADD COLUMN     "nacionalidade" TEXT NOT NULL,
ALTER COLUMN "nome" SET NOT NULL;
