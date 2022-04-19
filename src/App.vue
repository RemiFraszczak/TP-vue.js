
<template>
  <router-view/>
</template>

<script>
import Character from "./components/Character.vue";
import Info from "./components/Info.vue";
export default {
  components: {
    Character,
    Info,
  },
};
</script>