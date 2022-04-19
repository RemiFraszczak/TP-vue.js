<template>
  <button v-on:click="page(numPage++)">Suivant</button>
  <button v-on:click="page(numPage--)">Retour</button>
  <div v-if="!!characters.length" class="characters-list"></div>
   <!--wrapper pour aligner les images -->
  <div class="wrapper">
    <div v-for="character in getCharacter" :key="character.name" class="characters-search">
      <div class="image">
        <img :src="character.image" />
      </div>
      <div class="name">Nom : {{ character.name }}</div>
      <div><router-link :to="{name :'test', params:{id : character.id}}">more infos</router-link></div>
    </div>
  </div>
  
</template>

<script>

import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      characters: [],
      numPage: 1
    };
  },
  created() {
    this.fetch();
  },

  computed: {
    getCharacter(){
      return this.characters
    }
  },
  methods: {
    addCharacter() {
      this.$store.commit("addCharacter", this.newCharacter);
      this.newCharacter = "";
    },
    page(id) {
      const url = `https://rickandmortyapi.com/api/character/?page=${id}`
      
         return axios
        .get(url)
        .then((res) => {
          this.characters = res.data.results;
          this.pages = res.data.info.pages;
        })
        .catch(console.log);
    },
    fetch() {
      const params = {
    
      }
      /*je récupere les données des personnages */
      const url = "https://rickandmortyapi.com/api/character/";
      return axios
        .get(url, { params })
        .then((res) => {
          this.characters = res.data.results;
          this.pages = res.data.info.pages;
        })
        .catch(console.log);
    },
    
    async LoadCharacter(count) {
      await axios
        .get(`https://rickandmortyapi.com/api/character/${pages}/`)
        .then((res) => {
          this.currentCharacter = res.data;
        })
        .catch(console.log);
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
