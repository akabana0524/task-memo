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
import { ref, onMounted } from 'vue';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

// リアクティブな状態変数
const user = ref<User | null>(null);
const authError = ref(null);

// Google認証プロバイダを初期化
const provider = new GoogleAuthProvider();

// Googleでログインする関数
const signInWithGoogle = async () => {
    authError.value = null; // エラーをリセット
    try {
        const result = await signInWithPopup(auth, provider);
        // ログイン成功
        console.log("Google ログイン成功:", result.user);
    } catch (error: any) {
        // エラーハンドリング
        authError.value = error.message;
        console.error("Google ログインエラー:", error);
    }
};

// ログアウトする関数
const signOutUser = async () => {
    authError.value = null; // エラーをリセット
    try {
        await signOut(auth);
        // user.value は onAuthStateChanged で更新されるため、ここでは特に更新不要
        console.log("ログアウト成功");
    } catch (error: any) {
        authError.value = error.message;
        console.error("ログアウトエラー:", error);
    }
};

// コンポーネントがマウントされた時に認証状態を監視
onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser; // 現在のユーザー情報で更新
        console.log("認証状態変更:", currentUser ? currentUser.email : "未ログイン");
    });
});
</script>