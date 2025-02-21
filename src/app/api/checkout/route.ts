// pages/api/checkout.ts
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { Products } from "../../../type/productType";

export const POST = async (request: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20", // Update to the correct version supported by your Stripe package
  });
  try {
    const reqBody = await request.json();
    const { products, email } = reqBody;

    const extractingItems = products.map((product: Products) => {
      // Get the base price from the selected size
      const size = product.sizes.find(
        (size) => size.size === product.options.size
      );
      const basePrice = size ? size.price : 0;

      // Calculate the price of extra ingredients
      const extraIngredientsPrice = product.options.extraIngredients.reduce(
        (acc: number, ingredient: string) => {
          const extraIngredient = product.extraIngredients.find(
            (item) => item.ingredient === ingredient
          );
          return acc + (extraIngredient ? extraIngredient.price : 0);
        },
        0
      );

      const unit_amount = Math.round((basePrice + extraIngredientsPrice) * 100); // Ensure unit_amount is an integer

      return {
        quantity: product.quantity,
        price_data: {
          currency: "EUR",
          unit_amount: unit_amount,
          product_data: {
            name: product.title,
            description: product.description,
            images: [product.path || "fallback-image-url"],
            metadata: {
              size: product.options.size,
              extraIngredients: JSON.stringify(
                product.options.extraIngredients
              ),
              withoutOptions: JSON.stringify(product.options.withoutOptions),
            },
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      metadata: {
        email,
      },
    });

    return NextResponse.json({
      message: "Connection is active",
      success: true,
      id: session.id,
    });
  } catch (error: any) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
