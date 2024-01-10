/*
  Warnings:

  - You are about to drop the column `frequency_pattern` on the `data_source` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "frequency" ADD VALUE 'HOURLY';

-- AlterTable
ALTER TABLE "data_source" DROP COLUMN "frequency_pattern";
