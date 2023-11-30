/*
  Warnings:

  - The primary key for the `bucket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bucket` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `bucket_access` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `company_attachment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `company_attachment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `company_bucket_membership` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `company_data_source` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `data_source` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `data_source` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `measurement_comment_value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `measurement_comment_value` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `measurement_float_value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `measurement_float_value` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `measurement_int_value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `measurement_int_value` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `measurement_paragraph_value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `measurement_paragraph_value` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `measurement_text_value` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `measurement_text_value` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `news_subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `notification_channel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `notification_channel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `notification_subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `report` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `report_subscription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `source_measurement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `source_measurement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user_important_measurement_preference` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `owner_id` on the `bucket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bucket_id` on the `bucket_access` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `invitee_id` on the `bucket_access` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `added_by` on the `company` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `company_attachment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `company_attachment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `company_bucket_membership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bucket_id` on the `company_bucket_membership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `data_source_id` on the `company_data_source` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `company_data_source` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_measurement_id` on the `measurement_comment_value` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_measurement_id` on the `measurement_float_value` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_measurement_id` on the `measurement_int_value` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_measurement_id` on the `measurement_paragraph_value` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_measurement_id` on the `measurement_text_value` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `news_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `news_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `data_source_id` on the `notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `notification_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `notification_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `channel_id` on the `notification_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `report_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `report_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `channel_id` on the `report_subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `source_module_id` on the `source_measurement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `company_id` on the `source_measurement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `data_source_id` on the `user_important_measurement_preference` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `user_id` on the `user_important_measurement_preference` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "bucket" DROP CONSTRAINT "bucket_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "bucket_access" DROP CONSTRAINT "bucket_access_bucket_id_fkey";

-- DropForeignKey
ALTER TABLE "bucket_access" DROP CONSTRAINT "bucket_access_invitee_id_fkey";

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_added_by_fkey";

-- DropForeignKey
ALTER TABLE "company_attachment" DROP CONSTRAINT "company_attachment_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_attachment" DROP CONSTRAINT "company_attachment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "company_bucket_membership" DROP CONSTRAINT "company_bucket_membership_bucket_id_fkey";

-- DropForeignKey
ALTER TABLE "company_bucket_membership" DROP CONSTRAINT "company_bucket_membership_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_data_source" DROP CONSTRAINT "company_data_source_company_id_fkey";

-- DropForeignKey
ALTER TABLE "company_data_source" DROP CONSTRAINT "company_data_source_data_source_id_fkey";

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

-- DropForeignKey
ALTER TABLE "news_subscription" DROP CONSTRAINT "news_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "news_subscription" DROP CONSTRAINT "news_subscription_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_company_id_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_data_source_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_company_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_company_id_fkey";

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
ALTER TABLE "bucket" DROP CONSTRAINT "bucket_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "owner_id",
ADD COLUMN     "owner_id" INTEGER NOT NULL,
ADD CONSTRAINT "bucket_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "bucket_access" DROP CONSTRAINT "bucket_access_pkey",
DROP COLUMN "bucket_id",
ADD COLUMN     "bucket_id" INTEGER NOT NULL,
DROP COLUMN "invitee_id",
ADD COLUMN     "invitee_id" INTEGER NOT NULL,
ADD CONSTRAINT "bucket_access_pkey" PRIMARY KEY ("bucket_id", "invitee_id");

-- AlterTable
ALTER TABLE "company" DROP CONSTRAINT "company_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "added_by",
ADD COLUMN     "added_by" INTEGER NOT NULL,
ADD CONSTRAINT "company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "company_attachment" DROP CONSTRAINT "company_attachment_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "company_attachment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "company_bucket_membership" DROP CONSTRAINT "company_bucket_membership_pkey",
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
DROP COLUMN "bucket_id",
ADD COLUMN     "bucket_id" INTEGER NOT NULL,
ADD CONSTRAINT "company_bucket_membership_pkey" PRIMARY KEY ("company_id", "bucket_id");

-- AlterTable
ALTER TABLE "company_data_source" DROP CONSTRAINT "company_data_source_pkey",
DROP COLUMN "data_source_id",
ADD COLUMN     "data_source_id" INTEGER NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD CONSTRAINT "company_data_source_pkey" PRIMARY KEY ("data_source_id", "company_id");

-- AlterTable
ALTER TABLE "data_source" DROP CONSTRAINT "data_source_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "data_source_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "measurement_comment_value" DROP CONSTRAINT "measurement_comment_value_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "source_measurement_id",
ADD COLUMN     "source_measurement_id" INTEGER NOT NULL,
ADD CONSTRAINT "measurement_comment_value_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "measurement_float_value" DROP CONSTRAINT "measurement_float_value_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "source_measurement_id",
ADD COLUMN     "source_measurement_id" INTEGER NOT NULL,
ADD CONSTRAINT "measurement_float_value_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "measurement_int_value" DROP CONSTRAINT "measurement_int_value_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "source_measurement_id",
ADD COLUMN     "source_measurement_id" INTEGER NOT NULL,
ADD CONSTRAINT "measurement_int_value_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "measurement_paragraph_value" DROP CONSTRAINT "measurement_paragraph_value_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "source_measurement_id",
ADD COLUMN     "source_measurement_id" INTEGER NOT NULL,
ADD CONSTRAINT "measurement_paragraph_value_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "measurement_text_value" DROP CONSTRAINT "measurement_text_value_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "source_measurement_id",
ADD COLUMN     "source_measurement_id" INTEGER NOT NULL,
ADD CONSTRAINT "measurement_text_value_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "news_subscription" DROP CONSTRAINT "news_subscription_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD CONSTRAINT "news_subscription_pkey" PRIMARY KEY ("user_id", "company_id");

-- AlterTable
ALTER TABLE "notification" DROP CONSTRAINT "notification_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
DROP COLUMN "data_source_id",
ADD COLUMN     "data_source_id" INTEGER NOT NULL,
ADD CONSTRAINT "notification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notification_channel" DROP CONSTRAINT "notification_channel_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "notification_channel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notification_subscription" DROP CONSTRAINT "notification_subscription_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
DROP COLUMN "channel_id",
ADD COLUMN     "channel_id" INTEGER NOT NULL,
ADD CONSTRAINT "notification_subscription_pkey" PRIMARY KEY ("user_id", "company_id", "channel_id");

-- AlterTable
ALTER TABLE "report" DROP CONSTRAINT "report_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD CONSTRAINT "report_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "report_subscription" DROP CONSTRAINT "report_subscription_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
DROP COLUMN "channel_id",
ADD COLUMN     "channel_id" INTEGER NOT NULL,
ADD CONSTRAINT "report_subscription_pkey" PRIMARY KEY ("user_id", "company_id", "channel_id");

-- AlterTable
ALTER TABLE "source_measurement" DROP CONSTRAINT "source_measurement_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "source_module_id",
ADD COLUMN     "source_module_id" INTEGER NOT NULL,
DROP COLUMN "company_id",
ADD COLUMN     "company_id" INTEGER NOT NULL,
ADD CONSTRAINT "source_measurement_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user_important_measurement_preference" DROP CONSTRAINT "user_important_measurement_preference_pkey",
DROP COLUMN "data_source_id",
ADD COLUMN     "data_source_id" INTEGER NOT NULL,
DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "user_important_measurement_preference_pkey" PRIMARY KEY ("data_source_id", "user_id");

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
