/*
  Warnings:

  - The primary key for the `user_important_measurement_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `source_measurement_id` on the `user_important_measurement_preference` table. All the data in the column will be lost.
  - Added the required column `important_field_name` to the `user_important_measurement_preference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_important_measurement_preference" DROP CONSTRAINT "user_important_measurement_preference_source_measurement_i_fkey";

-- AlterTable
ALTER TABLE "user_important_measurement_preference" DROP CONSTRAINT "user_important_measurement_preference_pkey",
DROP COLUMN "source_measurement_id",
ADD COLUMN     "important_field_name" TEXT NOT NULL,
ADD CONSTRAINT "user_important_measurement_preference_pkey" PRIMARY KEY ("data_source_id", "user_id", "important_field_name");
