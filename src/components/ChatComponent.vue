<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps(['socket']);

const username = "User" + Math.floor(Math.random) * 1000;
const message = ref('');

const messages = ref([]);

const sendMessage = (e) => {
    e.preventDefault();

    props.socket.emit('chat message', {
        username: username.value,
        message: message.value
    });

    message.value = '';
}

onMounted(() => {
    props.socket.on('get message', (data) => {
        messages.value.push(data);
    });

});


</script>

<template>
    <div class="flex flex-col h-screen p-4">
        <Card class="w-full max-w-2xl mx-auto p-4">
            <template #title>Chat</template>
            <template #content>
                <div class="chat-box overflow-y-auto h-96 border p-2 mb-4">
                    <div v-for="(msg, index) in messages" :key="index" class="mb-2">
                        <strong>{{ msg.username }}:</strong> {{ msg.text }}
                    </div>
                </div>
                <div class="flex gap-2">
                    <InputText v-model="message" placeholder="Type a message..." class="w-full" />
                    <Button label="Send" @click="sendMessage" />
                </div>
            </template>
        </Card>
    </div>
</template>

<style>
body {
    margin: 0;
    padding-bottom: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

#form {
    background: rgba(0, 0, 0, 0.15);
    padding: 0.25rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 3rem;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
}

#input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 2rem;
    margin: 0.25rem;
}

#input:focus {
    outline: none;
}

#form>button {
    background: #333;
    border: none;
    padding: 0 1rem;
    margin: 0.25rem;
    border-radius: 3px;
    outline: none;
    color: #fff;
}
</style>