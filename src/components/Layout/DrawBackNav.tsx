"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import MainButton from "../Buttons/Button/MainButton";
import useIsMounted from "@/hooks/is-mounted/is-mounted";
import { useRouter } from "next/navigation";

interface DrawBackNavbarType {
  session: any;
}

function DrawBackNavbar(props: DrawBackNavbarType) {
  const { session } = props;
  const pathname = usePathname();
  const mounted = useIsMounted();
  const router = useRouter();

  const pages = [
    { name: "Trang chủ", link: "/" },
    { name: "Các bài viết", link: "/list" },
    { name: "Về tôi", link: "/about" },
  ];
  const notHaveNavbar = ["/login"];

  const checkDisplay = notHaveNavbar.includes(pathname);

  if (checkDisplay && mounted) {
    document.getElementById("body")?.classList.remove("pt-20");
  } else {
    document.getElementById("body")?.classList.add("pt-20");
  }

  if (pathname === "/login" && mounted && session) {
    router.push("/");
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [language, setLanguage] = React.useState("vietnamese");

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fdfdfd",
        display: checkDisplay ? "none" : "block",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "#171A1F",
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            ThaiBlog
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} href={page.link}>
                  <MenuItem onClick={handleCloseNavMenu}>{page.name}</MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* responsive breakpoint */}

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "#171A1F",
              textDecoration: "none",
              letterSpacing: ".3rem",
            }}
          >
            ThaiBlog
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Link href={page.link} key={page.name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#171A1F", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={language}
              size="small"
              sx={{ mr: 2, borderRadius: "25px" }}
              onChange={handleChangeLanguage}
            >
              <MenuItem value="vietnamese">Tiếng Việt</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </Select>

            {session ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="user's avatar" src={session.user.image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link href={"/information"}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Tài khoản</Typography>
                    </MenuItem>
                  </Link>
                  <Link href={"/create-blog"}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Thêm blog mới</Typography>
                    </MenuItem>
                  </Link>
                  <Link href={"/blog-list"}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Quản lý blog</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      });
                    }}
                  >
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div className="text-black mt-[3px]">
                <Link href={"/login"}>
                  <MainButton text=" Đăng nhập" variant="outlined" />
                </Link>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default DrawBackNavbar;
