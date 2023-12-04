-- AlterTable
ALTER TABLE "data_source" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "profile_picture" TEXT;

-- CreateTable
CREATE TABLE "user_customization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_customization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_company_customization" (
    "id" SERIAL NOT NULL,
    "customization_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_company_customization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_metric_customization" (
    "id" SERIAL NOT NULL,
    "customization_id" INTEGER NOT NULL,
    "source_measurement_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_metric_customization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_customization" ADD CONSTRAINT "user_customization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_company_customization" ADD CONSTRAINT "user_company_customization_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_company_customization" ADD CONSTRAINT "user_company_customization_customization_id_fkey" FOREIGN KEY ("customization_id") REFERENCES "user_customization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metric_customization" ADD CONSTRAINT "user_metric_customization_customization_id_fkey" FOREIGN KEY ("customization_id") REFERENCES "user_customization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_metric_customization" ADD CONSTRAINT "user_metric_customization_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
