<script>
    import { fade } from "svelte/transition";
    import { getContext, onMount, onDestroy } from "svelte";
    import FreelancerSelector from "$lib/components/dashboard/clientChat/FreelancerSelector.svelte";
    import GeneralChatInterface from "$lib/components/dashboard/freelanceChat/GeneralChatInterface.svelte";

    const dashboardState = getContext("dashboard");

    onMount(() => {
        dashboardState.layout = "full";
    });

    onDestroy(() => {
        dashboardState.layout = "standard";
    });

    // Mock Data - Freelancers that the client can chat with
    let freelancers = [
        {
            id: 1,
            name: "Alex Developer",
            productName: "Acme SaaS",
            lastMessage: "I'll push the fix tonight.",
            lastMessageTime: "5m",
            unreadCount: 1,
            chatHistory: [
                {
                    id: 1,
                    text: "Hey Alex, how's the login bug fix going?",
                    isMe: true,
                    sender: "Me",
                    timestamp: "2:00 PM",
                },
                {
                    id: 2,
                    text: "Almost done! Just testing edge cases.",
                    isMe: false,
                    sender: "Alex",
                    timestamp: "2:05 PM",
                },
                {
                    id: 3,
                    text: "Great, when can we expect the update?",
                    isMe: true,
                    sender: "Me",
                    timestamp: "2:10 PM",
                },
                {
                    id: 4,
                    text: "I'll push the fix tonight.",
                    isMe: false,
                    sender: "Alex",
                    timestamp: "2:15 PM",
                },
            ],
        },
        {
            id: 2,
            name: "Maria Designer",
            productName: "Globex Portal",
            lastMessage: "Here are the new mockups",
            lastMessageTime: "2h",
            unreadCount: 0,
            chatHistory: [
                {
                    id: 1,
                    text: "Can you send over the updated dashboard designs?",
                    isMe: true,
                    sender: "Me",
                    timestamp: "11:00 AM",
                },
                {
                    id: 2,
                    text: "Here are the new mockups",
                    isMe: false,
                    sender: "Maria",
                    timestamp: "11:30 AM",
                },
            ],
        },
        {
            id: 3,
            name: "James Support",
            productName: "Acme SaaS",
            lastMessage: "",
            lastMessageTime: "",
            unreadCount: 0,
            chatHistory: [],
        },
    ];

    let selectedFreelancerId = $state(null);
    let selectedFreelancer = $derived(
        freelancers.find((f) => f.id === selectedFreelancerId),
    );

    function handleSelectFreelancer(id) {
        selectedFreelancerId = id;
        const freelancerIndex = freelancers.findIndex((f) => f.id === id);
        if (
            freelancerIndex !== -1 &&
            freelancers[freelancerIndex].unreadCount > 0
        ) {
            // Mock clear unread
            freelancers[freelancerIndex].unreadCount = 0;
        }
    }

    function handleSendMessage(text) {
        if (!selectedFreelancer) return;

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

        selectedFreelancer.chatHistory = [
            ...selectedFreelancer.chatHistory,
            newMessage,
        ];
        selectedFreelancer.lastMessage = text;
        selectedFreelancer.lastMessageTime = "Now";
    }

    function handleBack() {
        selectedFreelancerId = null;
    }

    let isListCollapsed = $state(false);
</script>

<div
    class="flex flex-col md:flex-row h-[calc(100vh-4rem)] md:absolute md:inset-4 md:h-auto md:m-0 bg-white md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
    in:fade
>
    <!-- Left Column: Freelancer List -->
    <div
        class="w-full flex-shrink-0 border-r border-gray-100 bg-white transition-all duration-300 ease-in-out {isListCollapsed
            ? 'md:w-20'
            : 'md:w-80'} {selectedFreelancerId ? 'hidden md:block' : 'block'}"
    >
        <FreelancerSelector
            {freelancers}
            {selectedFreelancerId}
            onSelectFreelancer={handleSelectFreelancer}
            isCollapsed={isListCollapsed}
            onToggleCollapse={() => (isListCollapsed = !isListCollapsed)}
        />
    </div>

    <!-- Right Column: Chat Interface -->
    <div
        class="flex-1 flex flex-col bg-gray-50/20 {selectedFreelancerId
            ? 'flex'
            : 'hidden md:flex'}"
    >
        {#if selectedFreelancer}
            <GeneralChatInterface
                messages={selectedFreelancer.chatHistory}
                recipientName={selectedFreelancer.name}
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
                        Choose a freelancer from the list to start chatting.
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>
