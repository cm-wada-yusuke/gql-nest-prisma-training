-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
