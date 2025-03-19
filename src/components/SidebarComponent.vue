<script setup>

import { ref, onMounted, defineProps } from 'vue';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

const props = defineProps(['socket']);

const rooms = ref(['General', 'Sports', 'Tech', 'Gaming']);
const room = ref('General');

const roomName = ref('');

const roomCode = ref('');

const createRoom = () => {
    props.socket.emit('create room', {
        username: 'cenk',
    });

    roomName.value = '';
}

const joinRoom = () => {
    props.socket.emit('joinRoom', room.value);
};

onMounted(() => {
    props.socket.on('room created', (data) => {

        rooms.value = data.rooms;

        rooms.value.push({ id: data.socket_id, name: data.name });

        roomCode.value = data.socket_id;
    });
});

</script>

<template>
    <div class="sidebar py-3 px-5">
        <div v-if="rooms.length">
            <ul>
                <li v-for="r in rooms" :key="r">{{ r }}</li>
            </ul>
        </div>

        <div v-else>
            <span>No rooms created yet</span>
        </div>

        <Dropdown v-model="room" :options="rooms" placeholder="Select a room" class="w-full mb-3" @change="joinRoom" />

        <InputText placeholder="Room Name" v-model="roomName"/>
        <Button label="Create Room" icon="pi pi-plus" severity="info" @click="createRoom" />
    </div>
</template>