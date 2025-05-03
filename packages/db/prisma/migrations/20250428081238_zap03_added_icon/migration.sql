/*
  Warnings:

  - Added the required column `icon` to the `AvailableActions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `AvailableTriggers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableActions" ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AvailableTriggers" ADD COLUMN     "icon" TEXT NOT NULL;
