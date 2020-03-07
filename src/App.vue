<template>
  <div>
    <v-card class="container mt-3 mb-3">
      <div class="bg-success pb-1 pt-1">
        <h4 class="text-center text-light">Domicilios</h4>
      </div>

      <v-layout class="d-flex justify-content-center">
        <p class="text-center mt-2">Agregar Direccion</p>
      </v-layout>

      <div class="d-flex justify-content-center">
        <v-btn rounded @click="agregarDireccion(index)">
        <img src="./assets/plus-circle.png">
        </v-btn>
      </div>

      <hr>

    <v-layout class="d-flex justify-content-center">
      <v-list>
      <v-list-item
        v-for="(datos, index) in direccionLista"
        :key="index"
      >
      <v-textarea
          label="Nombre del Barrio"
          auto-grow
          centered
          class="mr-3"
          outlined
          rows="1"
          row-height="5"
          v-model="datos.name"
          @click="clickHandleList(index)"
        ></v-textarea>

        <v-textarea
          label="Precio $"
          auto-grow
          class="ml-3"
          outlined
          rows="1"
          row-height="5"
          v-model="datos.precio"
        ></v-textarea>

        <v-icon @click="QuitarDireccion(index)" class="ml-2 mb-4">mdi-close</v-icon>
      </v-list-item>

    </v-list>
    </v-layout>
      <hr>
      <!-- Boton Guardar -->
      <div class="d-flex justify-content-center">
      <v-btn>Guardar</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  created() {
    this.init();
  },

  data() {
    return {
      direccionLista: [],
      indexDeleteToken: "",
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

    //Maneja el click de la lista
    clickHandleList(index) {
      console.log(index);
    },

    //Llama la lista de direcciones guardadas
    getDirecciones(index){

    },

    //quita la direccion de la lista
    QuitarDireccion(index){
      this.$delete(this.direccionLista, index);
    },
    //Agrega los campos para poner una nuevo domicilio
    agregarDireccion(index){
      this.direccionLista.push({ name: "", precio: "" });
    
    }
  }
};
</script>

<style scoped>

</style>
