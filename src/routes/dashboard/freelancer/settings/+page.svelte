<script>
    import { fade } from "svelte/transition";
    import { getContext, onMount } from "svelte";
    import ProfileSettings from "$lib/components/freelanceSettings/ProfileSettings.svelte";
    import NotificationSettings from "$lib/components/freelanceSettings/NotificationSettings.svelte";
    import { getUserProfile, updateUserProfile } from "$lib/firebase/user.js";

    const getUser = getContext("user");
    let user = $derived(getUser?.());

    let userProfile = $state({
        name: "",
        email: "",
        avatar: "",
        phone: "",
    });

    let userSettings = $state({
        showPhoneNumber: true,
        notification_delays: {
            Emergency: { type: "immediate" },
            High: { type: "immediate" },
            Medium: { type: "delay", minutes: 30 },
            Low: { type: "on_login" },
        },
    });

    $effect(() => {
        if (!user?.uid) return;
        getUserProfile(user.uid).then((profile) => {
            if (profile) {
                userProfile.name = profile.displayName || "";
                userProfile.email = profile.email || user.email || "";
                userProfile.phone = profile.phone || "";
                userSettings.showPhoneNumber = profile.showPhoneNumber ?? true;
                userSettings.notification_delays = profile.notification_delays || userSettings.notification_delays;
            } else {
                userProfile.email = user.email || "";
            }
        });
    });

    async function handleSaveProfile(data) {
        if (!user?.uid) return;
        await updateUserProfile(user.uid, {
            displayName: data.name,
            phone: data.phone,
        });
    }

    async function handleSaveSettings() {
        if (!user?.uid) return;
        await updateUserProfile(user.uid, {
            showPhoneNumber: userSettings.showPhoneNumber,
            notification_delays: userSettings.notification_delays,
        });
    }
</script>

<div class="p-8 pb-20 max-w-5xl mx-auto space-y-8" in:fade>
    <!-- Page Header -->
    <div>
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="text-gray-500 mt-2">
            Manage your freelancer profile and privacy preferences.
        </p>
    </div>

    <!-- Profile Settings -->
    <ProfileSettings bind:profile={userProfile} onSave={handleSaveProfile} />

    <!-- Notification Settings -->
    <NotificationSettings
        bind:settings={userSettings}
        onSave={handleSaveSettings}
    />
</div>
