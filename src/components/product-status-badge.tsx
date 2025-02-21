import { ProductStatus } from "@/type/productType";
import { Badge } from "./ui/badge";

const statusLabel = {
    available: "Available",
    "sold out": "Sold out",
};

const variant: {
  [key: string]: "default" | "destructive" | "secondary" | "outline";
} = {
    available: "default",
    "sold out": "destructive",
};

export default function ProductStatusBadge({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  const label = statusLabel[status];
  return (
    <Badge variant={variant[status]} className={className}>
      {label}
    </Badge>
  );
}
