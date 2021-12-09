<template>
  <div id="app" class="app">
    <div class="header">
      <h1>Inmobiliaria Grupo 3</h1>
      <nav>
        <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
        <button v-if="is_auth" v-on:click="loadInmuebles">Inmuebles</button>
        <button v-if="is_auth" v-on:click="loadInmueblesLibres">
          Inmuebles disponibles
        </button>
        <button v-if="is_auth" v-on:click="logOut">Cerrar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadLogIn">Iniciar Sesión</button>
        <button v-if="!is_auth" v-on:click="loadSignUp">Registrarse</button>
      </nav>
    </div>

    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>
  </div>
</template>




<script>
export default {
  name: "App",

  computed: {
    is_auth: {
      get: function () {
        return this.$route.meta.requiresAuth;
      },
      set: function () {},
    },
  },

  methods: {
    loadLogIn: function () {
      this.$router.push({ name: "logIn" });
    },

    loadSignUp: function () {
      this.$router.push({ name: "signUp" });
    },

    completedLogIn: function (data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      this.loadHome();
    },

    completedSignUp: function (data) {
      this.completedLogIn(data);
    },
    loadHome: function () {
      this.$router.push({ name: "home" });
    },

    loadInmuebles: function () {
      this.$router.push({ name: "inmuebles" });
    },
    loadInmueblesLibres: function () {
      this.$router.push({ name: "arrendamientos" });
    },
    logOut: function () {
      localStorage.clear();
      this.loadLogIn();
    },
  }
};
</script>



<style>
:root {
  --color1: #00fdff;
  --color2: #e45966;
  --color3: #001ea2;
  --color4: #73287a;
  --color5: #ff94cb;
}

body {
  margin: 0 0 0 0;
}

.header {
  margin: 0%;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;

  background-color: var(--color4);
  color: #e5e7e9;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  width: 30%;
  text-align: center;
}

.header nav {
  height: 100%;
  width: 30%;

  display: flex;
  justify-content: space-around;
  align-items: center;

  font-size: 20px;
}

.header nav button {
  color: #e5e7e9;
  background: var(--color4);
  border: 1px solid #e5e7e9;

  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
}

.header nav button:hover {
  color: var(--color4);
  background: #e5e7e9;
  border: 1px solid #e5e7e9;
}

.main-component {
  height: 75vh;
  margin: 0%;
  padding: 0%;

  background: #fdfefe;
}

.footer {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
  min-height: 100px;

  background-color: var(--color4);
  color: #e5e7e9;
}

.footer h2 {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  font-family: Helvetica, sans-serif;
}
</style>
