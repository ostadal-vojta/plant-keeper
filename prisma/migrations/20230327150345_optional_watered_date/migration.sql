/*
  Warnings:

  - Added the required column `amount` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,
    "watered" DATETIME,
    "interval" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "Plant_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Plant" ("id", "name", "placeId") SELECT "id", "name", "placeId" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
