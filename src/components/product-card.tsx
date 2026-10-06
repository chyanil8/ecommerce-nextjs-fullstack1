import Link from "next/link";
import Stripe from "stripe";
import Image from "next/image";
import { ArrowRight, ImageOff } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { cn } from "cn";

interface Props {
    product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
    const price = product.default_price as Stripe.Price;
    const image = product.images?.[0];
    const formattedPrice =
        price?.unit_amount != null
            ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: price.currency ?? "usd",
              }).format(price.unit_amount / 100)
            : null;

    return (
        <Link
            href={`/products/${product.id}`}
            className="block h-full focus-visible:outline-none"
            aria-label={`View details for ${product.name}`}
        >
            <Card className="h-full gap-0 py-0 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-ring hover:-translate-y-1 hover:shadow-2xl hover:ring-foreground/20">
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    {image ? (
                        <Image
                            src={image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <ImageOff className="size-10" />
                        </div>
                    )}

                    {/* Subtle gradient for depth + price readability */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

                    {formattedPrice && (
                        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm">
                            {formattedPrice}
                        </span>
                    )}
                </div>

                <CardContent className="flex-1 gap-1.5 py-5">
                    <h3 className="font-heading text-base font-medium leading-snug line-clamp-1">
                        {product.name}
                    </h3>
                    {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="pb-5">
                    <span
                        className={cn(
                            buttonVariants({ variant: "default", size: "default" }),
                            "w-full"
                        )}
                    >
                        View Details
                        <ArrowRight className="transition-transform duration-300 group-hover/card:translate-x-0.5" />
                    </span>
                </CardFooter>
            </Card>
        </Link>
    );
};
