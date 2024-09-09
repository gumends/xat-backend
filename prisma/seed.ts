import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'
const prisma = new PrismaClient()
async function main() {
  const firstLogin = await prisma.usersEntity.upsert({
    where: { id: randomUUID() },
    update: {},
    create: {
      email: 'inicial@inicial.io',
      firstName: 'nome',
      lastName: 'sobrenome',
      password: await hash('123', 10),
      avatar: 'https://github.com/gumends.png'
    },
  })
  console.log({ firstLogin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })