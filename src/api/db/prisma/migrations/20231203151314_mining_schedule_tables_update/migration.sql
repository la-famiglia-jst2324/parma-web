/*
  Warnings:

  - You are about to drop the column `url` on the `data_source` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "data_source" DROP COLUMN "url",
ADD COLUMN     "additional_params" JSONB,
ADD COLUMN     "invocation_endpoint" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "maximum_expected_run_time" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "version" TEXT NOT NULL DEFAULT '1.0';

-- CreateTable
CREATE TABLE "scheduled_tasks" (
    "task_id" SERIAL NOT NULL,
    "data_source_id" INTEGER NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locked_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3) NOT NULL,
    "result_summary" TEXT,
    "status" "task_status" NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "scheduled_tasks_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "scheduled_tasks" ADD CONSTRAINT "scheduled_tasks_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
