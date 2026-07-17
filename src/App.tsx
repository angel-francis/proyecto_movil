import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Login from './pages/Login';
import Administrador from './pages/Administrador';
import AgregarProducto from './pages/AgregarProducto';
import EmpleadosAlmacen from './pages/EmpleadosAlmacen';
import MostrarOAE from './pages/MostrarOAE';
import EncargadoDeAlmacen from './pages/EncargadoDeAlmacen';
import ProductA from './pages/ProductA';
import OProductosAl from './pages/OProductosAl';
import Movimientos from './pages/Movimiento';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

// 🧩 Componente separado para manejar las rutas y el menú
const MainLayout: React.FC = () => {
  const location = useLocation();

  // 🔹 Rutas donde SÍ se muestra el menú
  const rutasConMenu = [
    '/Administrador/Productos',
    '/Administrador/AgregarProducto',
    '/Administrador/EmpleadosAlmacen',
    '/Administrador/MostrarOAE',
    '/Administrador/OProductosAl',
    '/Administrador/ProductA',
    '/Administrador/Movimiento',
    '/EncargadoDeAlmacen/Productos'
  ];

  // 🔹 Verificar si la ruta actual está en la lista
  const mostrarMenu = rutasConMenu.some((ruta) => location.pathname.startsWith(ruta));

  return mostrarMenu ? (
    //Layout con menú (solo para roles autenticados)
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        <Route path="/Administrador/Productos" component={Administrador} exact />
        <Route path="/Administrador/AgregarProducto" component={AgregarProducto} exact />
        <Route path="/Administrador/EmpleadosAlmacen" component={EmpleadosAlmacen} exact />
        <Route path="/Administrador/MostrarOAE" component={MostrarOAE} exact />
        <Route path="/Administrador/OProductosAl" component={OProductosAl} exact />
        <Route path="/EncargadoDeAlmacen/MostrarOAE" component={MostrarOAE} exact />
        <Route path="/Administrador/ProductA" component={ProductA} exact />
        <Route path="/Administrador/Movimiento" component={Movimientos} exact />
        <Route path="/EncargadoDeAlmacen/MostrarOAE" component={MostrarOAE} exact />
         <Route path="/EncargadoDeAlmacen/Productos" component={EncargadoDeAlmacen} exact />
      </IonRouterOutlet>
    </IonSplitPane>
  ) : (
    //Layout sin menú (solo para login)
    <IonRouterOutlet>
      <Route path="/login" component={Login} exact />
      <Redirect exact from="/" to="/login" />
    </IonRouterOutlet>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <MainLayout />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

