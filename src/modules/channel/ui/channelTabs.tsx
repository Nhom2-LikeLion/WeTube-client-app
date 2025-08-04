// "use client";

// import { useState } from "react";

// const tabs = ["Trang chủ", "Video", "Danh sách phát", "Bài đăng"];

// export default function ChannelTabs() {
//   const [active, setActive] = useState("Trang chủ");

//   return (
//     <div className="border-b border-gray-300 p-4 pt-0 pb-0">
//       <ul className="flex gap-6 text-sm font-medium text-gray-600">
//         {tabs.map((tab) => (
//           <li
//             key={tab}
//             className={`cursor-pointer pb-2 ${
//               active === tab ? "text-black border-b-2 border-black" : ""
//             }`}
//             onClick={() => setActive(tab)}
//           >
//             {tab}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// modules/channel/ui/channelTabs.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { label: "Trang chủ", slug: "" },
  { label: "Video", slug: "videos" },
  { label: "Danh sách phát", slug: "playlists" },
  { label: "Bài đăng", slug: "posts" },
];

export default function ChannelTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = pathname.split("/").pop();

  const handleTabClick = (slug: string) => {
    router.push(`/users/abc/${slug}`);
  };

  return (
    <div className="border-b border-gray-300 px-6 pt-0 pb-0">
      <ul className="flex gap-6 text-sm font-medium text-gray-600">
        {tabs.map((tab) => (
          <li
            key={tab.slug}
            onClick={() => handleTabClick(tab.slug)}
            className={`cursor-pointer pb-2 ${
              (tab.slug === "" && currentTab === "channel") ||
              currentTab === tab.slug
                ? "text-black border-b-2 border-black"
                : ""
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
