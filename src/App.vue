<template>
  <div>
    <div class="divBackground pt-3 pb-3">
      <v-card class="container">
        <div class="bg-success pb-1 pt-1">
          <h4 class="text-center text-light">Agregar Domicilios</h4>
        </div>

        <div class="d-flex justify-content-center mt-3">
          <v-btn rounded @click="agregarDireccion()">
            <img src="./assets/plus-circle.png" />
          </v-btn>
        </div>

        <hr />

        <v-layout class="d-flex justify-content-center">
          <v-list>
            <!-- Spinner de carga inicial -->
            <div class="d-flex justify-content-center pt-3 pb-4">
              <v-progress-circular v-show="showSpinner" color="dark" indeterminate size="30"></v-progress-circular>
            </div>
            <v-list-item v-for="(datos, index) in direccionLista" :key="index">
              <v-text-field
                label="Nombre del Barrio"
                centered
                prepend-inner-icon="mdi-map-marker"
                class="mr-3"
                outlined
                rows="1"
                v-model="datos.barrioName"
              ></v-text-field>

              <v-text-field
                centered
                label="Precio"
                class="ml-3"
                prepend-inner-icon="mdi-currency-usd"
                outlined
                rows="1"
                v-model="datos.precio"
              ></v-text-field>

              <v-icon @click="QuitarDireccion(index)" class="ml-2 mb-4">mdi-close</v-icon>
            </v-list-item>
          </v-list>
        </v-layout>
        <hr />

        <p
          v-show="showMsjGuardado"
          class="text-success text-center mt-3"
        >Domicilio guardados con exito!</p>

        <!-- Boton Guardar -->
        <div class="d-flex justify-content-center">
          <v-btn @click="guardarDireccion()">Guardar</v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.init();
    this.getDirecciones();
  },

  data() {
    return {
      direccionLista: [],
      indexDeleteToken: "",
      showMsjGuardado: false,
      showSpinner: true,
      firebaseConfig: {
        apiKey: "AIzaSyCJ9_4cm_hLPFUfvc4wavU0rR0kIFEI6L4",
        authDomain: "market-4d1a0.firebaseapp.com",
        databaseURL: "https://market-4d1a0.firebaseio.com",
        projectId: "market-4d1a0",
        storageBucket: "market-4d1a0.appspot.com",
        messagingSenderId: "28167568995",
        appId: "1:28167568995:web:92898402e08363f972c256"
      }
    };
  },

  methods: {
    init() {
      if (!firebase.apps.length) {
        firebase.initializeApp(this.firebaseConfig);
      }
    },
    //Llama la lista de direcciones guardadas
    getDirecciones() {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(this.firebaseConfig);
        }
        let db;
        db = firebase.firestore();
        //Solicita todos los documentos y su data interna
        db.collection("direcciones")
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.id) {
                //convierte el json a array
                let arraySession = Object.values(doc.data());
                this.showSpinner = false;
                if (arraySession.length != 0) {
                  for (const key in arraySession) {
                    this.direccionLista.push(arraySession[key]);
                  }
                } else {
                  this.direccionLista.push({ barrioName: "", precio: "" });
                }
              }
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
    //quita la direccion de la lista
    QuitarDireccion(index) {
      this.$delete(this.direccionLista, index);
      this.showMsjGuardado = false;
    },
    //Agrega los campos para poner una nuevo domicilio
    agregarDireccion() {
      this.direccionLista.push({ barrioName: "", precio: "" });
      console.log(this.direccionLista);
      this.showMsjGuardado = false;
    },
    guardarDireccion() {
      if (!firebase.apps.length) {
        firebase.initializeApp(this.firebaseConfig);
      }
      let db;
      db = firebase.firestore();

      let ListaTokensActualizada = {};
      for (const index in this.direccionLista) {
        ListaTokensActualizada["_" + index] = this.direccionLista[index];
      }
      console.log(ListaTokensActualizada);
      db.collection("direcciones")
        .doc("domicilio")
        .set(ListaTokensActualizada)
        .then(() => {
          console.log("Campos creados con exito!");
          this.showMsjGuardado = true;
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
    }
  }
};
</script>

<style scoped>
.divBackground{
  background: rgb(204,204,204);
}
.container{
  background: rgb(230, 230, 230);
}
</style>
