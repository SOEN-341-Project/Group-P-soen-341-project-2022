import prisma from './PrismaClient';
import { Brand } from '@prisma/client';
export async function createBrand(args: { name: string; description: string; picture?: string }) {
  return await prisma.brand.create({
    data: {
      name: args.name,
      description: args.description,
      picture: args.picture,
    },
  });
}

export async function updateBrand(args: { brandId: number; name?: string; description?: string; picture?: string }) {
  return await prisma.brand.update({
    where: {
      id: args.brandId,
    },
    data: {
      name: args.name,
      description: args.description,
      picture: args.picture,
    },
  });
}

export async function deleteBrand(args: { brandId: number }) {
  return await prisma.brand.delete({
    where: {
      id: args.brandId,
    },
  });
}

export async function brandById(args: { brandId: number }) {
  return await prisma.brand.findUnique({
    where: {
      id: args.brandId,
    },
  });
}

export async function brandByName(args: { name: string }) {
  return await prisma.brand.findMany({
    where: {
      name: {
        contains: args.name,
        mode: 'insensitive',
      },
    },
  });
}

export async function allBrands() {
  return await prisma.brand.findMany();
}

export async function deleteUnusedBrands() {
  const deletedBrands: Brand[] = [];
  const unusedBrands = await prisma.brand.findMany({
    include: {
      _count: {
        select:{items: true}
      },
    },
  });
  unusedBrands.forEach(async (brand) => {
    if(brand._count.items == 0){
      deletedBrands.push(await deleteBrand({brandId: brand.id}));
    }
  });
}
