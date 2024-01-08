/*
  Warnings:

  - The primary key for the `user_important_measurement_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `important_field_name` on the `user_important_measurement_preference` table. All the data in the column will be lost.
  - Added the required column `source_measurement_id` to the `user_important_measurement_preference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_important_measurement_preference" DROP CONSTRAINT "user_important_measurement_preference_pkey",
DROP COLUMN "important_field_name",
ADD COLUMN     "source_measurement_id" INTEGER NOT NULL,
ADD CONSTRAINT "user_important_measurement_preference_pkey" PRIMARY KEY ("data_source_id", "user_id", "source_measurement_id");

-- AddForeignKey
ALTER TABLE "user_important_measurement_preference" ADD CONSTRAINT "user_important_measurement_preference_source_measurement_i_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
