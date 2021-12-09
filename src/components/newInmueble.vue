<template>
  <div class="signUp_user">
    <div class="container_signUp_user">
      <h2>Registrarse</h2>

      <form v-on:submit.prevent="processNewInmueble">
        <input
          type="number"
          v-model="inmueble.area"
          placeholder="Area en m&sup2"  
        />
        <br />

        <input
          type="number"
          v-model="inmueble.precio"
          placeholder="Precio en COP"
        />
        <br />

        <select v-model="inmueble.categoria">
          <option value="" disabled selected hidden>Tipo de inmueble</option>
          <option value="Casa">Casa</option>
          <option value="Apto">Apto</option>
          <option value="Bodega">Bodega</option>

        </select>
        <br />

        <input
          type="text"
          v-model="inmueble.descripcion"
          placeholder="Descripción"
        />
        <br />

        <button type="submit">Registrar Inmueble</button>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "SignUp",
  data: function () {
    return {
      inmueble: {
        propietario: localStorage.getItem("username") || "none",
        area: "",
        precio: "",
        categoria: "",
        descripcion: "",
        disponible: true,
      },
    };
  },
  methods: {
    processNewInmueble: async function () {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateInmueble($inmueble: InmuebleInput!) {
              createInmueble(inmueble: $inmueble) {
                id
              }
            }
          `,
          variables: {
            inmueble: this.inmueble,
          },
        })
        .then((result) => {
          this.$router.push({name:"inmuebles"});
        })
        .catch((error) => {
          alert("ERROR: Fallo en el registro.");
        });
    },
  },
};
</script>
<style>
.signUp_user {
  margin: 0;
  padding: 0%;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container_signUp_user {
  border: 3px solid var(--color4);
  border-radius: 10px;
  width: 25%;
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signUp_user h2 {
  color: var(--color4);
}

.signUp_user form {
  width: 70%;
}

.signUp_user input {
  height: 40px;
  width: 100%;

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;

  border: 1px solid var(--color4);
}
.signUp_user select {
  height: 40px;
  width: 100%;

  box-sizing: border-box;
  padding: 10px 20px;
  margin: 5px 0;

  border: 1px solid var(--color4);
}

.signUp_user button {
  width: 100%;
  height: 40px;

  color: #e5e7e9;
  background: var(--color4);
  border: 1px solid #e5e7e9;

  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}

.signUp_user button:hover {
  color: #e5e7e9;
  background: var(--color2);
  border: 1px solid var(--color4);
}
</style>

