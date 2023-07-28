import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import PostTypeEnum from "@/types/enum/PostType";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useBlogList from "@/zustand/useBlogList";
import { Stack, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface EnhancedTableToolbarProps {
  numSelected: number;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const {
    categories,
    toggleCheckEachCategory,
    title,
    changePostTitle,
    onDelete,
  } = useBlogList();

  const blogType = [
    { name: "Công nghệ", value: PostTypeEnum.TECHNOLOGY },
    { name: "Phim", value: PostTypeEnum.MOVIE },
    { name: "Sách", value: PostTypeEnum.BOOK },
    { name: "Game", value: PostTypeEnum.GAMING },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 2 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} được chọn
        </Typography>
      ) : (
        <Stack direction="row">
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="h5"
          >
            Các bài đã viết
          </Typography>
          <TextField
            size="small"
            placeholder="Tìm bài viết..."
            value={title}
            onChange={(e: any) => {
              if (e.target.value.length > 150) return null;
              changePostTitle(e.target.value);
            }}
            InputProps={{
              sx: { borderRadius: "25px", marginRight: "0px" },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
      {numSelected > 0 ? (
        <Tooltip
          title="Delete"
          onClick={() => {
            onDelete(true);
          }}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip
            title="Filter list"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <Stack paddingX={2}>
              <FormGroup>
                {blogType.map((type) => {
                  return (
                    <FormControlLabel
                      key={type.value}
                      control={
                        <Checkbox
                          name={type.value}
                          checked={
                            categories.find(
                              (category) => category.name === type.value
                            )?.checked
                          }
                          onChange={(e: any) => {
                            toggleCheckEachCategory(type.value);
                          }}
                          style={{
                            color: "#0095a9",
                          }}
                        />
                      }
                      label={type.name}
                    />
                  );
                })}
              </FormGroup>
            </Stack>
          </Menu>
        </>
      )}
    </Toolbar>
  );
}
