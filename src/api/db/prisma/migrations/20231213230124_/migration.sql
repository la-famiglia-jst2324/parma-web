/*
  Warnings:

  - You are about to drop the column `default_frequency` on the `data_source` table. All the data in the column will be lost.
  - Added the required column `frequency` to the `data_source` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_source" DROP COLUMN "default_frequency",
ADD COLUMN     "frequency" "frequency" NOT NULL;
