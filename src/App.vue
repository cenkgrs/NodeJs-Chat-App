<script setup>
import SidebarComponent from './components/SidebarComponent.vue'
import ChatComponent from './components/ChatComponent.vue'
import io from 'socket.io-client';
import InfoComponent from './components/InfoComponent.vue';
  const socket = io('localhost:3000');

</script>

<template>
      <div class="row" style="height: 100%;">
        <div class="lg:col-3">
          <SidebarComponent :socket="socket"/>
        </div>
        <div class="lg:col-6">
          <ChatComponent :socket="socket"/>
        </div>
        <div class="lg:col-3">
          <InfoComponent/>
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
  height: 100%;
}
body {
  height: 100vh;
}
</style>
