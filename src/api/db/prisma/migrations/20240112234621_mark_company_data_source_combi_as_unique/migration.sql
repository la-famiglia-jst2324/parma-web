/*
  Warnings:

  - A unique constraint covering the columns `[data_source_id,company_id]` on the table `company_data_source` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "company_data_source_data_source_id_company_id_key" ON "company_data_source"("data_source_id", "company_id");
