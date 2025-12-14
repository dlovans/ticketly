<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    export let isOpen = false;
    export let onClose;
    export let onSave;
    export let client = null; // Client object to edit

    let formData = {
        email: "",
        companyName: "",
        name: "",
        productName: "",
        website: "",
    };

    $: if (client) {
        formData = { ...client };
    }

    function handleSubmit() {
        onSave(formData);
        onClose();
    }
</script>

{#if isOpen && client}
    <div
        class="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-md flex items-center justify-center p-4"
        transition:fade={{ duration: 200 }}
        on:click|self={onClose}
        role="dialog"
        aria-modal="true"
    >
        <div
            class="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            transition:fly={{ y: 20, duration: 300, easing: quintOut }}
        >
            <!-- Header -->
            <div
                class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white"
            >
                <div>
                    <h3 class="text-xl font-bold text-gray-900">Edit Client</h3>
                    <p class="text-sm text-gray-500 mt-1">
                        Update client details and information.
                    </p>
                </div>
                <button
                    on:click={onClose}
                    class="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-5 h-5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <!-- Scrollable Content -->
            <div class="p-8 space-y-6 overflow-y-auto">
                <div class="space-y-1.5">
                    <label
                        for="edit-email"
                        class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                        Email Address (Read-only)
                    </label>
                    <input
                        type="email"
                        id="edit-email"
                        value={formData.email}
                        disabled
                        class="block w-full rounded-xl border-transparent bg-gray-100 text-gray-400 text-sm cursor-not-allowed px-4 py-3"
                    />
                </div>

                <div class="space-y-1.5">
                    <label
                        for="edit-companyName"
                        class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                        Company Name
                    </label>
                    <input
                        type="text"
                        id="edit-companyName"
                        bind:value={formData.companyName}
                        class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                    />
                </div>

                <div class="grid grid-cols-2 gap-5">
                    <div class="space-y-1.5">
                        <label
                            for="edit-name"
                            class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                        >
                            Client Name
                        </label>
                        <input
                            type="text"
                            id="edit-name"
                            bind:value={formData.name}
                            class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                        />
                    </div>
                    <div class="space-y-1.5">
                        <label
                            for="edit-productName"
                            class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="edit-productName"
                            bind:value={formData.productName}
                            class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                        />
                    </div>
                </div>

                <div class="space-y-1.5">
                    <label
                        for="edit-website"
                        class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                        Website
                    </label>
                    <div class="relative rounded-xl shadow-sm group">
                        <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"
                        >
                            <span
                                class="text-gray-400 text-sm font-medium group-focus-within:text-indigo-500 transition-colors"
                                >https://</span
                            >
                        </div>
                        <input
                            type="text"
                            id="edit-website"
                            bind:value={formData.website}
                            class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all pl-20 px-4 py-3"
                        />
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div
                class="p-6 border-t border-gray-100 bg-white flex justify-end gap-3"
            >
                <button
                    on:click={onClose}
                    class="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-all shadow-sm"
                >
                    Cancel
                </button>
                <button
                    on:click={handleSubmit}
                    class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl hover:from-indigo-500 hover:to-indigo-400 shadow-md shadow-indigo-200 transition-all transform hover:-translate-y-0.5"
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
{/if}
