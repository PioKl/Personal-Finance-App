import { useMediaQuery, createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export function useBreakpoint() {
  const isXsUp = useMediaQuery(theme.breakpoints.up("xs"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));

  return { isXsUp, isSmUp, isMdUp, isLgUp, isXlUp };
}
