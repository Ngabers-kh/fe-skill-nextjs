import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET || "", // pakai SERVER KEY
});

export async function POST(request: Request) {
  try {
    const { id, productName, price, quantity, qusName, qusEmail } = await request.json();

    // order_id harus unik
    const orderId = `ORDER-${id}-${Date.now()}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: price * quantity,
      },
      item_details: [
        {
          id,
          name: productName,
          price,
          quantity,
        },
      ],
      customer_details: {
        first_name: qusName,
        email: qusEmail,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    console.log("Midtrans Snap Token:", transaction.token);
    return NextResponse.json({ token: transaction.token });
  } catch (error: any) {
    console.error("Midtrans Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to create transaction" },
      { status: 500 }
    );
  }
}
