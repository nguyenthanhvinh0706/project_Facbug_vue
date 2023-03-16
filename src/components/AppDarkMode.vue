<template>
  <div class="noselect" :style="{ cursor: 'pointer' }" @click="changeMode">
    <span style = "font-size: 25px; margin-right: 10px;" v-if="mode === 'light'">☀️ <i  class="fa fa-toggle-on" aria-hidden="true"></i></span>
    <span style = "font-size: 25px; margin-right: 10px;" v-else>🌑 <i  class="fa fa-toggle-off" aria-hidden="true"></i></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: localStorage.getItem("dark-mode") || "light"
    };
  },
  methods: {
    changeMode() {
      if (this.mode === "dark") {
        this.setLightMode();
      } else {
        this.setDarkMode();
      }

      localStorage.setItem("dark-mode", this.mode);
    },
    setLightMode() {
      this.mode = "light";
      document.body.classList.remove("dark");
    },
    setDarkMode() {
      this.mode = "dark";
      document.body.classList.add("dark");
    }
  },
  mounted() {
    if (localStorage.getItem("dark-mode") === "dark") {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }

    localStorage.setItem("dark-mode", this.mode);
  }
};
</script>

<style>
.noselect {
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
}
</style>
