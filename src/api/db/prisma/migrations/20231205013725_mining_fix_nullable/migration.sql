-- AlterTable
ALTER TABLE "scheduled_tasks" ALTER COLUMN "locked_at" DROP NOT NULL,
ALTER COLUMN "ended_at" DROP NOT NULL;
