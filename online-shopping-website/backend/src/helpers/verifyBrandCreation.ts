export default function hasRequiredBrandCreationParams(args: { name: string; description: string }) {
  return args.name !== undefined && args.description !== undefined;
}
