-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sessao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id_I" TEXT NOT NULL,
    "usuario_id_II" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "sessao_usuario_id_I_fkey" FOREIGN KEY ("usuario_id_I") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessao_usuario_id_II_fkey" FOREIGN KEY ("usuario_id_II") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "conversas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "texto" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "sessao_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "conversas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "conversas_sessao_id_fkey" FOREIGN KEY ("sessao_id") REFERENCES "sessao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
