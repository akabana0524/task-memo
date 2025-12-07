import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { onMounted, ref } from 'vue';
export function useFirebaseAuth() {

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
    onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser; // 現在のユーザー情報で更新
            console.log("認証状態変更:", currentUser ? currentUser.email : "未ログイン");
        });
    });
    return { user, authError, signInWithGoogle, signOutUser };
}