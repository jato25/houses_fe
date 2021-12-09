<template>
  <div id="InmueblesDisp">
    <h2>Inmuebles Disponibles</h2>
    <div class="container-table">
      <table>
        <tr>
          <th>Dueño</th>
          <th>Area</th>
          <th>Precio</th>
          <th>Categoria</th>
          <th>Descripción</th>
          <th>Arrendar</th>
        </tr>
        <tr v-for="inmueble in inmueblesDisponibles" :key="inmueble.id">
          <td>{{ inmueble.propietario }}</td>
          <td>{{ inmueble.area }}</td>
          <td>{{ inmueble.precio }}</td>
          <td>{{ inmueble.categoria }}</td>
          <td>{{ inmueble.descripcion }}</td>
          <button v-on:click="crearArrendamiento(inmueble.id)">Arrendar</button>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import gql from "graphql-tag";
export default {
  name: "Account",
  data: function () {
    return {
      inmueblesDisponibles: [],
    };
  },
  apollo: {
    inmueblesDisponibles: {
      query: gql`
        query InmueblesDisponibles {
          inmueblesDisponibles {
            propietario
            area
            precio
            categoria
            descripcion
            disponible
            id
          }
        }
      `,
    },
  },
  created: function () {
    this.$apollo.queries.inmueblesDisponibles.refetch();
  },
  methods: {
    crearArrendamiento: async function (inmuebleId) {
      if (
        localStorage.getItem("token_access") === null ||
        localStorage.getItem("token_refresh") === null
      ) {
        this.$emit("logOut");
        return;
      }
      localStorage.setItem("token_access", "");
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation ($refresh: String!) {
              refreshToken(refresh: $refresh) {
                access
              }
            }
          `,
          variables: {
            refresh: localStorage.getItem("token_refresh"),
          },
        })
        .then((result) => {
          localStorage.setItem("token_access", result.data.refreshToken.access);
        })
        .catch((error) => {
          this.$emit("logOut");
          return;
        });

      await this.$apollo
        .mutate({
          mutation: gql`
            mutation CreateArrendamiento($arrendamiento: ArrendamientoInput!) {
              createArrendamiento(arrendamiento: $arrendamiento) {
                arrendatario
              }
            }
          `,
          variables: {
            arrendamiento: {
              id_inmueble: inmuebleId,
              arrendatario: localStorage.getItem("username"),
            },
          },
        })
        .then((result) => {
          alert("Transacción realizada de Manera Correcta");
          this.$apollo.queries.inmueblesDisponibles.refetch();
        })
        .catch((error) => {
          alert("Error creando arrendamiento");
        });
    },
  },
};
</script>


<style>
#InmueblesDisp {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
#InmueblesDisp .container-table {
  width: 50%;
  max-height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
}
#InmueblesDisp table {
  width: 100%;
  border-collapse: collapse;

  border: 1px solid rgba (0, 0, 0, 0.3);
}
#InmueblesDisp table td,
#InmueblesDisp table th {
  border: 1px solid #ddd;

  padding: 8px;
}
#InmueblesDisp table tr:nth-child(even) {
  background-color: #f2f2f2;
}
#InmueblesDisp table tr:hover {
  background-color: #ddd;
}
#InmueblesDisp table th {
  padding-top: 12px;
  padding-bottom: 12px;

  text-align: left;
  background-color: crimson;

  color: white;
}
#InmueblesDisp > h2 {
  color: #283747;
  font-size: 25px;
}

#InmueblesDisp button {
  width: 100px;
  height: 20px;

  color: #e5e7e9;
  background: #283747;
  border: 1px solid #e5e7e9;

  border-radius: 5px;
  padding: 0px 5px;
  margin: 5px 0 25px 0;
}

#InmueblesDisp button:hover {
  color: #e5e7e9;
  background: crimson;
  border: 1px solid #283747;
}
</style>