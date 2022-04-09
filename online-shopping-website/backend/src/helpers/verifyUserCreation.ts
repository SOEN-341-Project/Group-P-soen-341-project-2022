import { UserRole } from '@prisma/client';

export default function hasRequiredUserCreationParams(args: {
  email: string;
  password: string;
  role: string;
  address1: string;
}): boolean {
  if (args.role === undefined) return false;
  const role: string = args.role.toUpperCase();
  return (
    (role === UserRole.CUSTOMER || role === UserRole.SELLER || role === UserRole.ADMIN) &&
    args.email !== undefined &&
    args.password !== undefined &&
    args.address1 !== undefined
  );
}
