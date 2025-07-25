"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // icon mũi tên

const faqs = [
  {
    question: "Gói YouTube Premium có những gì?",
    answer: (
      <>
        <p>
          Khi là thành viên YouTube Premium, bạn có thể xem video không có quảng cáo trên YouTube. Hơn nữa, bạn có thể tải video xuống để xem không cần mạng và phát video trong nền khi dùng các ứng dụng khác.
        </p>
        <p className="mt-2">
          Gói thành viên YouTube Premium bao gồm cả quyền sử dụng YouTube Music Premium. Hãy tải ứng dụng YouTube Music xuống để nghe hơn 100 triệu bài hát không có quảng cáo, không cần mạng và khi khoá màn hình.
        </p>
        <p className="mt-2">
          Bạn cũng có thể xem video không có quảng cáo trên ứng dụng YouTube Kids.
        </p>
      </>
    ),
  },
  {
    question: "Làm cách nào để tải video và nhạc xuống?",
    answer: (
      <>
        <p>
          Bạn có thể tải video/nhạc xuống thiết bị di động khi sử dụng ứng dụng YouTube, YouTube Music hoặc YouTube Kids. Còn trên máy tính, bạn cũng có thể xem và tải video bằng trình duyệt Chrome, Edge và Opera.
        </p>
        <p className="mt-2">
          Bạn có thể xem hoặc nghe nội dung không cần mạng trong tối đa 30 ngày không có kết nối Internet.
        </p>
        <a
          href="https://support.google.com/youtube/answer/6141269"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-600 underline"
        >
          Tìm hiểu thêm về cách xem video không cần mạng
        </a>
      </>
    ),
  },
  {
    question: "Làm cách nào để thêm người khác vào gói của tôi?",
    answer: (
      <>
        <p>
          Bạn có thể thêm thành viên YouTube Premium dành cho gia đình để chia sẻ với tối đa 5 thành viên khác trong gói gia đình. Khi mua gói dành cho gia đình, bạn có thể thêm thành viên nếu bạn là người quản lý gia đình.
        </p>
        <p className="mt-2">
          Các thành viên gia đình dùng chung gói dành cho gia đình phải cùng hỗ trợ gia đình hoặc có tài khoản Google trong nhóm gia đình.
        </p>
        <a
          href="https://support.google.com/youtube/answer/6305528"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-600 underline"
        >
          Tìm hiểu thêm về gói dành cho gia đình
        </a>
      </>
    ),
  },
  {
    question: "Làm cách nào để phát nhạc và video trong nền?",
    answer: (
      <>
        <p>
          Khi bạn dùng gói YouTube Premium, tính năng phát trong nền sẽ bật theo mặc định trên YouTube, YouTube Music và YouTube Kids. Điều này có nghĩa là nếu bạn xem video trên YouTube và mở ứng dụng khác, video vẫn tiếp tục phát trong nền cho đến khi bạn tạm dừng video.
        </p>
        <p className="mt-2">
          Bạn có thể tắt tính năng phát trong nền ở phần cài đặt.
        </p>
        <a
          href="https://support.google.com/youtube/answer/7548453"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-600 underline"
        >
          Tìm hiểu thêm về tính năng Phát trong nền
        </a>
      </>
    ),
  },
  {
    question: "YouTube Premium có gì khác so với YouTube Music Premium?",
    answer: (
      <>
        <p>
          Thông qua YouTube Premium, bạn có thể xem video trên ứng dụng YouTube mà không có quảng cáo, không cần mạng và trong nền.
        </p>
        <p className="mt-2">
          Gói thành viên YouTube Premium bao gồm cả quyền sử dụng YouTube Music Premium. Hãy tải ứng dụng YouTube Music xuống để nghe hơn 100 triệu bài hát không có quảng cáo, không cần mạng và khi khoá màn hình.
        </p>
        <a
          href="https://support.google.com/youtube/answer/6305537"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-600 underline"
        >
          Tìm hiểu thêm về YouTube Music
        </a>
      </>
    ),
  },
  {
    question: "Làm cách nào để hủy gói thành viên?",
    answer: (
      <>
        <p>
          Bạn có thể huỷ gói thành viên bằng cách chuyển đến trang{" "}
          <a
            href="https://www.youtube.com/paid_memberships"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Gói thành viên có tính phí
          </a>. Bạn có thể mua lại gói YouTube Premium bất cứ lúc nào.
        </p>
      </>
    ),
  },
];

export default function PremiumFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
  <section className="w-full max-w-7xl bg-gray-100 rounded-4xl p-6 sm:p-10 mx-auto my-12 min-h-[700px]">
    <div className="text-left">
      <h2 className="text-4xl font-bold mb-6">Giải đáp các câu hỏi của bạn</h2>

      <div className="divide-y divide-gray-300">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full text-left py-5 flex justify-between items-center font-medium text-lg"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-[1000px] pb-4 text-sm text-gray-700"
                  : "max-h-0"
              }`}
            >
              {openIndex === index && <div className="pl-1">{faq.answer}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm">
        Bạn có thắc mắc?{" "}
        <a
          href="https://support.google.com/youtube"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Trung tâm trợ giúp YouTube
        </a>
      </div>
    </div>
  </section>
);
};
