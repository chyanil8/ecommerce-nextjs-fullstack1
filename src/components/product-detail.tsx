"use client";
import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
interface Props {
    product: Stripe.Product;
}


export const ProductDetail = ({ product }: Props) => {
    const {items, addItem, removeItem, clearCart} = useCartStore();
    const cartItem = items.find((item) => item.id ===product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const price = product.default_price as Stripe.Price;
    
    const onAddItem = () => {
       addItem({
        id:product.id,
        name:product.name,
        price:price.unit_amount as number,
        imageUrl:product.images? product.images[0]: null,
        quantity:1,
       }) 
    }
    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
            <Link
                href="/products"
                className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden>
                    &larr;
                </span>
                Back to products
            </Link>
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            {product.images && product.images[0] && (
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-foreground/10">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-opacity duration-300 hover:opacity-90"
                    />
                </div>
            )}
            <div className="flex flex-col">
                {quantity > 0 && (
                    <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {quantity} in your cart
                    </span>
                )}

                <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    {product.name}
                </h1>

                {price && price.unit_amount && (
                    <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">
                        ${(price.unit_amount / 100).toFixed(2)}
                    </p>
                )}

                {product.description && (
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                        {product.description}
                    </p>
                )}

                <div className="my-7 h-px w-full bg-border" />

                <div className="flex flex-col gap-3">
                    <span className="text-sm font-medium text-foreground">Quantity</span>
                    <div className="flex w-fit items-center gap-2 rounded-xl border border-border bg-muted/30 p-1.5">
                        <Button
                            onClick={() => removeItem(product.id)}
                            disabled={quantity === 0}
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Decrease quantity"
                        >
                            -
                        </Button>
                        <span className="w-10 text-center text-base font-semibold tabular-nums">
                            {quantity}
                        </span>
                        <Button
                            onClick={onAddItem}
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Increase quantity"
                        >
                            +
                        </Button>
                    </div>

                    {price && price.unit_amount && quantity > 0 && (
                        <p className="text-sm text-muted-foreground">
                            Subtotal:{" "}
                            <span className="font-semibold text-foreground">
                                ${((price.unit_amount * quantity) / 100).toFixed(2)}
                            </span>
                        </p>
                    )}
                </div>
            </div>
            </div>
        </div>
    )
}