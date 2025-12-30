<script>
    import { fade } from "svelte/transition";
    import ClientProfileSettings from "$lib/components/clientSettings/ClientProfileSettings.svelte";

    let userProfile = {
        name: "Jane Doe",
        companyName: "Acme Corp",
        email: "jane@acmecorp.com",
    };
</script>

<div class="p-8 pb-20 max-w-5xl mx-auto space-y-8" in:fade>
    <!-- Page Header -->
    <div>
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="text-gray-500 mt-2">Manage your account information.</p>
    </div>

    <!-- Profile Settings -->
    <ClientProfileSettings bind:profile={userProfile} />
</div>
