/*
  Warnings:

  - You are about to drop the column `frequency` on the `company_data_source` table. All the data in the column will be lost.
  - The primary key for the `user_important_measurement_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "bucket_access" DROP CONSTRAINT "bucket_access_bucket_id_fkey";

-- DropForeignKey
ALTER TABLE "bucket_access" DROP CONSTRAINT "bucket_access_invitee_id_fkey";

-- DropForeignKey
ALTER TABLE "company_attachment" DROP CONSTRAINT "company_attachment_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_bucket_membership" DROP CONSTRAINT "company_bucket_membership_bucket_id_fkey";

-- DropForeignKey
ALTER TABLE "company_bucket_membership" DROP CONSTRAINT "company_bucket_membership_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_data_source" DROP CONSTRAINT "company_data_source_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_data_source" DROP CONSTRAINT "company_data_source_data_source_id_fkey";

-- DropForeignKey
ALTER TABLE "news_subscription" DROP CONSTRAINT "news_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "news_subscription" DROP CONSTRAINT "news_subscription_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report_subscription" DROP CONSTRAINT "report_subscription_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "report_subscription" DROP CONSTRAINT "report_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "report_subscription" DROP CONSTRAINT "report_subscription_user_id_fkey";

-- DropForeignKey
ALTER TABLE "source_measurement" DROP CONSTRAINT "source_measurement_company_id_fkey";

-- DropForeignKey
ALTER TABLE "source_measurement" DROP CONSTRAINT "source_measurement_source_module_id_fkey";

-- DropForeignKey
ALTER TABLE "user_important_measurement_preference" DROP CONSTRAINT "user_important_measurement_preference_data_source_id_fkey";

-- DropForeignKey
ALTER TABLE "user_important_measurement_preference" DROP CONSTRAINT "user_important_measurement_preference_user_id_fkey";

-- AlterTable
ALTER TABLE "company_data_source" DROP COLUMN "frequency";

-- AlterTable
ALTER TABLE "user_important_measurement_preference" DROP CONSTRAINT "user_important_measurement_preference_pkey",
ADD CONSTRAINT "user_important_measurement_preference_pkey" PRIMARY KEY ("data_source_id", "user_id", "important_field_name");

-- AddForeignKey
ALTER TABLE "company_bucket_membership" ADD CONSTRAINT "company_bucket_membership_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_bucket_membership" ADD CONSTRAINT "company_bucket_membership_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "bucket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_subscription" ADD CONSTRAINT "notification_subscription_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "notification_channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_subscription" ADD CONSTRAINT "report_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_subscription" ADD CONSTRAINT "report_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_subscription" ADD CONSTRAINT "report_subscription_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "notification_channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_attachment" ADD CONSTRAINT "company_attachment_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_data_source" ADD CONSTRAINT "company_data_source_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_data_source" ADD CONSTRAINT "company_data_source_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket_access" ADD CONSTRAINT "bucket_access_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "bucket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bucket_access" ADD CONSTRAINT "bucket_access_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_source_module_id_fkey" FOREIGN KEY ("source_module_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source_measurement" ADD CONSTRAINT "source_measurement_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_important_measurement_preference" ADD CONSTRAINT "user_important_measurement_preference_data_source_id_fkey" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_important_measurement_preference" ADD CONSTRAINT "user_important_measurement_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_subscription" ADD CONSTRAINT "news_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_subscription" ADD CONSTRAINT "news_subscription_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
