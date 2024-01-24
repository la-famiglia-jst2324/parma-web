/*
  Warnings:

  - You are about to drop the column `identifier_key` on the `company_data_source_identifier` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_added_by_fkey";

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "added_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "company_data_source_identifier" DROP COLUMN "identifier_key";

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
