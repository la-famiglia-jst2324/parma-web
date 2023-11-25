-- DropForeignKey
ALTER TABLE "measurement_comment_value" DROP CONSTRAINT "measurement_comment_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_float_value" DROP CONSTRAINT "measurement_float_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_int_value" DROP CONSTRAINT "measurement_int_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_paragraph_value" DROP CONSTRAINT "measurement_paragraph_value_source_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_text_value" DROP CONSTRAINT "measurement_text_value_source_measurement_id_fkey";

-- AddForeignKey
ALTER TABLE "measurement_text_value" ADD CONSTRAINT "measurement_text_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_int_value" ADD CONSTRAINT "measurement_int_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_float_value" ADD CONSTRAINT "measurement_float_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_comment_value" ADD CONSTRAINT "measurement_comment_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_paragraph_value" ADD CONSTRAINT "measurement_paragraph_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
