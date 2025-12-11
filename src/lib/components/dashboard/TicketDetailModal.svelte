<script>
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import TicketInfoCard from "./TicketInfoCard.svelte";
    import ChatInterface from "./ChatInterface.svelte";
    import { quintOut } from "svelte/easing";

    export let ticket;
    export let isOpen = false;
    export let onClose;
    export let isFreelancer = false;
    export let onStatusUpdate; // Pass through to InfoCard

    let isLoading = true;

    // Reset loading state when ticket changes or modal opens
    $: if (isOpen && ticket) {
        isLoading = true;
        setTimeout(() => {
            isLoading = false;
        }, 800); // 800ms mock loading
    }
</script>

{#if isOpen && ticket}
    <!-- Backdrop -->
    <div
        class="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        transition:fade={{ duration: 200 }}
        on:click|self={onClose}
        role="dialog"
        aria-modal="true"
    >
        <!-- Modal Container (Full Height/Width minus padding) -->
        <div
            class="bg-white w-full h-full max-w-[1600px] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
            transition:fly={{ y: 20, duration: 300, easing: quintOut }}
        >
            <!-- Close Button (Absolute Top Right) -->
            <button
                class="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors backdrop-blur-md border border-gray-100 shadow-sm"
                on:click={onClose}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {#if isLoading}
                <!-- Loading State -->
                <div
                    class="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50"
                >
                    <div class="relative w-16 h-16 mb-4">
                        <div
                            class="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full animate-pulse"
                        ></div>
                        <div
                            class="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
                        ></div>
                    </div>
                    <p class="text-gray-500 font-medium animate-pulse">
                        Loading Ticket Details...
                    </p>
                </div>
            {:else}
                <!-- Content (Reuse 3-Column Layout Logic) -->
                <!-- Note: The modal IS the layout container, so we flex directly -->
                <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
                    <!-- 1. Info Card (Sidebar) -->
                    <TicketInfoCard {ticket} {isFreelancer} {onStatusUpdate} />

                    <!-- 2. Chat Interface (Main Area) -->
                    <div
                        class="flex-1 flex flex-col min-w-0 bg-gray-50/30 relative"
                    >
                        <!-- We essentially just render the ChatInterface here, maybe with a header if we wanted -->
                        <!-- Passing a mock 'me' / 'them' context is tricky without data but ChatInterface handles messages -->
                        <ChatInterface
                            messages={[
                                {
                                    id: 1,
                                    text: "System: Connected to ticket channel.",
                                    sender: "System",
                                    timestamp: "Now",
                                    isMe: false,
                                },
                                {
                                    id: 2,
                                    text: "Previous chat history would load here...",
                                    sender: "System",
                                    timestamp: "Now",
                                    isMe: false,
                                },
                            ]}
                            onSendMessage={(text) => console.log("Sent", text)}
                        />
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}
