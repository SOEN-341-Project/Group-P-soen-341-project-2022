export default function hasRequiredBrandCreationParams(args: { name: string }) {
  return args.name !== undefined;
}
