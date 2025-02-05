<script setup>
  import ChatComponent from './components/ChatComponent.vue'
</script>

<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <ChatComponent />
        </div>
      </div>
    </div>
  </div>
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
