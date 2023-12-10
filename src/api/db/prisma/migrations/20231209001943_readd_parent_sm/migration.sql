-- AlterTable
ALTER TABLE "source_measurement" ADD COLUMN     "parent_measurement_id" INTEGER;

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_parent_measurement_id_fkey" FOREIGN KEY ("parent_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
