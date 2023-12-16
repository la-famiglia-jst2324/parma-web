/*
  Warnings:

  - Added the required column `source_type` to the `data_source` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "data_source_type" AS ENUM ('REDDIT', 'GITHUB', 'LINKEDIN', 'PEOPLEDATALABS', 'CLEARBIT', 'DISCORD', 'AFFINITY');

-- AlterTable
ALTER TABLE "data_source" ADD COLUMN     "source_type" "data_source_type" NOT NULL;
