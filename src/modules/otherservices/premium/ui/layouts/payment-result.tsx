"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type PaymentStatus = {
  success: boolean;
  orderId: string;
};

export default function PaymentResult() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resultCode = params.get("resultCode");
    const orderId = params.get("orderId");

    if (!orderId || !resultCode) return;

    if (resultCode === "0") {
      // Thanh toán thành công
      fetch(`http://localhost:8080/api/payment/confirm?orderId=${orderId}`, {
        method: "POST",
      })
        .then(() => setStatus({ success: true, orderId }))
        .catch(() => setStatus({ success: false, orderId }))
        .finally(() => {
          setLoading(false);
          // Redirect sau 2 giây
          setTimeout(() => router.replace("/"), 2000);
        });
    } else {
      // Thanh toán thất bại
      setStatus({ success: false, orderId });
      setLoading(false);
      setTimeout(() => router.replace("/"), 2000);
    }
  }, [params, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Đang xử lý thanh toán...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
      {status?.success ? (
        <h1 className="text-green-600 text-2xl">Thanh toán thành công!</h1>
      ) : (
        <h1 className="text-red-600 text-2xl">Thanh toán thất bại!</h1>
      )}
      <p>Order ID: {status?.orderId}</p>
      <p>Trang sẽ tự động chuyển về Home sau vài giây...</p>
    </div>
  );
}
