import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.availableTriggers.create({
    data: {
      id: "trig01",
      name: "web-hook",
      icon: "https://www.svgrepo.com/show/451444/webhook.svg",
    },
  });

  await prisma.availableActions.create({
    data: {
      id: "act01",
      name: "solana",
      icon: "https://www.svgrepo.com/show/470684/solana.svg",
    },
  });
  await prisma.availableActions.create({
    data: {
      id: "act02",
      name: "email",
      icon: "https://www.svgrepo.com/show/491226/email.svg",
    },
  });
}

main();
