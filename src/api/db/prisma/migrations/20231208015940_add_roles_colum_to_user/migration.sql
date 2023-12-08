-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roles" "role"[] DEFAULT ARRAY['USER']::"role"[];
