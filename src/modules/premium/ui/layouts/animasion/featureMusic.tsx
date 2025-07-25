"use client";
import { useEffect, useState } from "react";

export default function FeatureMusic() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <section className="w-full px-4 py-8 md:py-12 bg-[#0F0F0F] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          {isLoading ? (
            <div className="h-8 w-60 bg-gray-700 rounded animate-pulse" />
          ) : (
            <h2 className="text-2xl md:text-3xl font-semibold">
              Ứng dụng Âm nhạc nổi bật
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) =>
            isLoading ? (
              <div
                key={index}
                className="h-40 bg-gray-800 rounded-lg animate-pulse"
              />
            ) : (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-lg overflow-hidden shadow-md hover:scale-[1.01] transition-transform duration-200"
              >
                <img
                  src={`https://picsum.photos/400/200?random=${index}`}
                  alt={`Ảnh ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">Tên ứng dụng {index + 1}</h3>
                  <p className="text-sm text-gray-400">Mô tả ngắn gọn ở đây.</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
