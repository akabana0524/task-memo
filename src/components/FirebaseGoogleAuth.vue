<template>
    <div>
        <div v-if="user">
            <v-avatar size="36px">
                <v-img v-if="user.photoURL" alt="Avatar" :src="user.photoURL" />
            </v-avatar>
            {{ user.displayName ||
                user.email }}
            <v-btn icon @click="signOutUser"><v-icon>mdi-logout</v-icon></v-btn>
        </div>
        <div v-else>
            <v-btn icon @click="signInWithGoogle"><v-icon>mdi-login</v-icon></v-btn>
        </div>
        <p v-if="authError" class="error-message">{{ authError }}</p>
    </div>
</template>


<script lang="ts" setup>
import { useFirebaseAuth } from '../composables/Auth';

const {user, authError, signInWithGoogle, signOutUser} = useFirebaseAuth();

</script>