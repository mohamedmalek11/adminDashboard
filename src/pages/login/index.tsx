// ** React Imports
import { useState, ReactNode } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";


// ** Custom Component Import
import CustomTextField from "src/@core/components/mui/text-field";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "react-query";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";

// ** Styled Components
const LoginIllustration = styled("img")(({ theme }) => ({
  zIndex: 2,
  maxHeight: 680,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
  },
  [theme.breakpoints.down("lg")]: {
    maxHeight: 500,
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 750,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: `${theme.palette.primary.main} !important`,
}));


const schema = yup.object().shape({
  emailAddress: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  emailAddress: "m.malek@aerbag.app",
  password: "123456Malek",
};

interface FormData {
  emailAddress: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ** Hooks
  const theme = useTheme();
  const auth = useAuth()
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const { emailAddress, password } = data;
    auth.login({ emailAddress, password }, () => {
      setError("emailAddress", {
        type: "manual",
        message: "Email or Password is invalid",
      });
    });
  };
  const imageSource =
    skin === "bordered"
      ? "auth-v2-login-illustration-bordered"
      : "auth-v2-login-illustration";

  const LogoImage = styled("img")(({ theme }) => ({
    zIndex: 2,
    maxHeight: 80,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down(1540)]: {
      maxHeight: 80,
    },
    [theme.breakpoints.down("lg")]: {
      maxHeight: 80,
    },
  }));
  return (
    <Box className="content-right" sx={{ backgroundColor: "background.paper" }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            borderRadius: "20px",
            justifyContent: "center",
            backgroundColor: "customColors.bodyBg",
            margin: (theme) => theme.spacing(8, 0, 8, 8),
          }}
        >
          <LoginIllustration
            alt="login-illustration"
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <LogoImage alt="logo" src={`/images/pages/logo2.png`} />
            <Box sx={{ my: 6 }}>
              <Typography variant="h3" sx={{ mb: 1.5 }}>
                {`Welcome to ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Please sign-in to your account and start the adventure
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={{ mb: 4 }}>
                <Controller
                  name="emailAddress"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      autoFocus
                      label="Email"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder="admin@aerbag.com"
                      error={Boolean(errors.emailAddress)}
                      {...(errors.emailAddress && {
                        helperText: errors.emailAddress.message,
                      })}
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onBlur={onBlur}
                      label="Password"
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      {...(errors.password && {
                        helperText: errors.password.message,
                      })}
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <Icon
                                fontSize="1.25rem"
                                icon={
                                  showPassword ? "tabler:eye" : "tabler:eye-off"
                                }
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  mb: 1.75,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography component={LinkStyled} href="/forgot-password">
                  Forgot Password?
                </Typography>
              </Box>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mb: 4 }}
              >
                Login
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

LoginPage.guestGuard = true;

export default LoginPage;
