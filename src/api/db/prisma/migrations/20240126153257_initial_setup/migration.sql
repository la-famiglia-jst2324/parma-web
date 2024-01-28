-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "channel_purpose" AS ENUM ('NOTIFICATION', 'REPORT');

-- CreateEnum
CREATE TYPE "channel_type" AS ENUM ('EMAIL', 'SLACK');

-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('TEXT', 'JPG', 'PDF');

-- CreateEnum
CREATE TYPE "health_status" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "frequency" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "bucket_permission" AS ENUM ('VIEWER', 'MODERATOR');

-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "schedule_type" AS ENUM ('ON_DEMAND', 'REGULAR');

-- CreateEnum
CREATE TYPE "identifier_type" AS ENUM ('AUTOMATICALLY_DISCOVERED', 'MANUALLY_ADDED');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profile_picture" TEXT,
    "role" "role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "username" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "added_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bucket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "owner_id" INTEGER NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_bucket_membership" (
    "company_id" INTEGER NOT NULL,
    "bucket_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_bucket_membership_pkey" PRIMARY KEY ("company_id","bucket_id")
);

-- CreateTable
CREATE TABLE "notification_channel" (
    "id" SERIAL NOT NULL,
    "channel_type" "channel_type" NOT NULL,
    "destination" TEXT NOT NULL,
    "secret_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_subscription" (
    "user_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "channel_purpose" "channel_purpose" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_subscription_pkey" PRIMARY KEY ("user_id","channel_id")
);

-- CreateTable
CREATE TABLE "company_attachment" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "file_type" "file_type" NOT NULL,
    "file_url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_source" (
    "id" SERIAL NOT NULL,
    "source_name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "frequency" "frequency" NOT NULL,
    "health_status" "health_status" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "max_run_seconds" INTEGER NOT NULL DEFAULT 300,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "invocation_endpoint" TEXT NOT NULL DEFAULT '',
    "additional_params" JSONB,

    CONSTRAINT "data_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduled_task" (
    "task_id" SERIAL NOT NULL,
    "data_source_id" INTEGER NOT NULL,
    "schedule_type" "schedule_type" NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "started_at" TIMESTAMP(3),
    "ended_at" TIMESTAMP(3),
    "max_run_seconds" INTEGER NOT NULL DEFAULT 300,
    "result_summary" TEXT,
    "status" "task_status" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "scheduled_task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "company_data_source" (
    "id" SERIAL NOT NULL,
    "data_source_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "is_data_source_active" BOOLEAN NOT NULL,
    "health_status" "health_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_data_source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bucket_access" (
    "bucket_id" INTEGER NOT NULL,
    "invitee_id" INTEGER NOT NULL,
    "permission" "bucket_permission" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bucket_access_pkey" PRIMARY KEY ("bucket_id","invitee_id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "data_source_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_rules" (
    "rule_id" SERIAL NOT NULL,
    "rule_name" TEXT NOT NULL,
    "source_measurement_id" INTEGER NOT NULL,
    "threshold" DOUBLE PRECISION NOT NULL,
    "aggregation_method" TEXT,
    "num_aggregation_entries" INTEGER,
    "notification_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_rules_pkey" PRIMARY KEY ("rule_id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "data_source_id" INTEGER NOT NULL,
    "trigger_factor" TEXT,
    "title" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "source_measurement_id" INTEGER NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_subscription" (
    "user_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_subscription_pkey" PRIMARY KEY ("user_id","company_id")
);

-- CreateTable
CREATE TABLE "source_measurement" (
    "id" SERIAL NOT NULL,
    "source_module_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "measurement_name" TEXT NOT NULL,
    "parent_measurement_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "source_measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_source_measurement" (
    "company_measurement_id" SERIAL NOT NULL,
    "source_measurement_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "company_source_measurement_pkey" PRIMARY KEY ("company_measurement_id")
);

-- CreateTable
CREATE TABLE "measurement_text_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_text_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_int_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_int_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_float_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_float_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_comment_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "sentiment_score" INTEGER,

    CONSTRAINT "measurement_comment_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_paragraph_value" (
    "id" SERIAL NOT NULL,
    "company_measurement_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_paragraph_value_pkey" PRIMARY KEY ("id")
);

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
    "value" TIMESTAMP(3) NOT NULL,
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

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "report_file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_important_measurement_preference" (
    "data_source_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "important_field_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_important_measurement_preference_pkey" PRIMARY KEY ("data_source_id","user_id","important_field_name")
);

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

-- CreateTable
CREATE TABLE "company_subscription" (
    "user_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_subscription_pkey" PRIMARY KEY ("user_id","company_id")
);

-- CreateTable
CREATE TABLE "company_data_source_identifier" (
    "id" SERIAL NOT NULL,
    "company_data_source_id" INTEGER NOT NULL,
    "identifier_type" "identifier_type" NOT NULL,
    "property" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_data_source_identifier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_id_key" ON "user"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_data_source_data_source_id_company_id_key" ON "company_data_source"("data_source_id", "company_id");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket" ADD CONSTRAINT "bucket_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_bucket_membership" ADD CONSTRAINT "company_bucket_membership_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_bucket_membership" ADD CONSTRAINT "company_bucket_membership_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "bucket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "notification_channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_attachment" ADD CONSTRAINT "company_attachment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_attachment" ADD CONSTRAINT "company_attachment_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduled_task" ADD CONSTRAINT "scheduled_task_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_data_source" ADD CONSTRAINT "company_data_source_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_data_source" ADD CONSTRAINT "company_data_source_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket_access" ADD CONSTRAINT "bucket_access_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "bucket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket_access" ADD CONSTRAINT "bucket_access_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_rules" ADD CONSTRAINT "notification_rules_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_subscription" ADD CONSTRAINT "news_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_subscription" ADD CONSTRAINT "news_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_source_module_id_fkey" FOREIGN KEY ("source_module_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_parent_measurement_id_fkey" FOREIGN KEY ("parent_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_source_measurement" ADD CONSTRAINT "company_source_measurement_source_measurement_id_fkey" FOREIGN KEY ("source_measurement_id") REFERENCES "source_measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_source_measurement" ADD CONSTRAINT "company_source_measurement_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_text_value" ADD CONSTRAINT "measurement_text_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_int_value" ADD CONSTRAINT "measurement_int_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_float_value" ADD CONSTRAINT "measurement_float_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_comment_value" ADD CONSTRAINT "measurement_comment_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_paragraph_value" ADD CONSTRAINT "measurement_paragraph_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_link_value" ADD CONSTRAINT "measurement_link_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_image_value" ADD CONSTRAINT "measurement_image_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_date_value" ADD CONSTRAINT "measurement_date_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "measurement_nested_value" ADD CONSTRAINT "measurement_nested_value_company_measurement_id_fkey" FOREIGN KEY ("company_measurement_id") REFERENCES "company_source_measurement"("company_measurement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_important_measurement_preference" ADD CONSTRAINT "user_important_measurement_preference_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_important_measurement_preference" ADD CONSTRAINT "user_important_measurement_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "company_subscription" ADD CONSTRAINT "company_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_subscription" ADD CONSTRAINT "company_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_data_source_identifier" ADD CONSTRAINT "company_data_source_identifier_company_data_source_id_fkey" FOREIGN KEY ("company_data_source_id") REFERENCES "company_data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Functions
CREATE OR REPLACE FUNCTION add_company_data_source_relationship() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
    SELECT NEW.id, id, true, 'UP', NOW() FROM data_source;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_data_source_company_relationship() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO company_data_source (company_id, data_source_id, is_data_source_active, health_status, modified_at)
    SELECT id, NEW.id, true, 'UP', NOW() FROM company;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Triggers
CREATE TRIGGER company_inserted
AFTER INSERT ON company
FOR EACH ROW EXECUTE FUNCTION add_company_data_source_relationship();

CREATE TRIGGER data_source_inserted
AFTER INSERT ON data_source
FOR EACH ROW EXECUTE FUNCTION add_data_source_company_relationship();
