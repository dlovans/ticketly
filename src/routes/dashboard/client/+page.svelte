<script>
    import { onMount, onDestroy, getContext } from "svelte";
    import TicketCard from "$lib/components/dashboard/TicketCard.svelte";
    import TicketDetailModal from "$lib/components/dashboard/TicketDetailModal.svelte";
    import NewTicketModal from "$lib/components/dashboard/NewTicketModal.svelte";
    import { listenToClientTickets, createTicket } from "$lib/firebase/tickets.js";
    import { listenToTicketMessages, sendTicketMessage } from "$lib/firebase/ticketChat.js";
    import { listenToFreelancers } from "$lib/firebase/relationships.js";

    const dashboardState = getContext("dashboard");
    const getUser = getContext("user");

    let user = $derived(getUser?.());

    let tickets = $state([]);
    let chatMessages = $state([]);
    let myFreelancers = $state([]);
    let isNewTicketOpen = $state(false);
    let unsubTickets;
    let unsubChat;
    let unsubFreelancers;

    const priorityMap = { Emergency: 3, High: 2, Medium: 1, Low: 0 };

    // --- Filter State ---
    let searchTerm = $state("");
    let sortBy = $state("Date");
    let filterStatus = $state("All");

    let filteredTickets = $derived.by(() => {
        let result = [...tickets];

        if (filterStatus !== "All") {
            result = result.filter((t) => t.status === filterStatus);
        }

        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (t) =>
                    t.title.toLowerCase().includes(term) ||
                    t.client.toLowerCase().includes(term) ||
                    t.id.includes(term),
            );
        }

        return result.sort((a, b) => {
            if (sortBy === "Date") return new Date(b.date) - new Date(a.date);
            if (sortBy === "Priority") return priorityMap[b.priority] - priorityMap[a.priority];
            return 0;
        });
    });

    let activeTickets = $derived(
        filteredTickets.filter((t) => ["Open", "In Progress"].includes(t.status)),
    );
    let resolvedTickets = $derived(
        filteredTickets.filter((t) => ["Resolved", "Closed"].includes(t.status)),
    );

    // --- Modal State ---
    let selectedTicketId = $state(null);
    let isModalOpen = $state(false);
    let selectedTicket = $derived(tickets.find((t) => t.id === selectedTicketId) || null);

    onMount(() => {
        if (!user?.uid) return;
        unsubTickets = listenToClientTickets(user.uid, (data) => {
            tickets = data;
        });
        unsubFreelancers = listenToFreelancers(user.email, (data) => {
            myFreelancers = data;
        });
    });

    onDestroy(() => {
        unsubTickets?.();
        unsubChat?.();
        unsubFreelancers?.();
    });

    function handleTicketClick(ticket) {
        selectedTicketId = ticket.id;
        isModalOpen = true;
        unsubChat?.();
        unsubChat = listenToTicketMessages(ticket.id, user.uid, (msgs) => {
            chatMessages = msgs;
        });
    }

    function handleModalClose() {
        isModalOpen = false;
        unsubChat?.();
        unsubChat = null;
        setTimeout(() => {
            selectedTicketId = null;
            chatMessages = [];
        }, 300);
    }

    function handleStatusUpdate(newStatus) {
        // Clients cannot update ticket status
    }

    async function handleSendMessage(text) {
        if (!selectedTicket) return;
        await sendTicketMessage(selectedTicket.id, user.uid, user.displayName, text, selectedTicket.status);
    }

    async function handleCreateTicket(data) {
        await createTicket({
            title: data.title,
            description: data.description,
            priority: data.priority,
            clientId: user.uid,
            client: user.displayName || user.email,
            freelancerId: data.freelancerId,
            freelancer: data.freelancerName,
        });

        const freelancer = myFreelancers.find((f) => f.uid === data.freelancerId);
        if (freelancer?.email) {
            try {
                // Use the scheduling endpoint which will send immediately for High/Emergency,
                // schedule 30 min for Medium, and queue for next login for Low.
                await fetch("/api/notifications/schedule", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        to: freelancer.email,
                        clientName: user.displayName || user.email,
                        ticketTitle: data.title,
                        priority: data.priority,
                        freelancerId: data.freelancerId,
                    }),
                });
            } catch (err) {
                console.error("Failed to schedule ticket notification:", err);
            }
        }
    }
</script>

<div
    class="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
>
    <div>
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">Tickets</h1>
        <p class="mt-1 text-xs text-gray-500 max-w-2xl">
            Track and manage your support requests.
        </p>
    </div>
    {#if dashboardState.mode === "client"}
        <button
            onclick={() => (isNewTicketOpen = true)}
            class="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-gray-900 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
            <svg
                class="mr-2 -ml-0.5 h-3.5 w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
            New Ticket
        </button>
    {/if}
</div>

<!-- Filter Bar -->
<div class="mb-6 flex flex-col sm:flex-row gap-4">
    <div class="relative flex-1 max-w-md">
        <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
            <svg
                class="h-4 w-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
        <input
            type="text"
            bind:value={searchTerm}
            class="block w-full rounded-xl border-0 py-2.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 bg-white"
            placeholder="Search tickets..."
        />
    </div>

    <div class="flex gap-2">
        <div class="relative">
            <select
                bind:value={sortBy}
                class="appearance-none block w-full rounded-xl border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 bg-white font-medium cursor-pointer"
            >
                <option value="Date">Sort: Date</option>
                <option value="Priority">Sort: Priority</option>
            </select>
            <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
            >
                <svg
                    class="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    ><path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    /></svg
                >
            </div>
        </div>

        <div class="relative">
            <select
                bind:value={filterStatus}
                class="appearance-none block w-full rounded-xl border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6 bg-white font-medium cursor-pointer"
            >
                <option value="All">Status: All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
            </select>
            <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
            >
                <svg
                    class="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    ><path
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    /></svg
                >
            </div>
        </div>
    </div>
</div>

<div class="space-y-8">
    {#if activeTickets.length > 0}
        <div class="space-y-4">
            <div class="flex items-center justify-between px-2 mb-2">
                <h3
                    class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                    Active Tickets <span
                        class="ml-1 bg-indigo-100 text-indigo-700 py-0.5 px-2 rounded-full text-[10px]"
                        >{activeTickets.length}</span
                    >
                </h3>
            </div>

            <ul role="list" class="space-y-2">
                {#each activeTickets as ticket (ticket.id)}
                    <TicketCard
                        {ticket}
                        hasUnread={ticket.hasUnread}
                        onClick={handleTicketClick}
                    />
                {/each}
            </ul>
        </div>
    {/if}

    {#if resolvedTickets.length > 0}
        <div class="space-y-4">
            <div class="flex items-center justify-between px-2 mb-2">
                <h3
                    class="text-xs font-semibold text-gray-400 uppercase tracking-wider"
                >
                    Resolved History <span
                        class="ml-1 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-[10px]"
                        >{resolvedTickets.length}</span
                    >
                </h3>
            </div>

            <ul role="list" class="space-y-2">
                {#each resolvedTickets as ticket (ticket.id)}
                    <TicketCard
                        {ticket}
                        hasUnread={ticket.hasUnread}
                        onClick={handleTicketClick}
                    />
                {/each}
            </ul>
        </div>
    {/if}

    {#if activeTickets.length === 0 && resolvedTickets.length === 0}
        <div class="text-center py-12">
            <p class="text-sm text-gray-500">
                No tickets found matching your filters.
            </p>
        </div>
    {/if}
</div>

<TicketDetailModal
    isOpen={isModalOpen}
    ticket={selectedTicket}
    isFreelancer={false}
    onClose={handleModalClose}
    onStatusUpdate={handleStatusUpdate}
    messages={chatMessages}
    onSendMessage={handleSendMessage}
/>

<NewTicketModal
    isOpen={isNewTicketOpen}
    onClose={() => (isNewTicketOpen = false)}
    onSave={handleCreateTicket}
    freelancers={myFreelancers}
/>
