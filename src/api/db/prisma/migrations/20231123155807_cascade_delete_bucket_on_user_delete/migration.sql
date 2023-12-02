-- DropForeignKey
ALTER TABLE "bucket" DROP CONSTRAINT "bucket_owner_id_fkey";

-- AddForeignKey
ALTER TABLE "bucket" ADD CONSTRAINT "bucket_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
