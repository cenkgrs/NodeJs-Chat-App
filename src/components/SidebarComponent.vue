<script setup>

    import {ref, onMounted, defineProps, toRefs} from 'vue';

    const props = defineProps({
        socket: Object
    });

    const { socket } = toRefs(props);

    const roomCode = ref('');

    const createRoom = () => {
        socket.emit('create room',  {
            user: 'cenk',
        });
    }

    onMounted(() => {
        socket.on('room created', (socket_id) => {

            roomCode.value = socket_id;
        });
    });

</script>

<template>
    <div class="sidebar">
        <span>Oda Kodunuz: {{ roomCode }}</span>
        <button @click="createRoom">Create Room</button>
    </div>
</template>