/*
  Warnings:

  - Added the required column `modified_at` to the `notification_rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notification_rules" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "data_source_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
