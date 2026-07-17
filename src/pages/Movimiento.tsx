import React, { useEffect, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel, IonInput,
  IonSelect, IonSelectOption, IonButton, IonList
} from "@ionic/react";

const Movimientos: React.FC = () => {
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [idProductoA, setIdProductoA] = useState("");
  const [entradaSalida, setEntradaSalida] = useState("entrada");
  const [cantidad, setCantidad] = useState("");
  const token = localStorage.getItem("token") || ""; // JWT guardado al login

  // 🔹 Obtener movimientos (GET)
  const getMovimientos = async () => {
    try {
      const res = await fetch("http://localhost:3000/Movimiento/M", {
        headers: { Authorization: token }
      });
      const data = await res.json();
      setMovimientos(data);
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
    }
  };

  // 🔹 Registrar movimiento (POST)
  const registrarMovimiento = async () => {
    try {
      const nuevoMovimiento = {
        idProductoA: parseInt(idProductoA),
        entrada_salida: entradaSalida,
        cantidad: parseInt(cantidad)
      };

      await fetch("http://localhost:3000/Movimiento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify(nuevoMovimiento)
      });

      // Actualizar lista después de registrar
      getMovimientos();
      setIdProductoA("");
      setCantidad("");
      setEntradaSalida("entrada");
    } catch (error) {
      console.error("Error al registrar movimiento:", error);
    }
  };

  useEffect(() => {
    getMovimientos();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gestión de Movimientos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Formulario de registro */}
        <IonItem>
  <IonLabel>Producto</IonLabel>
  <IonSelect
    value={idProductoA}
    placeholder="Selecciona un producto"
    onIonChange={(e) => setIdProductoA(e.detail.value)}
  >
    {movimientos.map((mov) => (
      <IonSelectOption key={mov.idProductoA} value={mov.idProductoA}>
        {mov.producto}
      </IonSelectOption>
    ))}
  </IonSelect>
</IonItem>

        <IonItem>
          <IonLabel>Tipo Movimiento</IonLabel>
          <IonSelect
            value={entradaSalida}
            onIonChange={(e) => setEntradaSalida(e.detail.value)}
          >
            <IonSelectOption value="entrada">Entrada</IonSelectOption>
            <IonSelectOption value="salida">Salida</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Cantidad</IonLabel>
          <IonInput
            type="number"
            value={cantidad}
            onIonChange={(e) => setCantidad(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={registrarMovimiento}>
          Registrar Movimiento
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Movimientos;
