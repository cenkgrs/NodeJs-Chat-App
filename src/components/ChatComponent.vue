<script setup>
import {ref, onMounted} from 'vue';

const { socket } = defineProps(['socket'])

const user = ref('Cenk');
const message = ref('');

const messages = ref([]);

const sendMessage = (e) => {
    e.preventDefault();

    console.log({user: user.value,
        message: message.value});

    socket.emit('chat message', {
        user: user.value,
        message: message.value
    });

    message.value = '';
}

onMounted(() => {
    socket.on('get message', (data) => {
        messages.value.push(data);
        //messages = [...messages, data];
        // you can also do this.messages.push(data)
    });

});


</script>

<template>
        
    <div class="card mt-3">
        <div class="card-body">
            <div class="card-title">
                <h3>Chat Group</h3>
                <hr>
            </div>
        </div>
    </div>

    <ul class="messages">
        <p v-for="(msg, index) in messages" :key="index">
            <span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}
        </p>
    </ul>

    <form id="form" @submit.prevent="sendMessage">
        <div class="form-group pb-3">
            <input id="input" type="text" v-model="message" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Send</button>
    </form>

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