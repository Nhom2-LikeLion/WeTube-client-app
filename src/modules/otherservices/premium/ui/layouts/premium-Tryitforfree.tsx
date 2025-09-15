"use client";

import Image from 'next/image';
import { useState } from 'react';
import PaymentButton from './PaymentButton';

const features = [
  {
    icon: "/icons/no-ads.png",
    title: "Xem YouTube không quảng cáo",
    desc: "để đắm chìm trong những video bạn yêu thích mà không bị gián đoạn",
  },
  {
    icon: "/icons/download.png",
    title: "Tải xuống",
    desc: "để xem khi bạn không có kết nối",
  },
  {
    icon: "/icons/background-play.png",
    title: "Phát trong nền",
    desc: "xem video khi dùng ứng dụng khác hoặc màn hình khoá",
  },
  {
    icon: "/icons/music.png",
    title: "Nghe nhạc không quảng cáo",
    desc: "trên ứng dụng YouTube Music",
  },
];

export default function PremiumTryitforfree() {

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center text-center px-4 py-20">
      <div className="max-w-3xl w-full flex flex-col items-center">
        {/* Logo và dòng chữ */}
        <div className="flex items-center justify-center gap-x-4 mb-6">
          {/* <img
            src="/image/Logo.png"
            alt="WeTube Premium"
            className="w-20 h-20 object-contain"
          /> */}
          <Image
            src="/image/Logo.png"
            alt="WeTube Premium"
            width={80}
            height={80}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-gray-800">
            WeTube Premium
          </span>
        </div>

        <p className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Tận hưởng trọn vẹn{" "}
          <span className="text-blue-600">WeTube Premium</span>
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Trải nghiệm WeTube và WeTube Music không quảng cáo, phát nền, và không
          cần mạng.
        </p>

        <p className="text-base text-gray-600 mb-2">
          Dùng thử 1 tháng với giá <strong>0 ₫</strong>. Sau đó chỉ{" "}
          <strong>79.000 ₫/tháng</strong> • Không bao gồm VAT • Hủy bất cứ lúc
          nào
        </p>

        <div className="mt-6">
          <PaymentButton/>
        </div>

        <p className="mt-4 text-sm text-blue-700 underline cursor-pointer hover:text-blue-900">
          Gói dành cho gia đình hoặc sinh viên
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 text-left px-4"
          >
            {/* <img
              src={feature.icon}
              alt={feature.title}
              className="w-12 h-12 object-contain"
            /> */}
            <Image
              src={feature.icon}
              alt={feature.title}
              width={48}
              height={48} 
              className="object-contain"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
