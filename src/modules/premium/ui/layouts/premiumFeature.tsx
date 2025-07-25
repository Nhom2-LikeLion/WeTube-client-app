"use client";
import { ExternalLink, GraduationCap, User, Users } from "lucide-react";

const plans = [
  {
    icon: <User className="w-6 h-6 text-blue-600" />,
    title: "Cá nhân",
    price: "79.000 ₫/tháng",
    description: "Dùng thử 1 tháng với giá 0 ₫ • Không bao gồm thuế GTGT",
    extra: "Chưa bao gồm thuế GTGT. Có áp dụng quy định hạn chế.",
    button: "Dùng thử 1 tháng với giá 0 ₫",
    active: true,
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Gia đình",
    price: "149.000 ₫/tháng",
    description: "Dùng thử 1 tháng với giá 0 ₫ • Không bao gồm thuế GTGT",
    extra:
      "Thêm tối đa 5 thành viên gia đình (từ 13 tuổi trở lên). Có áp dụng quy định hạn chế.",
    button: "Dùng thử 1 tháng với giá 0 ₫",
    active: false,
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    title: "Sinh viên",
    price: "49.000 ₫/tháng",
    description: "Dùng thử 1 tháng với giá 0 ₫ • Không bao gồm thuế GTGT",
    extra:
      "Chỉ cho sinh viên đủ điều kiện. Yêu cầu xác minh hằng năm. Có áp dụng quy định hạn chế.",
    button: (
      <>
        <ExternalLink className="w-4 h-4 mr-1 inline" />
        Dùng thử 1 tháng với giá 0 ₫
      </>
    ),
    active: false,
  },
];

export default function PremiumFeatures() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
          Tham gia cùng hơn 125 triệuthành viên Premium
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.02] ${
              plan.active
                ? "border border-blue-500 bg-white"
                : "border border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              {plan.icon}
              <h3 className="text-xl font-semibold">{plan.title}</h3>
            </div>

            <p className="text-lg font-bold text-gray-900 mb-2">
              {plan.price}
            </p>
            <p className="text-sm text-gray-700 mb-1">{plan.description}</p>
            <p className="text-xs text-gray-500 mb-4">{plan.extra}</p>

            <button
              className={`w-full rounded-full px-4 py-2 text-sm font-medium transition ${
                plan.active
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}



