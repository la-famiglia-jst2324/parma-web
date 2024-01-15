/*
  Warnings:

  - Added the required column `timestamp` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
