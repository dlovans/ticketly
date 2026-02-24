<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    let { isOpen = false, onClose, onSave, error = "" } = $props();

    let formData = $state({
        email: "",
        companyName: "",
        name: "",
        productName: "",
        website: "",
    });

    let isSending = $state(false);
    let isSent = $state(false);

    async function handleSubmit() {
        if (!formData.email || isSending) return;
        isSending = true;
        try {
            await onSave(formData);
            isSent = true;
            formData = {
                email: "",
                companyName: "",
                name: "",
                productName: "",
                website: "",
            };
            setTimeout(() => {
                isSent = false;
                isSending = false;
                onClose();
            }, 1500);
        } catch {
            isSending = false;
        }
    }

    function handleClose() {
        if (isSending) return;
        isSent = false;
        isSending = false;
        onClose();
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
    <div
        class="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-md flex items-center justify-center p-4"
        transition:fade={{ duration: 200 }}
        onclick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
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
                    <h3 class="text-xl font-bold text-gray-900">
                        Add New Client
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                        Send an invite to onboard a client.
                    </p>
                </div>
                <button
                    onclick={handleClose}
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

            {#if isSent}
                <!-- Success State -->
                <div class="p-12 flex flex-col items-center justify-center text-center" transition:fade={{ duration: 200 }}>
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-green-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-900">Invite Sent!</h3>
                    <p class="text-sm text-gray-500 mt-1">They'll receive an email to join Ticketly.</p>
                </div>
            {:else}
                <!-- Scrollable Content -->
                <div class="p-8 space-y-6 overflow-y-auto">
                    <div class="space-y-1.5">
                        <label
                            for="email"
                            class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                        >
                            Email Address <span class="text-indigo-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            bind:value={formData.email}
                            placeholder="client@company.com"
                            class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                            required
                            disabled={isSending}
                        />
                        {#if error}
                            <p class="text-xs text-red-500 font-medium">{error}</p>
                        {:else}
                            <p class="text-xs text-gray-400 flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    class="w-3 h-3"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                They'll receive an email invite to join.
                            </p>
                        {/if}
                    </div>

                    <div class="space-y-1.5">
                        <label
                            for="companyName"
                            class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                        >
                            Company Name
                        </label>
                        <input
                            type="text"
                            id="companyName"
                            bind:value={formData.companyName}
                            placeholder="Acme Corp"
                            class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                            disabled={isSending}
                        />
                    </div>

                    <div class="grid grid-cols-2 gap-5">
                        <div class="space-y-1.5">
                            <label
                                for="name"
                                class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                            >
                                Client Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                bind:value={formData.name}
                                placeholder="John Doe"
                                class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                                disabled={isSending}
                            />
                        </div>
                        <div class="space-y-1.5">
                            <label
                                for="productName"
                                class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                            >
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="productName"
                                bind:value={formData.productName}
                                placeholder="SaaS Platform"
                                class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                                disabled={isSending}
                            />
                        </div>
                    </div>

                    <div class="space-y-1.5">
                        <label
                            for="website"
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
                                id="website"
                                bind:value={formData.website}
                                class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all pl-20 px-4 py-3"
                                placeholder="www.example.com"
                                disabled={isSending}
                            />
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div
                    class="p-6 border-t border-gray-100 bg-white flex justify-end gap-3"
                >
                    <button
                        onclick={handleClose}
                        disabled={isSending}
                        class="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-all shadow-sm disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onclick={handleSubmit}
                        disabled={!formData.email || isSending}
                        class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl hover:from-indigo-500 hover:to-indigo-400 shadow-md shadow-indigo-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {#if isSending}
                            <span class="flex items-center gap-2">
                                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </span>
                        {:else}
                            Send Invite
                        {/if}
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
