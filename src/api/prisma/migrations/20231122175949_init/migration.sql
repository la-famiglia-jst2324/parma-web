/*
  Warnings:

  - Changed the type of `permission` on the `bucket_access` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `file_type` on the `company_attachment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `frequency` on the `company_data_source` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `health_status` on the `company_data_source` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `default_frequency` on the `data_source` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `health_status` on the `data_source` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `entity_type` on the `notification_channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `channel_type` on the `notification_channel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "entity_type" AS ENUM ('NOTIFICATION', 'REPORT');

-- CreateEnum
CREATE TYPE "channel_type" AS ENUM ('EMAIL', 'SLACK');

-- CreateEnum
CREATE TYPE "file_type" AS ENUM ('TEXT', 'JPG', 'PDF');

-- CreateEnum
CREATE TYPE "health_status" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "frequency" AS ENUM ('DAILY', 'WEEKLY');

-- CreateEnum
CREATE TYPE "bucket_permission" AS ENUM ('VIEWER', 'MODERATOR');

-- AlterTable
ALTER TABLE "bucket_access" DROP COLUMN "permission",
ADD COLUMN     "permission" "bucket_permission" NOT NULL;

-- AlterTable
ALTER TABLE "company_attachment" DROP COLUMN "file_type",
ADD COLUMN     "file_type" "file_type" NOT NULL;

-- AlterTable
ALTER TABLE "company_data_source" DROP COLUMN "frequency",
ADD COLUMN     "frequency" "frequency" NOT NULL,
DROP COLUMN "health_status",
ADD COLUMN     "health_status" "health_status" NOT NULL;

-- AlterTable
ALTER TABLE "data_source" DROP COLUMN "default_frequency",
ADD COLUMN     "default_frequency" "frequency" NOT NULL,
DROP COLUMN "health_status",
ADD COLUMN     "health_status" "health_status" NOT NULL;

-- AlterTable
ALTER TABLE "notification_channel" DROP COLUMN "entity_type",
ADD COLUMN     "entity_type" "entity_type" NOT NULL,
DROP COLUMN "channel_type",
ADD COLUMN     "channel_type" "channel_type" NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "role" NOT NULL;

-- DropEnum
DROP TYPE "BucketPermission";

-- DropEnum
DROP TYPE "ChannelType";

-- DropEnum
DROP TYPE "EntityType";

-- DropEnum
DROP TYPE "FileType";

-- DropEnum
DROP TYPE "Frequency";

-- DropEnum
DROP TYPE "HealthStatus";

-- DropEnum
DROP TYPE "Role";
