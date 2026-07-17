import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [usuario, setUsuario] = useState('');
  const history = useHistory();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // evita recarga del form
    try {
      // 🔹 Limpia datos previos para evitar roles antiguos
      localStorage.clear();

      const response = await axios.post('http://localhost:3000/Login/Aut', {
        user,
        password,
      });

      const { mensaje, usuario, token, rol } = response.data;

      // 🔹 Guardar datos en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('mensaje', mensaje);
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('rol', rol);

      // 🔹 Actualizar estados
      setMensaje(mensaje);
      setUsuario(usuario);

      // 🔹 Redirigir según rol
      if (rol === 'Administrador') {
        history.push('/Administrador/Productos');
        window.location.reload(); // fuerza recarga del menú con el rol correcto
      } else if (rol === 'Encargado de almacen') {
        history.push('/EncargadoDeAlmacen/Productos');
        window.location.reload(); // fuerza recarga del menú con el rol correcto
      } else {
        alert('Rol no autorizado');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="LoginContent">
        <div className="Content">
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel position="floating">User</IonLabel>
              <IonInput
                value={user}
                onIonChange={e => setUser(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
              />
            </IonItem>
            <IonButton expand="block" type="submit">
              Ingresar
            </IonButton>
          </form>

          {/* Mensajes de bienvenida */}
          {mensaje && <p>{mensaje}</p>}
          {usuario && <h3>{usuario}</h3>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
