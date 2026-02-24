<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    let { isOpen = false, onClose, onSave, freelancers = [] } = $props();

    let formData = $state({
        title: "",
        description: "",
        priority: "Low",
        freelancerId: "",
    });

    let selectedFreelancer = $derived(
        freelancers.find((f) => f.uid === formData.freelancerId) || null,
    );

    function handleSubmit() {
        if (!formData.title.trim() || !formData.freelancerId) return;
        onSave({
            ...formData,
            freelancerName: selectedFreelancer?.name || "",
        });
        formData = { title: "", description: "", priority: "Low", freelancerId: "" };
        onClose();
    }
</script>

{#if isOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
    <div
        class="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-md flex items-center justify-center p-4"
        transition:fade={{ duration: 200 }}
        onclick={(e) => { if (e.target === e.currentTarget) onClose(); }}
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
                        New Ticket
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                        Create a support request for your freelancer.
                    </p>
                </div>
                <button
                    onclick={onClose}
                    class="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                    aria-label="Close"
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

            <!-- Content -->
            <div class="p-8 space-y-6 overflow-y-auto">
                <!-- Freelancer -->
                <div class="space-y-1.5">
                    <label
                        for="freelancer"
                        class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                        Assign to <span class="text-indigo-500">*</span>
                    </label>
                    {#if freelancers.length === 0}
                        <p class="text-sm text-gray-400 italic py-2">
                            No freelancers connected. Accept an invite first.
                        </p>
                    {:else}
                        <select
                            id="freelancer"
                            bind:value={formData.freelancerId}
                            class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3 cursor-pointer"
                        >
                            <option value="" disabled>Select a freelancer</option>
                            {#each freelancers as f}
                                <option value={f.uid}>{f.name}</option>
                            {/each}
                        </select>
                    {/if}
                </div>

                <!-- Title -->
                <div class="space-y-1.5">
                    <label
                        for="title"
                        class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                        Title <span class="text-indigo-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        bind:value={formData.title}
                        placeholder="Brief summary of the issue"
                        class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3"
                        required
                    />
                </div>

                <!-- Description -->
                <div class="space-y-1.5">
                    <label
                        for="description"
                        class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        bind:value={formData.description}
                        placeholder="Provide details about the issue..."
                        rows="4"
                        class="block w-full rounded-xl border-transparent bg-gray-50 text-gray-900 text-sm focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all px-4 py-3 resize-none"
                    ></textarea>
                </div>

                <!-- Priority -->
                <div class="space-y-1.5">
                    <label
                        class="block text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                        Priority
                    </label>
                    <div class="grid grid-cols-4 gap-2">
                        {#each ["Low", "Medium", "High", "Emergency"] as priority}
                            {@const isSelected = formData.priority === priority}
                            {@const colorMap = {
                                Low: isSelected ? "bg-green-600 border-green-600 text-white" : "border-gray-100 text-gray-600 hover:border-green-200",
                                Medium: isSelected ? "bg-yellow-500 border-yellow-500 text-white" : "border-gray-100 text-gray-600 hover:border-yellow-200",
                                High: isSelected ? "bg-red-500 border-red-500 text-white" : "border-gray-100 text-gray-600 hover:border-red-200",
                                Emergency: isSelected ? "bg-red-700 border-red-700 text-white" : "border-gray-100 text-gray-600 hover:border-red-200",
                            }}
                            <button
                                type="button"
                                onclick={() => (formData.priority = priority)}
                                class="px-2 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 {colorMap[priority]}"
                            >
                                {priority}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div
                class="p-6 border-t border-gray-100 bg-white flex justify-end gap-3"
            >
                <button
                    onclick={onClose}
                    class="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-all shadow-sm"
                >
                    Cancel
                </button>
                <button
                    onclick={handleSubmit}
                    disabled={!formData.title.trim() || !formData.freelancerId}
                    class="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl hover:from-indigo-500 hover:to-indigo-400 shadow-md shadow-indigo-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    Create Ticket
                </button>
            </div>
        </div>
    </div>
{/if}
