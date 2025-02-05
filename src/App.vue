<script setup>
import SidebarComponent from './components/SidebarComponent.vue'
import ChatComponent from './components/ChatComponent.vue'
import io from 'socket.io-client';

  const socket = io('localhost:3000');

</script>

<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-3 offset-md-3">
          <SidebarComponent :socket="socket"/>
        </div>
        <div class="col-md-6 offset-md-3">
          <ChatComponent :socket="socket"/>
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
