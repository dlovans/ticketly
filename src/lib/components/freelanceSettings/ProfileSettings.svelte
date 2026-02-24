<script>
    import { fade } from "svelte/transition";

    let {
        profile = $bindable({
            name: "",
            email: "",
            avatar: "",
            phone: "",
        }),
        onSave,
    } = $props();

    let isEditing = $state(false);
    let isSaving = $state(false);
    let tempName = $state(profile.name);
    let tempPhone = $state(profile.phone);

    async function handleSave() {
        isSaving = true;
        profile.name = tempName;
        profile.phone = tempPhone;
        if (onSave) await onSave({ name: tempName, phone: tempPhone });
        isSaving = false;
        isEditing = false;
    }
</script>

<div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
    <div class="flex items-center justify-between mb-8">
        <div>
            <h2 class="text-xl font-bold text-gray-900">Profile Settings</h2>
            <p class="text-sm text-gray-500 mt-1">
                Manage your personal information.
            </p>
        </div>
        {#if !isEditing}
            <button
                on:click={() => {
                    tempName = profile.name;
                    isEditing = true;
                }}
                class="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
            >
                Edit Profile
            </button>
        {/if}
    </div>

    <div class="space-y-6 max-w-xl">
        <!-- Avatar Section -->
        <div class="flex items-center gap-6">
            <div class="relative group">
                <div
                    class="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-md shadow-indigo-100"
                >
                    {profile.name.charAt(0)}
                </div>
                {#if isEditing}
                    <button
                        class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        aria-label="Change Avatar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="white"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                            />
                        </svg>
                    </button>
                {/if}
            </div>
            {#if isEditing}
                <div class="text-sm text-gray-500">
                    <p>Click avatar to upload.</p>
                    <p class="text-xs text-gray-400">
                        JPG, PNG or GIF (Max 2MB)
                    </p>
                </div>
            {/if}
        </div>

        <!-- Inputs -->
        <div class="space-y-4">
            <div>
                <label
                    for="profile-name"
                    class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    id="profile-name"
                    bind:value={tempName}
                    disabled={!isEditing}
                    class="block w-full rounded-xl border-transparent {isEditing
                        ? 'bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10'
                        : 'bg-transparent px-0 border-0 text-gray-900'} text-sm transition-all py-3 px-4 font-medium"
                />
            </div>

            <div>
                <label
                    for="profile-phone"
                    class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5"
                >
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="profile-phone"
                    bind:value={profile.phone}
                    disabled={!isEditing}
                    placeholder="555-0123"
                    class="block w-full rounded-xl border-transparent {isEditing
                        ? 'bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10'
                        : 'bg-transparent px-0 border-0 text-gray-900'} text-sm transition-all py-3 px-4 font-medium"
                />
            </div>

            <div>
                <label
                    for="profile-email"
                    class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5"
                >
                    Email Address (Read-Only)
                </label>
                <div class="relative">
                    <input
                        type="email"
                        id="profile-email"
                        value={profile.email}
                        disabled
                        class="block w-full rounded-xl border-transparent bg-gray-100 text-gray-400 cursor-not-allowed text-sm py-3 px-4"
                    />
                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-4 h-4 text-gray-400"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <p class="text-xs text-gray-400 mt-2">
                    Contact support to change your email.
                </p>
            </div>
        </div>

        {#if isEditing}
            <div class="flex justify-end gap-3 pt-4" transition:fade>
                <button
                    on:click={() => {
                        isEditing = false;
                        tempName = profile.name;
                    }}
                    class="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                >
                    Cancel
                </button>
                <button
                    on:click={handleSave}
                    class="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
                >
                    Save Changes
                </button>
            </div>
        {/if}
    </div>
</div>
