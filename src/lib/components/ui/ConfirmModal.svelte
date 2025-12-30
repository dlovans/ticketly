<script>
    import { fade, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    export let isOpen = false;
    export let title = "Confirm Action";
    export let message = "Are you sure you want to proceed?";
    export let confirmLabel = "Confirm";
    export let cancelLabel = "Cancel";
    export let confirmVariant = "danger"; // 'danger' | 'primary'
    export let onConfirm = () => {};
    export let onCancel = () => {};

    function handleConfirm() {
        onConfirm();
        isOpen = false;
    }

    function handleCancel() {
        onCancel();
        isOpen = false;
    }

    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    }

    function handleKeydown(e) {
        if (e.key === "Escape") {
            handleCancel();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
    <div
        class="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4"
        transition:fade={{ duration: 150 }}
        on:click={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
    >
        <div
            class="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            transition:fly={{ y: 10, duration: 200, easing: quintOut }}
        >
            <!-- Header -->
            <div class="px-6 pt-6 pb-4">
                <div class="flex items-start gap-4">
                    <!-- Icon -->
                    <div
                        class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center {confirmVariant ===
                        'danger'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-indigo-100 text-indigo-600'}"
                    >
                        {#if confirmVariant === "danger"}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                        {:else}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-5 h-5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                />
                            </svg>
                        {/if}
                    </div>
                    <!-- Text -->
                    <div class="flex-1 min-w-0">
                        <h3
                            id="modal-title"
                            class="text-lg font-bold text-gray-900"
                        >
                            {title}
                        </h3>
                        <p class="text-sm text-gray-500 mt-1">
                            {message}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div
                class="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100"
            >
                <button
                    on:click={handleCancel}
                    class="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-all shadow-sm"
                >
                    {cancelLabel}
                </button>
                <button
                    on:click={handleConfirm}
                    class="px-4 py-2 text-sm font-semibold text-white rounded-xl shadow-sm transition-all {confirmVariant ===
                    'danger'
                        ? 'bg-red-600 hover:bg-red-700 shadow-red-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'}"
                >
                    {confirmLabel}
                </button>
            </div>
        </div>
    </div>
{/if}
