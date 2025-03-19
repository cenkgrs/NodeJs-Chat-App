<script setup>
import SidebarComponent from './components/SidebarComponent.vue'
import ChatComponent from './components/ChatComponent.vue'
import io from 'socket.io-client';
import InfoComponent from './components/InfoComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import { ref } from 'vue';

const socket = io('localhost:3000');

const login = ref(false);

const log = () => {
	login.value = true;
}

</script>

<template>
	<div class="grid" v-if="login">

		<div class="lg:col-3">
			<SidebarComponent :socket="socket" />
		</div>
		<div class="lg:col-6">
			<ChatComponent :socket="socket" />
		</div>
		<div class="lg:col-3">
			<InfoComponent />
		</div>
	</div>

	<LoginComponent v-else :loginStatus="log(res)"/>
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
