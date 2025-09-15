"use client";

import PaymentButton from "./PaymentButton";

export default function PremiumTrialBanner() {
  return (
    <section className="text-center py-20 px-4 bg-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        Thử Premium ngay
      </h1>

      <p className="text-lg sm:text-xl text-gray-800 mb-6">
        Dùng thử 1 tháng với giá 0 ₫ • Sau đó là 79.000 ₫/tháng • Không bao gồm thuế GTGT • Hủy bất cứ lúc nào
      </p>

      <PaymentButton/>

      <div className="text-sm text-gray-500 mt-6">
        Thanh toán định kỳ.{" "}
        <a
          href="#"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Có áp dụng quy định hạn chế.
        </a>
      </div>
    </section>
  );
}
