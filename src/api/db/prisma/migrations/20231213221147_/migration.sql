/*
  Warnings:

  - The values [CRON] on the enum `frequency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "frequency_new" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');
ALTER TABLE "data_source" ALTER COLUMN "default_frequency" TYPE "frequency_new" USING ("default_frequency"::text::"frequency_new");
ALTER TYPE "frequency" RENAME TO "frequency_old";
ALTER TYPE "frequency_new" RENAME TO "frequency";
DROP TYPE "frequency_old";
COMMIT;
