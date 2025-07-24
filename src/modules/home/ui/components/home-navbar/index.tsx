// modules/home/ui/components/home-navbar/home-navbar.tsx
export default function HomeNavbar() {
  return (
    <div className="flex justify-between w-full">
      <div className="font-bold text-lg">WeTube</div>
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-1 rounded-md bg-gray-100 text-black w-1/3"
      />
    </div>
  );
}
