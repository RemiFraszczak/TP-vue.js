<template>
<div v-if="!!characters.length" class="characters-list"></div>
<div class="wrapper">
 <div v-for="character in characters" :key="character.name" class="characters-search">
  <div class="image">
  <img :src="character.image"/>
  </div>
  <div class="name">Nom : {{character.name}}</div>
  <div class="sexe">Sexe : {{character.gender}}</div>
  <div class="status">Status : {{character.status}}</div>
  <div class="episode">Nb Episodes : {{character.episode.length}}</div>
      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";

export default defineComponent({
    data() {
        return {
          characters: [],
        };
      },
      created() {
        this.fetch();
      },
      methods: {
        addCharacter() {
          this.$store.commit('addCharacter', this.newCharacter);
          this.newCharacter = '';
        },
        fetch() {
          const params = {
            page: this.page,
          };

          const url = 'https://rickandmortyapi.com/api/character';
          return axios
            .get(url, { params })
            .then((res) => {
              this.characters = res.data.results;
              this.pages = res.data.info.pages;
              console.log(res.data.info);
            })
            .catch(console.log);
        },
        async fetchOne(id) {
          const result = await axios.get(
            `https://rickandmortyapi.com/api/character/${id}/`,
          );
          this.currentCharacter = result.data;
          console.log(this.currentCharacter);
        },
      },
    });
</script>

<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
#app {
  background-position: left center !important;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  margin-top: 60px;
}
</style>
