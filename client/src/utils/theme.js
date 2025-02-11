import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
        color:'whitesmoke',
    },
    components: {
        MuiButton: {
          styleOverrides: {
            root: {
              outline: "none",
              "&:focus": {
                outline: "none",
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              outline: "none",
              "&:focus": {
                outline: "none",
              },
            },
          },
        },
      },
});

export default theme;