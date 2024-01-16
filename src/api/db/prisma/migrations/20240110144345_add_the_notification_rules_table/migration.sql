-- CreateTable
CREATE TABLE "notification_rules" (
    "rule_id" INTEGER NOT NULL,
    "rule_name" TEXT NOT NULL,
    "source_measurement_id" INTEGER NOT NULL,
    "threshold" DOUBLE PRECISION NOT NULL,
    "aggregation_method" TEXT,
    "num_aggregation_entries" INTEGER,
    "notification_message" TEXT,

    CONSTRAINT "notification_rules_pkey" PRIMARY KEY ("rule_id")
);

-- AddForeignKey
ALTER TABLE "notification_rules" ADD CONSTRAINT "notification_rules_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
