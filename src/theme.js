import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      primary: {
        main: '#23d5c3',  // Turquoise
        light: '#23d5c336', // Light Turquoise
      },
      secondary: {
        // main: '#d5237ab3',  // Light Green - 66ffd1
        // light: '#ee9fca36', // Lighter Green,
        main: '#d52354b3',
        light: '#ee9f9f3d',
      },
      other: {
        text: '#333333',  // Dark Text Color
        textH: '#00000099',
        textP: '#17171799',
        danger: '#ff6666', // Danger/Warning Color,
        gray: '#f5f5f5',
        white: '#ffffff',
      },
    },
  });
  
  