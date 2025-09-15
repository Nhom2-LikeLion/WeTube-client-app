"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

// Component PaymentResult ngay trong file này
interface PaymentResultProps {
  paymentStatus: string | null;
  orderId: string | null;
}

const PaymentResult: React.FC<PaymentResultProps> = ({ paymentStatus, orderId }) => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Payment Result</h1>
      <p>Status: {paymentStatus}</p>
      <p>Order ID: {orderId}</p>
      <p>Trang sẽ tự động chuyển về Home sau 5 giây...</p>
    </div>
  );
};

// Page Next.js
export default function PremiumResultPage() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("paymentStatus");
  const orderId = searchParams.get("orderId");

  return <PaymentResult paymentStatus={paymentStatus} orderId={orderId} />;
}
