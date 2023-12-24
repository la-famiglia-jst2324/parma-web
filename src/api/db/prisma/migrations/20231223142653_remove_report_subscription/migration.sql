/*
  Warnings:

  - You are about to drop the column `entity_type` on the `notification_channel` table. All the data in the column will be lost.
  - The primary key for the `notification_subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `company_id` on the `notification_subscription` table. All the data in the column will be lost.
  - You are about to drop the `report_subscription` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `value` on the `measurement_date_value` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `channel_purpose` to the `notification_subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "channel_purpose" AS ENUM ('NOTIFICATION', 'REPORT');

-- DropForeignKey
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "report_subscription" DROP CONSTRAINT "report_subscription_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "report_subscription" DROP CONSTRAINT "report_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "report_subscription" DROP CONSTRAINT "report_subscription_user_id_fkey";

-- AlterTable
ALTER TABLE "measurement_date_value" DROP COLUMN "value",
ADD COLUMN     "value" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "notification_channel" DROP COLUMN "entity_type";

-- AlterTable
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_pkey",
DROP COLUMN "company_id",
ADD COLUMN     "channel_purpose" "channel_purpose" NOT NULL,
ADD CONSTRAINT "notification_subscription_pkey" PRIMARY KEY ("user_id", "channel_id");

-- DropTable
DROP TABLE "report_subscription";

-- DropEnum
DROP TYPE "entity_type";
