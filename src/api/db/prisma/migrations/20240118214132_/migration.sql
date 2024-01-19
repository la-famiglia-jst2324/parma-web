/*
  Warnings:

  - The `sentiment_score` column on the `measurement_comment_value` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "measurement_comment_value" DROP COLUMN "sentiment_score",
ADD COLUMN     "sentiment_score" INTEGER;
