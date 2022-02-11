/*
  Warnings:

  - You are about to drop the column `like` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "like";

-- CreateTable
CREATE TABLE "impressions" (
    "id" TEXT NOT NULL,
    "sticker" VARCHAR(10) NOT NULL,
    "comment" VARCHAR(1000),
    "twitter_id" VARCHAR(100),
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "impressions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "impressions" ADD CONSTRAINT "impressions_postId_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
