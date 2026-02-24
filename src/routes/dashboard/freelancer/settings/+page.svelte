<script>
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import ProfileSettings from "$lib/components/freelanceSettings/ProfileSettings.svelte";
    import NotificationSettings from "$lib/components/freelanceSettings/NotificationSettings.svelte";
    import { auth } from "$lib/firebase/client.js";
    import { getUserProfile, updateUserProfile } from "$lib/firebase/user.js";

    let userProfile = $state({
        name: "",
        email: "",
        avatar: "",
        phone: "",
    });

    let userSettings = $state({
        showPhoneNumber: true,
        notificationDelay: "1h",
    });

    onMount(async () => {
        const user = auth.currentUser;
        if (user) {
            const profile = await getUserProfile(user.uid);
            if (profile) {
                userProfile.name = profile.displayName || "";
                userProfile.email = profile.email || user.email || "";
                userProfile.phone = profile.phone || "";
            } else {
                userProfile.email = user.email || "";
            }
        }
    });

    async function handleSaveProfile(data) {
        const user = auth.currentUser;
        if (!user) return;
        await updateUserProfile(user.uid, {
            displayName: data.name,
            phone: data.phone,
        });
    }
</script>

<div class="p-8 pb-20 max-w-5xl mx-auto space-y-8" in:fade>
    <!-- Page Header -->
    <div>
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="text-gray-500 mt-2">
            Manage your freelancer profile and notification preferences.
        </p>
    </div>

    <!-- Profile Settings -->
    <ProfileSettings bind:profile={userProfile} onSave={handleSaveProfile} />

    <!-- Notification Settings -->
    <NotificationSettings bind:settings={userSettings} />
</div>
