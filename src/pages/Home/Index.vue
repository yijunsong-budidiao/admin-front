<template>
  <div>
    <Editor />
    <div class="container">
      <Eline />
      <Epie />
      <Ebar />
    </div>
  </div>
</template>

<script>
import Eline from "./Eline";
import Epie from "./Epie";
import Ebar from "./Ebar";
import Editor from "./Editor";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    Eline,
    Epie,
    Ebar,
    Editor,
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>