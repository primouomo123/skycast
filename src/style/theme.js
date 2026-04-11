import { createTheme } from '@mui/material/styles';

// Light mode theme
export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#9c27b0',
		},
		background: {
			default: '#f5f5f5',
			paper: '#fff',
		},
		text: {
			primary: '#212121',
			secondary: '#757575',
		},
	},
});

// Dark mode theme
export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
		},
		secondary: {
			main: '#ce93d8',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#fff',
			secondary: '#b0b0b0',
		},
	},
});
