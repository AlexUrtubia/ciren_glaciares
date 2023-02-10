import Default from "./views/Default";
// import Usuarios from "./views/admin/Usuarios";
import CrearUsuario from "./views/admin/CrearUsuario";
import Procesos from "./views/admin/Procesos";
// import Satelites from "./views/admin/Satelites";
// import Regiones from "./views/admin/Regiones";
import CrearRegion from "./views/admin/CrearRegion";
// import EditarRegion from "./views/EditarRegion";
import {
  FaUsers,
  FaListAlt,
  FaChartPie,
  FaAtlas,
  FaUserPlus,
  FaUsersCog,
  FaLaptopCode,
  FaSatellite,
  FaMapMarkedAlt,
  FaIdBadge,
  FaCogs,
  FaMap,
} from "react-icons/fa";
import { RiMapPinAddFill } from "react-icons/ri";
import Configuracion from "./views/perfil/Configuracion";
// import MisRegiones from "./views/perfil/MisRegiones";
// import Graficos from "./views/Graficos";
// import Informes from "./views/Informes";
// import Login from "./views/Login";
// import Recovery from "./views/Recovery";
// import MapaPublico from "./views/MapaPublico";
// import MapaDinamico from "./views/MapaDinamico";

const routes = [
  {
    name: "DEFAULT",
    path: "default2",
    layout: "",
    component: <Default />,
    icon: null,
  },
  {
    name: "Administrador",
    collapse: true,
    path: "admin",
    layout: "dashboard",
    icon: <FaUsersCog />,
    admin:true,
    views: [
      // {
      //   name: "Usuarios",
      //   path: "usuarios",
      //   layout: "dashboard",
      //   component: <Usuarios />,
      //   icon: <FaUsers />,
      // },
      {
        name: "Crear Usuario",
        path: "crear-usuario",
        layout: "dashboard",
        component: <CrearUsuario />,
        icon: <FaUserPlus />,
      },
      {
        name: "Procesos",
        path: "procesos",
        layout: "dashboard",
        component: <Procesos />,
        icon: <FaLaptopCode />,
      },
      // {
      //   name: "Satelites",
      //   path: "satelites",
      //   layout: "dashboard",
      //   component: <Satelites />,
      //   icon: <FaSatellite />,
      // },
      // {
      //   name: "Regiones",
      //   path: "regiones",
      //   layout: "dashboard",
      //   component: <Regiones />,
      //   icon: <FaMapMarkedAlt />,
      // },
      {
        name: "Crear Región",
        path: "crear-region",
        layout: "dashboard",
        component: <CrearRegion />,
        icon: <RiMapPinAddFill />,
      },
    ],
  },
  {
    name: "Mi Perfil",
    collapse: true,
    path: "perfil",
    layout: "dashboard",
    icon: <FaIdBadge />,
    views: [
      {
        name: "Configuración",
        path: "configuracion",
        layout: "dashboard",
        component: <Configuracion />,
        icon: <FaCogs />,
      },
      // {
      //   name: "Mis Regiones",
      //   path: "mis-regiones",
      //   layout: "dashboard",
      //   component: <MisRegiones />,
      //   icon: <FaAtlas />,
      // },
    ],
  },
  // {
  //   name: "Mapas",
  //   collapse: true,
  //   path: "mapas",
  //   layout: "dashboard",
  //   icon: <FaMap />,
  //   views: [
  //     {
  //       name: "Mapa Dinámico",
  //       path: "mapa-dinamico",
  //       layout: "dashboard",
  //       component: <MapaDinamico />,
  //       icon: <FaMap />,
  //     },
  //     {
  //       name: "Mapa Público",
  //       path: "mapa-publico-login",
  //       layout: "dashboard",
  //       component: <MapaPublico />,
  //       icon: <FaMap />,
  //     },
  //   ],
  // },
  // {
  //   hide: true,
  //   path: "editar-region",
  //   layout: "dashboard",
  //   component: <EditarRegion />,
  // },
  // {
  //   name: "Gráficos",
  //   path: "grafico-emisiones",
  //   layout: "dashboard",
  //   component: <Graficos />,
  //   icon: <FaChartPie />,
  // },
  // {
  //   name: "Informes",
  //   path: "informes",
  //   layout: "dashboard",
  //   component: <Informes />,
  //   icon: <FaListAlt />,
  // },
  // {
  //   name: "Login",
  //   path: "login",
  //   layout: "",
  //   component: <Login/>,
  //   icon: null,
  // },
  // {
  //   name: "Recovery",
  //   path: "restaurar-contrasena",
  //   layout: "",
  //   component: <Recovery />,
  //   icon: null,
  // },
  // {
  //   name: "Mapa Publico",
  //   path: "",
  //   layout: "",
  //   component: <MapaPublico download={false}/>,
  //   icon: null,
  // },
];

export default routes;
