-- CreateTable
CREATE TABLE "sessao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id_I" TEXT NOT NULL,
    "usuario_id_II" TEXT NOT NULL,
    CONSTRAINT "sessao_usuario_id_I_fkey" FOREIGN KEY ("usuario_id_I") REFERENCES "usersEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessao_usuario_id_II_fkey" FOREIGN KEY ("usuario_id_II") REFERENCES "usersEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "conversas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "texto" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "sessao_id" TEXT NOT NULL,
    CONSTRAINT "conversas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usersEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "conversas_sessao_id_fkey" FOREIGN KEY ("sessao_id") REFERENCES "sessao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
