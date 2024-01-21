/*
  Warnings:

  - Added the required column `sentiment_score` to the `measurement_comment_value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "measurement_comment_value" ADD COLUMN     "sentiment_score" TEXT NOT NULL;
