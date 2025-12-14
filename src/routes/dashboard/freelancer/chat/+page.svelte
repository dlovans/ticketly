<script>
    import { fade } from "svelte/transition";
    import { getContext, onMount, onDestroy } from "svelte";
    import ClientSelector from "$lib/components/dashboard/freelanceChat/ClientSelector.svelte";
    import GeneralChatInterface from "$lib/components/dashboard/freelanceChat/GeneralChatInterface.svelte";

    const dashboardState = getContext("dashboard");

    onMount(() => {
        dashboardState.layout = "full";
    });

    onDestroy(() => {
        dashboardState.layout = "standard";
    });

    // Mock Data
    let clients = [
        {
            id: 1,
            name: "Alice Corp",
            company: "Alice Corp Inc.",
            isOnline: true,
            lastMessage: "Sounds good, thanks!",
            lastMessageTime: "2m",
            unreadCount: 0,
            chatHistory: [
                {
                    id: 1,
                    text: "Hi there! I have a question about the invoice.",
                    isMe: false,
                    sender: "Alice",
                    timestamp: "10:30 AM",
                },
                {
                    id: 2,
                    text: "Sure, what's up?",
                    isMe: true,
                    sender: "Me",
                    timestamp: "10:32 AM",
                },
                {
                    id: 3,
                    text: "Is it possible to pay via wire transfer?",
                    isMe: false,
                    sender: "Alice",
                    timestamp: "10:33 AM",
                },
                {
                    id: 4,
                    text: "Yes, I can send you the details.",
                    isMe: true,
                    sender: "Me",
                    timestamp: "10:35 AM",
                },
                {
                    id: 5,
                    text: "Sounds good, thanks!",
                    isMe: false,
                    sender: "Alice",
                    timestamp: "10:36 AM",
                },
            ],
        },
        {
            id: 2,
            name: "Bob Design",
            company: "Bob's Studio",
            isOnline: false,
            lastMessage: "Can we reschedule our call?",
            lastMessageTime: "1h",
            unreadCount: 2,
            chatHistory: [
                {
                    id: 1,
                    text: "Hey, are we still on for today?",
                    isMe: true,
                    sender: "Me",
                    timestamp: "9:00 AM",
                },
                {
                    id: 2,
                    text: "Can we reschedule our call?",
                    isMe: false,
                    sender: "Bob",
                    timestamp: "9:15 AM",
                },
            ],
        },
        {
            id: 3,
            name: "Charlie Tech",
            company: "Charlie Tech Solutions",
            isOnline: true,
            lastMessage: "",
            lastMessageTime: "",
            unreadCount: 0,
            chatHistory: [],
        },
    ];

    let selectedClientId = $state(null);
    let selectedClient = $derived(
        clients.find((c) => c.id === selectedClientId),
    );

    function handleSelectClient(id) {
        selectedClientId = id;
        const clientIndex = clients.findIndex((c) => c.id === id);
        if (clientIndex !== -1 && clients[clientIndex].unreadCount > 0) {
            // Mock clear unread
        }
    }

    function handleSendMessage(text) {
        if (!selectedClient) return;

        const newMessage = {
            id: Date.now(),
            text,
            isMe: true,
            sender: "Me",
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        selectedClient.chatHistory = [
            ...selectedClient.chatHistory,
            newMessage,
        ];
        selectedClient.lastMessage = text;
        selectedClient.lastMessageTime = "Now";
    }

    function handleBack() {
        selectedClientId = null;
    }

    let isListCollapsed = $state(false);
</script>

<div
    class="flex flex-col md:flex-row h-[calc(100vh-4rem)] md:absolute md:inset-4 md:h-auto md:m-0 bg-white md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    in:fade
>
    <!-- Left Column: Client List -->
    <div
        class="w-full flex-shrink-0 border-r border-gray-100 bg-white transition-all duration-300 ease-in-out {isListCollapsed
            ? 'md:w-20'
            : 'md:w-80'} {selectedClientId ? 'hidden md:block' : 'block'}"
    >
        <ClientSelector
            {clients}
            {selectedClientId}
            onSelectClient={handleSelectClient}
            isCollapsed={isListCollapsed}
            onToggleCollapse={() => (isListCollapsed = !isListCollapsed)}
        />
    </div>

    <!-- Right Column: Chat Interface -->
    <div
        class="flex-1 flex flex-col bg-gray-50/20 {selectedClientId
            ? 'flex'
            : 'hidden md:flex'}"
    >
        {#if selectedClient}
            <GeneralChatInterface
                messages={selectedClient.chatHistory}
                recipientName={selectedClient.name}
                onSendMessage={handleSendMessage}
                onBack={handleBack}
            />
        {:else}
            <!-- Empty State (Desktop Only) -->
            <div
                class="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 space-y-4"
            >
                <div
                    class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center animate-pulse"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10 text-gray-300"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.355 0-2.697-.056-4.024-.166-1.132-.091-1.976-1.057-1.976-2.192v-4.286c0-.427.12-.829.33-1.172m6.29 2.171h-4.29V6.447a1.696 1.696 0 011.695-1.696h2.595c.937 0 1.696.76 1.696 1.696v2.24z"
                        />
                    </svg>
                </div>
                <div class="text-center">
                    <h3 class="text-lg font-bold text-gray-900">
                        Select a Conversation
                    </h3>
                    <p class="text-sm text-gray-500">
                        Choose a client from the list to start chatting.
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>
