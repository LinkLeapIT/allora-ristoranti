"use client"

import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../../../type";
import { getTotalCost, resetCart, saveOrder } from "@/redux/shoppingSlice";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const PaymentForm = () => {
    const [subtotal, setSubtotal] = useState<number>(0);
    const { productData, userInfo } = useSelector((state: StateProps) => state.shopping);
    const dispatch = useDispatch();

    useEffect(() => {
        const totalCost = getTotalCost({ productData, userInfo, orderData: [] });
        setSubtotal(totalCost);
    }, [productData, userInfo]);

    // ============================  Stripe payment start here ==========================
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const { currentUser } = useAuthContext();
    
    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    products: productData,
                    email: currentUser?.email,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                await dispatch(saveOrder({ order: productData, id: data.id }));
                stripe?.redirectToCheckout({ sessionId: data.id });
                dispatch(resetCart());
            } else {
                console.error("Checkout failed:", data);
                throw new Error("Failed to create Stripe Payment");
            }
        } catch (error) {
            console.error("An error occurred during checkout:", error);
        }
    };
    // ============================  Stripe payment end here ==========================

    return (
        <div className="w-full bg-white">
            <h2>Cart Totals</h2>
            <div className="border-b-[1px] border-b-slate-300 py-2">
                <div className="max-w-lg flex items-center justify-between">
                    <p className="uppercase font-medium">Subtotal</p>
                    <p>{subtotal.toFixed(2)} €</p>
                </div>
            </div>
            {userInfo ? (
                <Button onClick={handleCheckout} className="bg-darkText rounded-lg text-slate-100 mt-4 py-3 px-6 hover:bg-[#1e1e1e] cursor-pointer duration-300">Proceed to checkout</Button>
            ) : (
                <div>
                    <Button className="bg-darkText rounded-lg text-slate-100 mt-4 py-3 px-6 cursor-not-allowed">Proceed to checkout</Button>
                    <p className="text-base mt-1 text-red-500 font-semibold animate-bounce">Please login to continue</p>
                </div>
            )}
        </div>
    );
}

export default PaymentForm;
