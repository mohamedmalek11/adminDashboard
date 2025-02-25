// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledCompanyName = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.text.secondary} !important`,
  "&:hover": {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hidden ? null : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            "& :not(:last-child)": { mr: 4 },
          }}
        >
          <Typography component={LinkStyled} href="">
            aerBag
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FooterContent;
