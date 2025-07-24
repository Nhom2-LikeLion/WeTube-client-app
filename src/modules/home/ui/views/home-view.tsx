"use client";

import { useState } from "react";
import { FilterCarousel } from "@/components/filter-carousel";

type HomeViewProps = {
    categoryId : string;
}

export default function HomeView({categoryId }: HomeViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId );

  // Giả lập dữ liệu categories
  const categories = [
    { value: "music", label: "Âm nhạc" },
    { value: "games", label: "Trò chơi" },
    { value: "news", label: "Tin tức" },
    { value: "sports", label: "Thể thao" },
    { value: "education", label: "Giáo dục" },
    { value: "entertainment", label: "Giải trí" },
    { value: "technology", label: "Công nghệ" },
    { value: "lifestyle", label: "Đời sống" },
    { value: "travel", label: "Du lịch" },
    { value: "food", label: "Ẩm thực" },
    { value: "fashion", label: "Thời trang" },
    { value: "finance", label: "Tài chính" },
    { value: "health", label: "Sức khỏe" },
    { value: "science", label: "Khoa học" },
    { value: "automotive", label: "Ô tô - Xe máy" },
    { value: "movies", label: "Phim ảnh" },
    { value: "kids", label: "Thiếu nhi" },
    ];
    

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Danh mục</h1>
      <FilterCarousel
        value={selectedCategory}
        onSelect={(value) => setSelectedCategory(value)}
        data={categories}
        isLoading={false}
      />

      {/* Hiển thị kết quả chọn */}
      <div className="mt-6">
        <p>
          Đã chọn danh mục:{" "}
          <span className="font-semibold text-blue-600">
            {selectedCategory || "Tất cả"}
          </span>
        </p>
      </div>
    </div>
  );
}
