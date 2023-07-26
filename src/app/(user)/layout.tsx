import LeftUserLayout from "@/components/Layout/LeftUserLayout";
import { centerLayoutClass } from "@/constant/classname/classname";
import Link from "next/link";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={centerLayoutClass}>
      <h4 className="text-primary-500">Trang quản lý</h4>
      <div className="flex flex-col gap-14 lg:grid lg:grid-cols-12 mt-3 lg:mt-5">
        <LeftUserLayout />
        <section className="lg:col-span-9 ">{children}</section>
      </div>
    </main>
  );
}
