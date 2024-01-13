/*
  Warnings:

  - You are about to drop the column `api_key` on the `notification_channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_channel" DROP COLUMN "api_key",
ADD COLUMN     "secretName" TEXT;
