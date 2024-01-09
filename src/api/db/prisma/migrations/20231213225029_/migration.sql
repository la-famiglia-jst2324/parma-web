-- AlterTable
ALTER TABLE "scheduled_task" ADD COLUMN     "max_run_seconds" INTEGER NOT NULL DEFAULT 300;
