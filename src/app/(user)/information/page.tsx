import { FC } from "react";
import { TextField, Stack } from "@/lib/mui";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const session = await getAuthSession();
  const userInformation = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });
  return (
    <div className="p-3 border border-neutral-200 rounded">
      <h6 className="text-neutral-900 mb-5">Thông tin cá nhân</h6>

      <div className="flex-center">
        <img
          src={userInformation?.image ?? ""}
          alt="user's avatar"
          className="object-cover w-14 h-14 md:w-20 md:h-20 rounded-full shadow-2xl md:mb-6 mb-4 "
        />
      </div>

      <form className="mb-4 mt-3">
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" gap={2}>
          <TextField
            size="small"
            value={userInformation?.name}
            id="username"
            name="name"
            label="Họ Tên"
            disabled
          />
          <TextField
            size="small"
            value={userInformation?.email}
            id="user-email"
            name="email"
            label="Email"
            disabled
          />
          <TextField
            size="small"
            id="user-role"
            value={userInformation?.role}
            name="role"
            label="Vai trò"
            disabled
          />
        </Stack>
      </form>
    </div>
  );
};

export default Page;
