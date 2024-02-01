-- DropForeignKey
ALTER TABLE "scheduled_task" DROP CONSTRAINT "scheduled_task_data_source_id_fkey";

-- AddForeignKey
ALTER TABLE "scheduled_task" ADD CONSTRAINT "scheduled_task_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
