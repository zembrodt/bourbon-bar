-- CreateTable
CREATE TABLE "Bourbon" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bar" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BarToBourbon" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bar.ownerId_unique" ON "Bar"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_BarToBourbon_AB_unique" ON "_BarToBourbon"("A", "B");

-- CreateIndex
CREATE INDEX "_BarToBourbon_B_index" ON "_BarToBourbon"("B");

-- AddForeignKey
ALTER TABLE "Bar" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BarToBourbon" ADD FOREIGN KEY ("A") REFERENCES "Bar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BarToBourbon" ADD FOREIGN KEY ("B") REFERENCES "Bourbon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
