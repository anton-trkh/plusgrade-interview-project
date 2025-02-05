import TaxCalculatorWrapper from './Containers/TaxCalculatorWrapper'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { ErrorContext } from './Context/ErrorContext';
import { ErrorKind } from './Enums/ErrorReducer';
import ErrorDialogue from './Components/ErrorDialogue';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App() {  
  const [error, setError] = useState(ErrorKind.NONE);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ErrorContext.Provider value={{
            dispatch: (error: ErrorKind) => setError(error)
        }}>
          <TaxCalculatorWrapper />
          <ErrorDialogue 
            error={error}
            setError={setError}
          />
        </ErrorContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
