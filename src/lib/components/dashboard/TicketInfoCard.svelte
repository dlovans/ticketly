<script>
    import { getContext } from "svelte";
    import { slide } from "svelte/transition";

    export let ticket;
    export let isFreelancer = false;
    export let onStatusUpdate;

    let isExpanded = false; // For mobile collapse state

    // Status color helper
    $: statusColor =
        ticket.status === "Open"
            ? "bg-blue-50 text-blue-700 ring-blue-600/20"
            : ticket.status === "In Progress"
              ? "bg-purple-50 text-purple-700 ring-purple-600/20"
              : ticket.status === "Resolved"
                ? "bg-green-50 text-green-700 ring-green-600/20"
                : "bg-gray-50 text-gray-600 ring-gray-500/10";

    // Priority color helper
    $: priorityColor =
        ticket.priority === "High"
            ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10"
            : ticket.priority === "Medium"
              ? "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/10"
              : ticket.priority === "Low"
                ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/10"
                : "bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10";

    function toggleExpand() {
        isExpanded = !isExpanded;
    }
</script>

<div
    class="flex flex-col h-auto md:h-full bg-white border-b md:border-b-0 md:border-r border-gray-100 w-full md:w-96 shrink-0 transition-all duration-300"
>
    <!-- Header / Mobile Toggle -->
    <div
        class="p-4 md:p-6 border-b border-gray-50 flex items-center justify-between cursor-pointer md:cursor-default hover:bg-gray-50 md:hover:bg-white transition-colors"
        on:click={toggleExpand}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === "Enter" && toggleExpand()}
    >
        <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 mb-1">
                <span class="text-[10px] font-mono text-gray-400"
                    >#{ticket.id}</span
                >
                <span
                    class="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset {statusColor}"
                >
                    {ticket.status}
                </span>
            </div>
            <h1 class="text-base font-bold text-gray-900 truncate pr-2">
                {ticket.title}
            </h1>
        </div>
        <!-- Mobile Chevron -->
        <button class="md:hidden text-gray-400">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 transition-transform duration-200 {isExpanded
                    ? 'rotate-180'
                    : ''}"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd"
                />
            </svg>
        </button>
    </div>

    <!-- Scrollable Content (Collapsible on Mobile, Scrollable on Desktop) -->
    <div
        class="overflow-hidden md:overflow-y-auto md:flex-1"
        class:hidden={!isExpanded}
        class:md:block={true}
    >
        <div class="p-6 space-y-8">
            <!-- Description -->
            <div>
                <h3
                    class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3"
                >
                    Description
                </h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                    {ticket.description}
                </p>
            </div>

            <!-- Metadata Grid (Dates & Priority) -->
            <div class="grid grid-cols-2 gap-6">
                <div>
                    <h3
                        class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                    >
                        Created
                    </h3>
                    <p class="text-sm font-medium text-gray-900">
                        {ticket.date || ticket.createdDate}
                    </p>
                </div>
                {#if ticket.resolvedDate}
                    <div>
                        <h3
                            class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                        >
                            Resolved
                        </h3>
                        <p class="text-sm font-medium text-gray-900">
                            {ticket.resolvedDate}
                        </p>
                    </div>
                {/if}
                <div>
                    <h3
                        class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                    >
                        Priority
                    </h3>
                    <span
                        class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium {priorityColor}"
                    >
                        {ticket.priority}
                    </span>
                </div>
            </div>

            <!-- Client Info -->
            <div class="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <h3
                    class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3"
                >
                    Client
                </h3>
                <div class="flex items-center gap-3">
                    <div
                        class="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-sm"
                    >
                        {ticket.clientAvatar ||
                            ticket.client.substring(0, 2).toUpperCase()}
                    </div>
                    <div class="min-w-0">
                        <p class="text-sm font-bold text-gray-900 truncate">
                            {ticket.client}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Status Control (Freelancer Only) -->
            {#if isFreelancer}
                <div class="pt-2 space-y-4">
                    <!-- Status Message Input -->
                    <div>
                        <label
                            for="status-msg"
                            class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
                        >
                            Status Message
                        </label>
                        <textarea
                            id="status-msg"
                            bind:value={ticket.statusMessage}
                            rows="5"
                            placeholder="e.g. Waiting for client response..."
                            class="block w-full rounded-lg border-gray-200 text-xs focus:ring-indigo-600 focus:border-indigo-600 bg-gray-50/50 p-3 resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <h3
                            class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3"
                        >
                            Update Connectivity
                        </h3>
                        <div class="grid grid-cols-2 gap-2">
                            {#each ["Open", "In Progress", "Resolved", "Closed"] as status}
                                <button
                                    on:click={() => onStatusUpdate(status)}
                                    class="px-3 py-2.5 rounded-lg text-xs font-semibold border transition-all duration-200
                                    {ticket.status === status
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200 transform scale-[1.02]'
                                        : 'bg-white border-gray-100 text-gray-600 hover:border-gray-300 hover:text-gray-900'}"
                                >
                                    {status}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            {:else}
                <!-- Client View (Read Only Status) -->
                <div class="pt-2 space-y-3">
                    {#if ticket.statusMessage}
                        <div
                            class="p-3 bg-gray-50 rounded-xl border border-gray-100 italic text-xs text-gray-600"
                        >
                            "{ticket.statusMessage}"
                        </div>
                    {/if}
                    <div
                        class="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-center"
                    >
                        <p class="text-xs text-indigo-900">
                            Current Status: <span class="font-bold"
                                >{ticket.status}</span
                            >
                        </p>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
