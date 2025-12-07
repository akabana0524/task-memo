import { useFirebaseAuth } from "./Auth";
import { watch } from "vue";
import { useHybridStorage } from "./HybridStorage";
export function useWorkspace() {
    const { user } = useFirebaseAuth();
    const { value:users } = useHybridStorage('users', {});
    const { value:workspaces } = useHybridStorage('workspaces', {});
    console.debug('useWorkspace');
    watch(user, (_user) => {
        console.debug('useWorkspace watch user', {_user});
        if (_user) {
            if(!users.value[_user.uid]) {
                const workspaceId = crypto.randomUUID();
                console.debug('useWorkspace create users', {workspaceId});
                users.value[_user.uid] = {
                    workspaceIds: [
                        workspaceId
                    ]
                };
                console.debug('useWorkspace create workspace', {workspaceId});
                workspaces.value[workspaceId] = {
                    users: [_user.uid]
                };
            }

        }
        else {
            
        }
    });
    return {};
}