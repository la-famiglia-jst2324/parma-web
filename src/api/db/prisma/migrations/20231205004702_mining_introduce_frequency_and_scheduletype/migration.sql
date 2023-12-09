/*
  Warnings:

  - Added the required column `schedule_type` to the `scheduled_tasks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "schedule_type" AS ENUM ('ON_DEMAND', 'REGULAR');

-- AlterEnum
ALTER TYPE "frequency" ADD VALUE 'CRON';

-- AlterTable
ALTER TABLE "data_source" ADD COLUMN     "frequency_pattern" TEXT;

-- AlterTable
ALTER TABLE "scheduled_tasks" ADD COLUMN     "schedule_type" "schedule_type" NOT NULL;
