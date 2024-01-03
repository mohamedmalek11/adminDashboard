// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from "react";

// ** Next Imports
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Actions Imports
import { fetchData, deleteUser } from "src/store/apps/user";

// ** Third Party Components
import axios from "axios";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { ThemeColor } from "src/@core/layouts/types";
import { TenantType } from "src/types/apps/userTypes";

// ** Custom Table Components Imports
import TableHeader from "src/views/tenants/TableHeader";
import AddUserDrawer from "src/views/tenants/AddUserDrawer";

// ** Api Imports
import { getTenants } from "../../api/tenants";
import FallbackSpinner from "src/@core/components/spinner";
interface UserRoleType {
  [key: string]: { icon: string; color: string };
}

interface UserStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: TenantType;
}

// ** renders client column
const userRoleObj: UserRoleType = {
  admin: { icon: "tabler:device-laptop", color: "secondary" },
  author: { icon: "tabler:circle-check", color: "success" },
  editor: { icon: "tabler:edit", color: "info" },
  maintainer: { icon: "tabler:chart-pie-2", color: "primary" },
  subscriber: { icon: "tabler:user", color: "warning" },
};

const userStatusObj: UserStatusType = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

// ** renders client column
const renderClient = (row: TenantType) => {
  if (row.imagePath) {
    return (
      <CustomAvatar
        src={row.imagePath}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color="primary"
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
      >
        {getInitials(row.name.en ? row.name.en : "John Doe")}
      </CustomAvatar>
    );
  }
};

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteUser(id));
    handleRowOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="tabler:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem
          component={Link}
          sx={{ "& svg": { mr: 2 } }}
          href="tenants/workshop/workshop-branches"
          id={id}
          onClick={handleRowOptionsClose}
        >
          <Icon icon="tabler:eye" fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const columns: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 280,
    field: "fullName",
    headerName: "Tenant Name",
    renderCell: ({ row }: CellType) => {
      const { name, city } = row;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row)}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              component={Link}
              href="tenants/workshop/account"
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {name.en}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: "text.disabled" }}>
              {city}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    field: "role",
    minWidth: 170,
    headerName: "city",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          noWrap
          sx={{ color: "text.secondary", textTransform: "capitalize" }}
        >
          {row.city}
        </Typography>
      );
    },
  },

  {
    flex: 0.15,
    minWidth: 190,
    field: "street",
    headerName: "street",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ color: "text.secondary" }}>
          {row.street}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: "Commercial Number",
    field: "Commercial Number",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography
          noWrap
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            textTransform: "capitalize",
          }}
        >
          {row.commercialNumber}
        </Typography>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: "actions",
    headerName: "Actions",
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />,
  },
];

const Home = () => {
  // ** State
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<any>();
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchTenantsData = async () => {
      try {
        const result = await getTenants();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTenantsData();
  }, [value]);
  console.log(data);
  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
          />
          {data ? (
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={data}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          ) : (
            <FallbackSpinner />
          )}
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  );
};

export default Home;
