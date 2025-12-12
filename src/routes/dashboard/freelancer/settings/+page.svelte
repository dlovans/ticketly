<script>
    import { fade } from "svelte/transition";
    import ProfileSettings from "$lib/components/freelanceSettings/ProfileSettings.svelte";
    import NotificationSettings from "$lib/components/freelanceSettings/NotificationSettings.svelte";

    let userProfile = {
        name: "John Smith",
        email: "john@ticketly.app",
        avatar: "",
        phone: "",
        countryCode: "US",
    };

    let userSettings = {
        showPhoneNumber: true,
        notificationDelay: "1h",
    };
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
    <ProfileSettings bind:profile={userProfile} />

    <!-- Notification Settings -->
    <NotificationSettings bind:settings={userSettings} />
</div>
