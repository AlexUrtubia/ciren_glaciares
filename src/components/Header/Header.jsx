// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Link } from "react-router-dom";
// import logo from '../static/img/logo_ciren.png'

//Components
import { Layout, Image, Divider } from "antd";
import UserAvatarHeader from "./UserAvatarHeader";
import LanguageSelector from "./LanguageSelector";
//Images
import cepal_logo from '../static/img/ciren1.png'

// const theme = createTheme({
//   components: {
//     MuiToolbar: {
//         styleOverrides: {
//             dense: {
//                 height: 50,
//                 minHeight: 50
//             }
//         }
//     }npm install react-icons

//   },
//   palette: {
//     primary: {
//       main: '#FEFEFF',
//       text: 'primary',
//     },
//   },
// });

// const toolbarStyle = {
//   minHeight: '80px',
//   };

const { Header } = Layout;

function Navbar(props) {

  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen((prevState) => !prevState);
  // };

  return (
    <Header className={"header_style"}>
      <div className="logo">
        <a
          href="https://www.cepal.org/es"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={cepal_logo} preview={false} />
        </a>
      </div>
      {!props.noUser && <div style={{ float: "right" }}>
        <Divider type="vertical" style={{ height: "2em" }} />
        <UserAvatarHeader />
      </div>}
      {
        props.noUser && <div style={{ float: "right" }}>
        <Divider type="vertical" style={{ height: "2em" }} />
        <a href="login" style={{color:"black"}}>Iniciar Sesion</a>
      </div>
      }
      <div style={{ float: "right" }}>
        <Divider type="vertical" style={{ height: "2em" }} />
        <LanguageSelector />
      </div>
    </Header>
  );

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Box sx={{ display: 'flex', marginBottom: 10 }}>
  //       <AppBar component="nav">
  //         <Toolbar style={toolbarStyle}>
  //           <Box
  //             component="img"
  //             sx={{
  //             height: 58,
  //             }}
  //             alt="fcfm logo."
  //             src={logo}
  //           />
  //           <Typography
  //             variant="h6"
  //             component="div"
  //             align='center'
  //             fontFamily={'Roboto,sans-serif'}
  //             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
  //           >
  //             GLACIARES
  //           </Typography>
  //           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
  //             <Button>
  //               ola
  //               {/* <Link style={{textDecoration: 'none', color: '#2C2D2C', fontFamily: 'Roboto,sans-serif'}} to={'www.google.com'}>Instancias</Link> */}
  //             </Button>
  //             <Button>
  //               ola
  //               {/* <Link style={{textDecoration: 'none', color: '#2C2D2C', fontFamily: 'Roboto,sans-serif'}} to={'www.google.com'}>Calendario</Link> */}
  //             </Button>
  //           </Box>
  //         </Toolbar>
  //       </AppBar>
  //     </Box>
  //   </ThemeProvider>
  // );
}

export default Navbar;