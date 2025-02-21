"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type/productType";
import Container from "../components/navbar/Container";
import CartItem from "../components/cartItem/CartItem";
import { Button } from "react-bootstrap";
import { resetCart } from "@/redux/shoppingSlice";
import PaymentForm from "../components/paymentForm/PaymentForm";
import Link from "next/link";
import { FaMartiniGlassEmpty } from "react-icons/fa6";

const CartPage = () => {
  const { productData } = useSelector((state: StateProps) => state.shopping);
  const dispatch = useDispatch();
  return (
    <Container>
      {productData.length > 0 ? (
        <Container>
          <h2 className="text-2xl font-semibold mb-2">Your Cart</h2>
          <div className="flex flex-col gap-5">
            <CartItem />
            <div className="flex items-center justify-end">
              <Button
                onClick={() => dispatch(resetCart())}
                className="bg-red-500 text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-700 hover:text-white duration-300 rounded-lg"
              >
                reset cart
              </Button>
            </div>
            <PaymentForm />
          </div>
        </Container>
      ) : (
        <div className="flex flex-col items-center justify-between gap-y-8 text-center">
          <FaMartiniGlassEmpty className="text-lightText text-9xl" />
          <p className="text-2xl">Your cart is empty.</p>
          <Link href="/menu">
            <Button className="bg-lightText hover:bg-link hover:text-darkText duration-300 transition-colors rounded-lg text-white px-4 py-2">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
