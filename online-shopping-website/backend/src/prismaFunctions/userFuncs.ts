import prisma from './PrismaClient';
import { UserRole } from '@prisma/client';

export async function createUser(args: {
  pWord: string;
  email: string;
  role: UserRole;
  address1: string;
  uName?: string;
  firstName?: string;
  lastName?: string;
  sellerName?: string;
}) {
  return await prisma.user.create({
    data: {
      username: args.uName,
      password: args.pWord,
      email: args.email,
      role: args.role,
      address1: args.address1,
      firstName: args.firstName,
      lastName: args.lastName,
      sellerName: args.sellerName,
    },
  });
}

export async function updateUser(args: {
  userId: number;
  pWord?: string;
  email?: string;
  role?: UserRole;
  address1?: string;
  uName?: string;
  firstName?: string;
  lastName?: string;
  sellerName?: string;
}) {
  return await prisma.user.update({
    where: {
      id: args.userId,
    },
    data: {
      username: args.uName,
      password: args.pWord,
      email: args.email,
      role: args.role,
      address1: args.address1,
      firstName: args.firstName,
      lastName: args.lastName,
      sellerName: args.sellerName,
    },
  });
}

export async function userById(args: { id: number }) {
  return await prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
}

export async function userByEmail(args: { email: string }) {
  return await prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });
}

export async function allSellers(){
  return await prisma.user.findMany({
    where: {
      role: UserRole.SELLER
    }
  })
}

export async function allUsers() {
  return await prisma.user.findMany();
}

export async function deactivateUser(args: { id: number }) {
  return await prisma.user.update({
    where: {
      id: args.id
    },
    data: {
      active : false
    }
  })
}