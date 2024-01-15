-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_company_id_fkey";

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
