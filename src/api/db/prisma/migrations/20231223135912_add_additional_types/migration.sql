-- CreateTable
CREATE TABLE "measurement_link_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_link_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_image_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_image_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_date_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_date_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_nested_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_nested_value_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "measurement_link_value" ADD CONSTRAINT "measurement_link_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_image_value" ADD CONSTRAINT "measurement_image_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_date_value" ADD CONSTRAINT "measurement_date_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_nested_value" ADD CONSTRAINT "measurement_nested_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;
