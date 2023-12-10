/*
  Warnings:

  - You are about to drop the column `source_measurement_id` on the `measurement_comment_value` table. All the data in the column will be lost.
  - You are about to drop the column `source_measurement_id` on the `measurement_float_value` table. All the data in the column will be lost.
  - You are about to drop the column `source_measurement_id` on the `measurement_int_value` table. All the data in the column will be lost.
  - You are about to drop the column `source_measurement_id` on the `measurement_paragraph_value` table. All the data in the column will be lost.
  - You are about to drop the column `source_measurement_id` on the `measurement_text_value` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `source_measurement` table. All the data in the column will be lost.
  - You are about to drop the column `parent_measurement_id` on the `source_measurement` table. All the data in the column will be lost.
  - Added the required column `company_measurement_id` to the `measurement_comment_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_measurement_id` to the `measurement_float_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_measurement_id` to the `measurement_int_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_measurement_id` to the `measurement_paragraph_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_measurement_id` to the `measurement_text_value` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "measurement_comment_value" DROP CONSTRAINT "measurement_comment_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_float_value" DROP CONSTRAINT "measurement_float_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_int_value" DROP CONSTRAINT "measurement_int_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_paragraph_value" DROP CONSTRAINT "measurement_paragraph_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_text_value" DROP CONSTRAINT "measurement_text_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "source_measurement" DROP CONSTRAINT "source_measurement_company_id_fkey";

-- DropForeignKey
ALTER TABLE "source_measurement" DROP CONSTRAINT "source_measurement_parent_measurement_id_fkey";

-- AlterTable
ALTER TABLE "measurement_comment_value" DROP COLUMN "source_measurement_id",
ADD COLUMN     "company_measurement_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "measurement_float_value" DROP COLUMN "source_measurement_id",
ADD COLUMN     "company_measurement_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "measurement_int_value" DROP COLUMN "source_measurement_id",
ADD COLUMN     "company_measurement_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "measurement_paragraph_value" DROP COLUMN "source_measurement_id",
ADD COLUMN     "company_measurement_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "measurement_text_value" DROP COLUMN "source_measurement_id",
ADD COLUMN     "company_measurement_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "source_measurement" DROP COLUMN "company_id",
DROP COLUMN "parent_measurement_id";

-- CreateTable
CREATE TABLE "company_source_measurement" (
    "company_measurement_id" INTEGER NOT NULL,
    "source_measurement_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "company_source_measurement_pkey" PRIMARY KEY ("company_measurement_id")
);

-- AddForeignKey
ALTER TABLE "company_source_measurement" ADD CONSTRAINT "company_source_measurement_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_source_measurement" ADD CONSTRAINT "company_source_measurement_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_text_value" ADD CONSTRAINT "measurement_text_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_int_value" ADD CONSTRAINT "measurement_int_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_float_value" ADD CONSTRAINT "measurement_float_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_comment_value" ADD CONSTRAINT "measurement_comment_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_paragraph_value" ADD CONSTRAINT "measurement_paragraph_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;
