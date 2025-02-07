<script setup>

    import {ref, onMounted, defineProps} from 'vue';
    import Button from 'primevue/button';

    const props = defineProps(['socket']);

    const rooms = ref([]);

    const roomCode = ref('');

    const createRoom = () => {
        props.socket.emit('create room',  {
            user: 'cenk',
        });
    }

    onMounted(() => {
        props.socket.on('room created', (data) => {

            rooms.value.push({id: data.socket_id, name: data.name});

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

        <Button label="Create Room" icon="pi pi-plus" severity="info" @click="createRoom" />
    </div>
</template>