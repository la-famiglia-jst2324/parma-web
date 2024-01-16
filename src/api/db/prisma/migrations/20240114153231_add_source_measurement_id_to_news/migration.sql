/*
  Warnings:

  - Added the required column `source_measurement_id` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "news" ADD COLUMN     "source_measurement_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
