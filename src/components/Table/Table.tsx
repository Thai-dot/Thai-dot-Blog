import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import EnhancedTableToolbar from "./TableToolbar";
import EnhancedTableHead from "./TableHead";

import useBlogList from "@/zustand/useBlogList";

import {
  descendingComparator,
  getComparator,
  stableSort,
  Order,
} from "./tableSupportFunction";
import TableAction from "./TableAction";

interface Data {
  id: string;
  title: string;
  createAt: string;
  updateAt: string;
  type: string;
  viewNumber: number;
  status?: boolean;
  action: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Tiêu đề",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Thể loại",
  },
  {
    id: "viewNumber",
    numeric: true,
    disablePadding: false,
    label: "Lượt xem",
  },
  {
    id: "createAt",
    numeric: false,
    disablePadding: false,
    label: "Ngày tạo",
  },
  {
    id: "updateAt",
    numeric: false,
    disablePadding: false,
    label: "Ngày cập nhật",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Thao tác",
  },
];

interface EnhancedTableProps {
  data: Data[];
  totalRow: number;
  isAdmin: boolean;
}

export default function EnhancedTable(props: EnhancedTableProps) {
  const { data: getRows, totalRow, isAdmin } = props;
  const { page, setPage, limit, setLimit } = useBlogList();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  let rows = getRows;

  if (page > 0) {
    for (let i = 0; i < page * limit; i++) {
      //@ts-ignore
      rows.unshift({});
    }
  }

  const [dense, setDense] = React.useState(false);
  const rowsPerPage = limit;

  const { changeDeleteArray } = useBlogList();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      changeDeleteArray(newSelected);
      return;
    }
    setSelected([]);
    changeDeleteArray([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    // @ts-ignore
    const passNewSelected: string[] = structuredClone(newSelected);
    changeDeleteArray(passNewSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const getNumber = parseInt(event.target.value, 10);
    if (getNumber === 5 || getNumber === 10 || getNumber === 25) {
      setLimit(getNumber);
      setPage(0);
    }
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      // @ts-ignore
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id.toString());
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id.toString())}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      {row.id.toString().substring(4, 8)}
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "220px" }}>
                      {row.title}
                    </TableCell>

                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="right">{row.viewNumber}</TableCell>

                    <TableCell align="left">{row.createAt}</TableCell>
                    <TableCell align="left">{row.updateAt}</TableCell>
                    <TableCell align="left" style={{ minWidth: "50px" }}>
                      {row.status ? (
                        <div className=" bg-green-400 rounded-3xl text-slate-700 text-center font-medium">
                          Duyệt
                        </div>
                      ) : (
                        <div className=" bg-yellow-500 rounded-3xl text-slate-700 text-center font-medium">
                          Chưa duyệt
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <TableAction
                        id={row.id.toString()}
                        isAdmin={isAdmin}
                        status={Boolean(row.status)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRow}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng/trang"
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Giảm cỡ dòng"
      />
    </Box>
  );
}
