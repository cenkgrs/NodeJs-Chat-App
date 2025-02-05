<script setup>
import io from 'socket.io-client';
import {ref, onMounted} from 'vue';

const socket = io('localhost:3000');

const user = ref('Cenk');
const message = ref('');

const messages = ref([]);

console.log(io('localhost:3000'));


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
            <div class="card-body">
                <div class="messages" v-for="(msg, index) in messages" :key="index">
                    <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <form @submit.prevent="sendMessage">
                <div class="gorm-group">
                    <label for="user">User:</label>
                    <input type="text" v-model="user" class="form-control">
                </div>
                <div class="gorm-group pb-3">
                    <label for="message">Message:</label>
                    <input type="text" v-model="message" class="form-control">
                </div>
                <button type="submit" class="btn btn-success">Send</button>
            </form>
        </div>
    </div>
</template>