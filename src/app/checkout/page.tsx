"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
    const { items, removeItem, addItem, clearCart } = useCartStore();

    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    if (total === 0 || items.length === 0) {
        return (
            <div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center gap-4 px-4 py-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-muted text-3xl">
                    🛒
                </div>
                <h1 className="font-heading text-2xl font-semibold tracking-tight">
                    Your cart is empty
                </h1>
                <p className="text-sm text-muted-foreground">
                    Looks like you haven&apos;t added anything yet. Browse our
                    products and find something you love.
                </p>
                <Button asChild size="lg" className="mt-2">
                    <Link href="/products">Continue shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Checkout
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Review your order before proceeding to payment.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Order Summary</span>
                            <span className="text-sm font-normal text-muted-foreground">
                                {items.reduce((n, i) => n + i.quantity, 0)} item
                                {items.reduce((n, i) => n + i.quantity, 0) === 1
                                    ? ""
                                    : "s"}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="divide-y divide-border">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                                >
                                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/10">
                                        {item.imageUrl ? (
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                sizes="64px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-full items-center justify-center text-muted-foreground">
                                                📦
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium">
                                            {item.name}
                                        </p>
                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            ${(item.price / 100).toFixed(2)} each
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1 rounded-lg border border-border p-1">
                                        <Button
                                            onClick={() => removeItem(item.id)}
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </Button>
                                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            onClick={() =>
                                                addItem({ ...item, quantity: 1 })
                                            }
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <span className="w-20 text-right text-sm font-semibold tabular-nums">
                                        $
                                        {(
                                            (item.price * item.quantity) /
                                            100
                                        ).toFixed(2)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="lg:sticky lg:top-8">
                    <CardHeader>
                        <CardTitle>Payment</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Subtotal</span>
                            <span className="tabular-nums">
                                ${(total / 100).toFixed(2)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="h-px w-full bg-border" />
                        <div className="flex items-center justify-between text-base font-semibold">
                            <span>Total</span>
                            <span className="tabular-nums">
                                ${(total / 100).toFixed(2)}
                            </span>
                        </div>

                        <form action={checkoutAction} className="mt-2">
                            <input
                                type="hidden"
                                name="items"
                                value={JSON.stringify(items)}
                            />
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                            >
                                Proceed to Payment
                            </Button>
                        </form>

                        <Button
                            type="button"
                            onClick={() => clearCart()}
                            variant="outline"
                            className="w-full"
                        >
                            Clear Cart
                        </Button>

                        <p className="text-center text-xs text-muted-foreground">
                            🔒 Secure checkout powered by Stripe
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
