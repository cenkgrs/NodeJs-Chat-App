<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { defineEmits, emit } from 'vue';

defineEmits('loginStatus');

const errorMessage = ref('');
const username = ref('');

const login = async () => {

    emit('set user', {username: username.value});

    try {
        const response = await axios.post('localhost:3000/login', {
            username: username.value,
        });

        emit('loginStatus', {status: true, username: username.value, token: response.data.token});

        errorMessage.value = '';
    } catch (error) {
        errorMessage.value = 'Invalid username or password';
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <Card class="w-96 p-6">
            <template #title>
                Login
            </template>
            <template #content>
                <form @submit.prevent="login" class="flex flex-col gap-4">
                    <div>
                        <label for="username" class="block text-gray-700">Username</label>
                        <InputText v-model="username" id="username" class="w-full" required />
                    </div>
                    <Button type="submit" label="Login" class="w-full" />
                </form>
                <p v-if="errorMessage" class="mt-2 text-red-500 text-sm text-center">{{ errorMessage }}</p>
            </template>
        </Card>
    </div>
</template>