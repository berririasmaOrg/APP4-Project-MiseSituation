<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn text @click="$router.push({ path: '/'})">Accueil</v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="$router.push({ path: '/create'})" class="d-flex align-center">
        Quiz
      </v-btn>
      <v-btn text @click="logout()" class="mx-5 d-flex align-center">
        Deconnexion
      </v-btn>

    </v-app-bar>

    <v-main>
      <credentials v-if="!connected" style="position: absolute"></credentials>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { logout } from "./api-request"
import credentials from "./components/credentials"
export default {
  name: 'App',

  components: {
    credentials,
  },

  computed: {
    connected() {
      return localStorage.getItem("token");
    }
  },

  methods: {
    async logout() {
      return await logout();
    }
  }
};
</script>
