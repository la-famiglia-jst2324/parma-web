/*
  Warnings:

  - You are about to drop the column `secretName` on the `notification_channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_channel" DROP COLUMN "secretName",
ADD COLUMN     "secret_id" TEXT;
