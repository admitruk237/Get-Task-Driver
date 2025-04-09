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
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
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
          h3: {
            fontFamily: 'CeraPro-Bold',
          },
          h4: {
            fontFamily: 'CeraPro-Bold',
            color: '#484848',
          },
          h5: {
            color: '#484848',
          },
          fontFamily: 'CeraPro-Regular',
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              elevation1: {
                boxShadow: 'none',
              },
            },
          },
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
