-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT,
    "type" TEXT NOT NULL,
    "thumb_nail_url" TEXT,
    "excerpt" TEXT,
    "content_path" TEXT NOT NULL,
    "md5_hash" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "publish_date" TIMESTAMP(3),
    "like" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_content_path_key" ON "posts"("content_path");

-- CreateIndex
CREATE INDEX "posts_content_path_idx" ON "posts"("content_path");
