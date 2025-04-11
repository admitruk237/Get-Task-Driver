import { createTheme, colors, ThemeProvider } from '@mui/material';
import React from 'react';

interface IColorModeContex {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

export const ColorModeContext = React.createContext<IColorModeContex>({
  toggleColorMode: () => {},
  mode: 'light',
});

export const ColorModeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: colors.blue[500],
            contrastText: '#fff',
          },
          secondary: {
            main: colors.red[500],
            contrastText: '#fff',
          },
        },
        typography: {
          h4: {
            fontFamily: 'CeraPro-Bold',
            color: mode === 'light' ? colors.grey[800] : colors.grey[200],
            fontSize: '1.5rem',
          },
          body1: {
            color: mode === 'light' ? colors.grey[800] : colors.grey[200],
          },

          fontFamily: 'CeraPro-Regular',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: '700',
              },
              contained: {
                boxShadow: 'none',
              },
            },
          },
          MuiLink: {
            styleOverrides: {
              root: {
                fontFamily: 'CeraPro-Bold',
                color: mode === 'dark' ? colors.grey[50] : colors.grey[900],
              },
            },
          },
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => React.useContext(ColorModeContext);
