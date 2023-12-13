/*
  Warnings:

  - You are about to drop the `scheduled_tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "scheduled_tasks" DROP CONSTRAINT "scheduled_tasks_data_source_id_fkey";

-- AlterTable
ALTER TABLE "data_source" ADD COLUMN     "max_run_seconds" INTEGER NOT NULL DEFAULT 300;

-- DropTable
DROP TABLE "scheduled_tasks";

-- CreateTable
CREATE TABLE "scheduled_task" (
    "task_id" SERIAL NOT NULL,
    "data_source_id" INTEGER NOT NULL,
    "schedule_type" "schedule_type" NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "started_at" TIMESTAMP(3),
    "ended_at" TIMESTAMP(3),
    "result_summary" TEXT,
    "status" "task_status" NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "scheduled_task_pkey" PRIMARY KEY ("task_id")
);

-- AddForeignKey
ALTER TABLE "scheduled_task" ADD CONSTRAINT "scheduled_task_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
