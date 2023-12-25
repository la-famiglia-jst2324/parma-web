/*
  Warnings:

  - You are about to drop the column `entity_id` on the `notification_channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_channel" DROP COLUMN "entity_id";
