import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  archiveOutline, archiveSharp,
  bookmarkOutline,
  heartOutline, heartSharp,
  mailOutline, mailSharp,
  paperPlaneOutline, paperPlaneSharp,
  trashOutline, trashSharp,
  warningOutline, warningSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  roles: string[];
}

//Obtener el rol correctamente
const rol = localStorage.getItem('rol') || 'Encargado de almacen';

const appPages: AppPage[] = [
  {
    title: 'Products',
    url: '/Administrador/Productos',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
    roles: ['Administrador']
  },
  {
    title: 'Add Product',
    url: '/Administrador/AgregarProducto',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
    roles: ['Administrador']
  },
  {
    title: 'Empleados Almacen',
    url: '/Administrador/MostrarOAE',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
    roles: ['Administrador','Encargado de almacen']
  },
  {
    title: 'Empleados Almacen',
    url: '/Administrador/EmpleadosAlmacen',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    roles: ['Administrador']
  },
  {
    title: 'Productos Almacen',
    url: '/Administrador/OProductosAl',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    roles: ['Administrador']
  },
  {
    title: 'Producto Almacen',
    url: '/Administrador/ProductA',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    roles: ['Administrador']
  },
   {
    title: 'Movimiento',
    url: '/Administrador/Movimiento',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    roles: ['Administrador']
  },
  {
    title: 'Encargado De Almacen',
    url: '/EncargadoDeAlmacen/Productos',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline,
    roles: ['Encargado de almacen']
  },
  {
    title: 'Almacenes',
    url: '/EncargadoDeAlmacen/MostrarOAE',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkOutline,
    roles: ['Encargado de almacen']
  }
];

//Filtrar páginas según el rol
const paginasFiltradas = appPages.filter((page) => page.roles.includes(rol));

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          <IonNote>Usuario: {rol}</IonNote>
          {/*Mostrar enlaces filtrados */}
          {paginasFiltradas.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
