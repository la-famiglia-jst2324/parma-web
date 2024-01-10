/*
  Warnings:

  - You are about to drop the `company_subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_subscription" DROP CONSTRAINT "company_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_subscription" DROP CONSTRAINT "company_subscription_user_id_fkey";

-- AlterTable
ALTER TABLE "source_measurement" ADD COLUMN     "parent_measurement_id" INTEGER;

-- DropTable
DROP TABLE "company_subscription";

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_parent_measurement_id_fkey" FOREIGN KEY ("parent_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
