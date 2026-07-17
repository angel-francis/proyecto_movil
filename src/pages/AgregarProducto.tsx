import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
  IonSelect,
  IonSelectOption,
  IonMenuButton,
  IonButtons,
  useIonViewWillEnter
} from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';
import { BLE } from '@ionic-native/ble'; //Importar BLE

const AgregarProducto: React.FC = () => {
  const [producto, setProducto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [idCategoria, setIdCategoria] = useState('');
  const [categorias, setCategorias] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);
  const [dispositivos, setDispositivos] = useState<any[]>([]);

  const token = localStorage.getItem('token'); // JWT del login

  useIonViewWillEnter(() => {
    axios.get('http://localhost:3000/Categoria', {
      headers: { Authorization: token }
    })
    .then(response => setCategorias(response.data))
    .catch(error => console.error('Error al obtener categorías:', error));
  }, [token]);

  //Escanear dispositivos Bluetooth cercanos
  const escanearDispositivos = async () => {
    setDispositivos([]); // limpiar lista previa
    BLE.scan([], 5).subscribe(
      device => {
        console.log('Dispositivo encontrado:', device);
        setDispositivos(prev => [...prev, device]);
      },
      error => console.error('Error al escanear:', error)
    );
  };

  //Conectar y enviar datos del producto
  const enviarProductoBluetooth = (deviceId: string, data: any) => {
    BLE.connect(deviceId).subscribe(
      peripheral => {
        console.log('Conectado a:', peripheral);
        const serviceUUID = '12345678-1234-5678-1234-56789abcdef0';
        const characteristicUUID = 'abcdef01-1234-5678-1234-56789abcdef0';

        // 🔧 Usar TextEncoder para convertir el JSON a bytes
        const bytes = new TextEncoder().encode(JSON.stringify(data));
        const buffer = bytes.buffer; //convertir a ArrayBuffer

        BLE.write(deviceId, serviceUUID, characteristicUUID, buffer)
          .then(() => console.log('Producto enviado vía Bluetooth'))
          .catch(err => console.error('Error al enviar datos:', err));
      },
      error => console.error('Error al conectar:', error)
    );
  };

  const agregarProducto = async () => {
    try {
      const formData = new FormData();
      formData.append('producto', producto);
      formData.append('descripcion', descripcion);
      formData.append('idCategoria', idCategoria);
      if (imagen) formData.append('imagen', imagen);

      const response = await axios.post(
        'http://localhost:3000/Productos/Agregar',
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setMensaje(response.data.mensaje || 'Producto agregado correctamente');
      setMostrarToast(true);

      //Escanear y enviar producto vía Bluetooth
      escanearDispositivos();
      setTimeout(() => {
        if (dispositivos.length > 0) {
          enviarProductoBluetooth(dispositivos[0].id, {
            producto,
            descripcion,
            idCategoria
          });
        } else {
          console.log('No se encontraron dispositivos Bluetooth cercanos');
        }
      }, 6000);

      // Resetear formulario
      setProducto('');
      setDescripcion('');
      setImagen(null);
      setIdCategoria('');
    } catch (error: any) {
      setMensaje('Error al agregar producto');
      setMostrarToast(true);
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="ion-padding">Agregar Producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre del producto</IonLabel>
          <IonInput value={producto} onIonChange={(e) => setProducto(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonTextarea value={descripcion} onIonChange={(e) => setDescripcion(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Imagen del producto</IonLabel>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImagen(file);
            }}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Categoría</IonLabel>
          <IonSelect value={idCategoria} onIonChange={(e) => setIdCategoria(e.detail.value)}>
            {categorias.map((cat) => (
              <IonSelectOption key={cat.idCategoria} value={cat.idCategoria}>
                {cat.categoria}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonButton expand="block" onClick={agregarProducto}>
          Agregar y Compartir por Bluetooth
        </IonButton>

        <IonToast
          isOpen={mostrarToast}
          message={mensaje}
          duration={2000}
          onDidDismiss={() => setMostrarToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default AgregarProducto;



