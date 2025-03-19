import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from "react-router-dom";

import Navbar from './pages/global/Navbar';
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Invoices from "./pages/invoices";
import Calender from "./pages/calender";
import Login from "./pages/form/login";
import Signup from './pages/form/signup';
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";


function App() {

  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Sidebar />
          <main className='content'>
            <Navbar />

            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/users" element={<Users />} />
              <Route path="/invoices" element={<Invoices />} /> 
              <Route path="/calendar" element={<Calender />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
             
           
            </Routes> 
          </main>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
