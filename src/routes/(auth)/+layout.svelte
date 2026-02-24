<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { auth, onAuthStateChanged } from "$lib/firebase/client.js";

    let { children } = $props();

    onMount(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in, redirect to dashboard
                goto("/dashboard");
            } else {
                // User is not logged in, unsubscribe from listener
                unsubscribe();
            }
        });

        // Cleanup on unmount
        return () => unsubscribe();
    });
</script>

{@render children()}
