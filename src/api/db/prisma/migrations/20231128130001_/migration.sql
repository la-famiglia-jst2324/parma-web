/*
  Warnings:

  - A unique constraint covering the columns `[auth_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "auth_id" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_id_key" ON "user"("auth_id");
