export default function hasRequiredItemCreationParams(args: {
  name: string;
  price: number;
  description: string;
  picture: Express.Multer.File | undefined;
  brandId: number;
  sellerId: number;
}) {
  return (
    args.name !== undefined &&
    args.price > 0 &&
    args.description !== undefined &&
    (args.picture?.mimetype == "image/jpeg" ||
      args.picture?.mimetype == "image/png" ||
      args.picture?.mimetype == "image/tiff" ||
      args.picture?.mimetype == "image/webp") &&
    args.brandId >= 0 &&
    args.sellerId >= 0
  );
}
