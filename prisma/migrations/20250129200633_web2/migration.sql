-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT,
    "bio" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "link_externo" TEXT NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palavra_Chave" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "Palavra_Chave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conhecimento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,

    CONSTRAINT "Conhecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserConhecimento" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "conhecimentoId" INTEGER NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserConhecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userProjetos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjetoPalavrasChaves" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Conhecimento_titulo_key" ON "Conhecimento"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "_userProjetos_AB_unique" ON "_userProjetos"("A", "B");

-- CreateIndex
CREATE INDEX "_userProjetos_B_index" ON "_userProjetos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjetoPalavrasChaves_AB_unique" ON "_ProjetoPalavrasChaves"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjetoPalavrasChaves_B_index" ON "_ProjetoPalavrasChaves"("B");

-- AddForeignKey
ALTER TABLE "UserConhecimento" ADD CONSTRAINT "UserConhecimento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConhecimento" ADD CONSTRAINT "UserConhecimento_conhecimentoId_fkey" FOREIGN KEY ("conhecimentoId") REFERENCES "Conhecimento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userProjetos" ADD CONSTRAINT "_userProjetos_A_fkey" FOREIGN KEY ("A") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userProjetos" ADD CONSTRAINT "_userProjetos_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjetoPalavrasChaves" ADD CONSTRAINT "_ProjetoPalavrasChaves_A_fkey" FOREIGN KEY ("A") REFERENCES "Palavra_Chave"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjetoPalavrasChaves" ADD CONSTRAINT "_ProjetoPalavrasChaves_B_fkey" FOREIGN KEY ("B") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
