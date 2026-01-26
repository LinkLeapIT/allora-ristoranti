import { ProductStatus } from "@/types";
import { Badge } from "./ui/badge";

const statusLabel = {
    available: "Available",
    unavailable: "Unavailable",
    hidden: "Hidden",
};

const variant: {
  [key: string]: "default" | "destructive" | "secondary" | "outline";
} = {
    available: "default",
    unavailable: "destructive",
    hidden: "secondary",
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
