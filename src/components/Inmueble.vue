<template>
  <div id="Inmuebles">
    <h2>Inmuebles</h2>
    <div class="container-table">
      <table>
        <tr>
          <th>Area</th>
          <th>Precio</th>
          <th>Categoria</th>
          <th>Descripción</th>
          <th>Disponible</th>
        </tr>
        <tr v-for="inmueble in inmueblesByUser" :key="inmueble.id">
          <td>{{ inmueble.area }}</td>
          <td>{{ inmueble.precio }}</td>
          <td>{{ inmueble.categoria }}</td>
          <td>{{ inmueble.descripcion }}</td>
          <td v-if="inmueble.disponible">Disponible</td>
          <td v-else>Ocupado</td>
        </tr>
      </table>
    </div>
  <button id="registrarInmueble" v-on:click="loadNewInmueble">Registrar inmueble</button>
  </div>
</template>


<script>
import gql from "graphql-tag";
export default {
  name: "Account",
  data: function () {
    return {
      username: localStorage.getItem("username") || "none",
      inmueblesByUser: [],
    };
  },
  apollo: {
    inmueblesByUser: {
      query: gql`
        query InmueblesByUser($username: String!) {
          inmueblesByUser(username: $username) {
            id
            area
            precio
            categoria
            descripcion
            disponible
          }
        }
      `,
      variables() {
        return {
          username: this.username,
        };
      },
    },
  },
  created: function () {
    this.$apollo.queries.inmueblesByUser.refetch();
  },
  methods: {
    loadNewInmueble: function () {
      this.$router.push({ name: "newInmueble" });
    },
  },
};
</script>


<style>
#Inmuebles {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
#Inmuebles .container-table {
  width: 50%;
  max-height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
}
#Inmuebles table {
  width: 100%;
  border-collapse: collapse;

  border: 1px solid rgba (0, 0, 0, 0.3);
}
#Inmuebles table td,
#Inmuebles table th {
  border: 1px solid #ddd;

  padding: 8px;
}
#Inmuebles table tr:nth-child(even) {
  background-color: #f2f2f2;
}
#Inmuebles table tr:hover {
  background-color: #ddd;
}
#Inmuebles table th {
  padding-top: 12px;
  padding-bottom: 12px;

  text-align: left;
  background-color: crimson;

  color: white;
}
#Inmuebles > h2 {
  color: #283747;
  font-size: 25px;
}

#registrarInmueble {
  width: 180px;
  height: 40px;

  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;

  border-radius: 5px;
  padding: 10px 25px;
  margin: 5px 0 25px 0;
}

#registrarInmueble:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>