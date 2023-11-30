-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('NOTIFICATION', 'REPORT');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('EMAIL', 'SLACK');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('TEXT', 'JPG', 'PDF');

-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "BucketPermission" AS ENUM ('VIEWER', 'MODERATOR');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "added_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bucket" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_bucket_membership" (
    "company_id" TEXT NOT NULL,
    "bucket_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_bucket_membership_pkey" PRIMARY KEY ("company_id","bucket_id")
);

-- CreateTable
CREATE TABLE "notification_channel" (
    "id" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "channel_type" "ChannelType" NOT NULL,
    "destination" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_subscription" (
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_subscription_pkey" PRIMARY KEY ("user_id","company_id","channel_id")
);

-- CreateTable
CREATE TABLE "report_subscription" (
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_subscription_pkey" PRIMARY KEY ("user_id","company_id","channel_id")
);

-- CreateTable
CREATE TABLE "company_attachment" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "file_type" "FileType" NOT NULL,
    "file_url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_source" (
    "id" TEXT NOT NULL,
    "source_name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "default_frequency" "Frequency" NOT NULL,
    "health_status" "HealthStatus" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_data_source" (
    "data_source_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "is_data_source_active" BOOLEAN NOT NULL,
    "health_status" "HealthStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_data_source_pkey" PRIMARY KEY ("data_source_id","company_id")
);

-- CreateTable
CREATE TABLE "bucket_access" (
    "bucket_id" TEXT NOT NULL,
    "invitee_id" TEXT NOT NULL,
    "permission" "BucketPermission" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bucket_access_pkey" PRIMARY KEY ("bucket_id","invitee_id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "data_source_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "source_measurement" (
    "id" TEXT NOT NULL,
    "source_module_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "measurement_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "source_measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_text_value" (
    "id" TEXT NOT NULL,
    "source_measurement_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_text_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_int_value" (
    "id" TEXT NOT NULL,
    "source_measurement_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_int_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_float_value" (
    "id" TEXT NOT NULL,
    "source_measurement_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_float_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_comment_value" (
    "id" TEXT NOT NULL,
    "source_measurement_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_comment_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_paragraph_value" (
    "id" TEXT NOT NULL,
    "source_measurement_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_paragraph_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "report_file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_important_measurement_preference" (
    "data_source_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "important_field_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_important_measurement_preference_pkey" PRIMARY KEY ("data_source_id","user_id")
);

-- CreateTable
CREATE TABLE "news_subscription" (
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_subscription_pkey" PRIMARY KEY ("user_id","company_id")
);

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket" ADD CONSTRAINT "bucket_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_bucket_membership" ADD CONSTRAINT "company_bucket_membership_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_bucket_membership" ADD CONSTRAINT "company_bucket_membership_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "bucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "notification_channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_subscription" ADD CONSTRAINT "report_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_subscription" ADD CONSTRAINT "report_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_subscription" ADD CONSTRAINT "report_subscription_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "notification_channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_attachment" ADD CONSTRAINT "company_attachment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_attachment" ADD CONSTRAINT "company_attachment_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_data_source" ADD CONSTRAINT "company_data_source_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_data_source" ADD CONSTRAINT "company_data_source_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket_access" ADD CONSTRAINT "bucket_access_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "bucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket_access" ADD CONSTRAINT "bucket_access_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_source_module_id_fkey" FOREIGN KEY ("source_module_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_text_value" ADD CONSTRAINT "measurement_text_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_int_value" ADD CONSTRAINT "measurement_int_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_float_value" ADD CONSTRAINT "measurement_float_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_comment_value" ADD CONSTRAINT "measurement_comment_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_paragraph_value" ADD CONSTRAINT "measurement_paragraph_value_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_important_measurement_preference" ADD CONSTRAINT "user_important_measurement_preference_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_important_measurement_preference" ADD CONSTRAINT "user_important_measurement_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_subscription" ADD CONSTRAINT "news_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_subscription" ADD CONSTRAINT "news_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
