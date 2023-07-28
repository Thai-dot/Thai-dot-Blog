import { IconButton, Tooltip } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';

export default function TableAction (){
    return (
      <Tooltip title="Chỉnh sửa">
        <IconButton>
          <CreateIcon />
        </IconButton>
      </Tooltip>
    );
}