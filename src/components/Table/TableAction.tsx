import { IconButton, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Link from "next/link";
import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function TableAction({
  id,
  isAdmin,
  status,
}: {
  id: string;
  isAdmin: boolean;
  status: boolean;
}) {
  const router = useRouter();

  const handleVerify = (booleanValue: boolean) => {
    axios
      .patch(`/api/post/${id}`, { booleanValue })
      .then((res) => res)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        toast.error("Lỗi không kích hoạt được");
      });
  };

  return (
    <div className="flex items-center ">
      <Link href={`/blog-list/${id}`}>
        <Tooltip title={isAdmin ? "Xem chi tiết" : "Chỉnh sửa"}>
          <IconButton>
            <CreateIcon />
          </IconButton>
        </Tooltip>
      </Link>
      {isAdmin && (
        <div>
          {!status ? (
            <Tooltip title="Chấp thuận blog" onClick={() => handleVerify(true)}>
              <IconButton>
                <CheckIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              title="Trở lại không duyệt"
              onClick={() => handleVerify(false)}
            >
              <IconButton>
                <DoNotDisturbAltIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
}
