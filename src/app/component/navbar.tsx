"use client";
import Link from "next/link";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const { items } = useCartStore();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    // Avoid a hydration mismatch: the persisted cart is only available on the client.
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b bg-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-lg font-semibold hover:text-blue-600">
                    My Ecommerce
                </Link>

                <div className="hidden space-x-6 md:flex">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/products" className="hover:text-blue-600">Products</Link>
                    <Link href="/checkout" className="hover:text-blue-600">Checkout</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/checkout" className="relative">
                        <ShoppingCartIcon className="h-6 w-6" />
                        {mounted && cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Button
                        variant="ghost"
                        className="md:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {mobileOpen && (
                <div className="border-t md:hidden">
                    <ul className="container mx-auto flex flex-col space-y-2 px-4 py-4">
                        <li>
                            <Link href="/" className="block hover:text-blue-600" onClick={() => setMobileOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/products" className="block hover:text-blue-600" onClick={() => setMobileOpen(false)}>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/checkout" className="block hover:text-blue-600" onClick={() => setMobileOpen(false)}>
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};
