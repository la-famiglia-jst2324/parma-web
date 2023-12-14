/*
  Warnings:

  - You are about to drop the column `apiKey` on the `notification_channel` table. All the data in the column will be lost.
  - Added the required column `timestamp` to the `measurement_comment_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `measurement_float_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `measurement_int_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `measurement_paragraph_value` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `measurement_text_value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "measurement_comment_value" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "measurement_float_value" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "measurement_int_value" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "measurement_paragraph_value" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "measurement_text_value" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "notification_channel" DROP COLUMN "apiKey",
ADD COLUMN     "api_key" TEXT;
