/*
  Warnings:

  - Added the required column `frequency` to the `InvertedIndex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvertedIndex" ADD COLUMN     "frequency" INTEGER NOT NULL;
