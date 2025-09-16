"use client";

import React, { useState } from 'react'

export default function PaymentButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/payment/momo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "e11ca899-6463-4706-90ff-63135fc4b6dd", 
          subPackId: "550e8400-e29b-41d4-a716-446655440000", 
        }),
      });

      if (!res.ok) throw new Error("Payment API failed");

      const data = await res.json();
      console.log("MoMo response:", data);

      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        alert("Không nhận được link thanh toán từ MoMo");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi tạo thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Đang xử lý..." : "Dùng thử 1 tháng với giá 0 ₫"}
    </button>
  );
}
