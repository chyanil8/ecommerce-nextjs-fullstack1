"use client"
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage(){
    const {clearCart} = useCartStore()
    useEffect(() => {
        clearCart();
    }, [clearCart])
    return(
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
            <div className="flex w-full max-w-md flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Payment successful!
                </h1>
                <p className="mt-3 text-muted-foreground">
                    Thank you for your purchase. Your order is being processed and a
                    confirmation will be on its way shortly.
                </p>
                <Button asChild className="mt-8 rounded-full px-6">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    )
}
