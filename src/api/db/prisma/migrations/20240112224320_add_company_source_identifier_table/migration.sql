/*
  Warnings:

  - The primary key for the `company_data_source` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "identifier_type" AS ENUM ('AUTOMATICALLY_DISCOVERED', 'MANUALLY_ADDED');

-- AlterTable
ALTER TABLE "company_data_source" DROP CONSTRAINT "company_data_source_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "company_data_source_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "company_data_source_identifier" (
    "id" SERIAL NOT NULL,
    "company_data_source_id" INTEGER NOT NULL,
    "identifier_key" TEXT NOT NULL,
    "identifier_type" "identifier_type" NOT NULL,
    "property" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_data_source_identifier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_data_source_identifier" ADD CONSTRAINT "company_data_source_identifier_company_data_source_id_fkey" FOREIGN KEY ("company_data_source_id") REFERENCES "company_data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
