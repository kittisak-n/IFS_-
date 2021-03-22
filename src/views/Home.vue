<template>
  <div class="home">
    <img
      class="img-logo"
      src="https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/11/iclub-noGradient-CircleBk.png"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "Home",
  components: {},
};
</script>

<style>
.home {
  background-image: url("https://www.informatics.buu.ac.th/2020/wp-content/uploads/2018/07/NormalView.jpg") !important;

  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
