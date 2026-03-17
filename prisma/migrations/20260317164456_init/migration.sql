-- CreateEnum
CREATE TYPE "VisistedUrlStatus" AS ENUM ('PENDING', 'VISITED', 'FAILED');

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "links" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvertedIndex" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InvertedIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitedUrls" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "VisistedUrlStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitedUrls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_url_key" ON "Document"("url");

-- CreateIndex
CREATE INDEX "InvertedIndex_word_idx" ON "InvertedIndex"("word");

-- CreateIndex
CREATE UNIQUE INDEX "VisitedUrls_url_key" ON "VisitedUrls"("url");

-- CreateIndex
CREATE INDEX "VisitedUrls_url_idx" ON "VisitedUrls"("url");

-- AddForeignKey
ALTER TABLE "InvertedIndex" ADD CONSTRAINT "InvertedIndex_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
