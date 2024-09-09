-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usersEntity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_usersEntity" ("avatar", "created_at", "email", "firstName", "id", "lastName", "password", "updated_at") SELECT "avatar", "created_at", "email", "firstName", "id", "lastName", "password", "updated_at" FROM "usersEntity";
DROP TABLE "usersEntity";
ALTER TABLE "new_usersEntity" RENAME TO "usersEntity";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
