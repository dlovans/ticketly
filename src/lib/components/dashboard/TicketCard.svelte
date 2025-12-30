<script>
    export let ticket;
    export let hasUnread = false;
    export let onClick;

    function getPriorityColor(priority) {
        switch (priority) {
            case "High":
                return "bg-red-100 text-red-800";
            case "Medium":
                return "bg-yellow-100 text-yellow-800";
            case "Low":
                return "bg-green-100 text-green-800";
            case "Emergency":
                return "bg-red-200 text-red-900";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }

    // Determine visual style based on status
    $: isResolved = ["Resolved", "Closed"].includes(ticket.status);
</script>

<li
    class="group block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 {isResolved
        ? 'opacity-75 grayscale hover:grayscale-0 hover:opacity-100 bg-gray-50/50'
        : ''}"
>
    <button
        type="button"
        class="block w-full text-left relative focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-xl"
        on:click={() => onClick(ticket)}
    >
        <div class="px-4 py-4 sm:px-6">
            <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <!-- Left Side: Avatar & Info -->
                <div class="flex items-start gap-4 min-w-0">
                    <!-- Avatar -->
                    <div class="flex-shrink-0 relative">
                        <span
                            class="inline-flex h-10 w-10 items-center justify-center rounded-xl {isResolved
                                ? 'bg-gray-100 text-gray-500'
                                : 'bg-indigo-50 text-indigo-700'}"
                        >
                            <span class="text-sm font-bold leading-none"
                                >{ticket.client
                                    .substring(0, 2)
                                    .toUpperCase()}</span
                            >
                        </span>

                        {#if hasUnread}
                            <span
                                class="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"
                            ></span>
                        {/if}
                    </div>

                    <div class="min-w-0 flex-1">
                        <div class="flex items-center gap-2 flex-wrap">
                            <p
                                class="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate {isResolved
                                    ? 'line-through decoration-gray-400 group-hover:no-underline'
                                    : ''}"
                            >
                                {ticket.title}
                            </p>
                        </div>
                        {#if ticket.statusMessage}
                            <p
                                class="text-xs text-gray-500 italic mt-0.5 truncate"
                            >
                                "{ticket.statusMessage}"
                            </p>
                        {/if}
                        <div
                            class="flex items-center gap-3 text-xs text-gray-500 mt-1"
                        >
                            <span class="font-medium text-gray-700"
                                >{ticket.client}</span
                            >
                            <span class="text-gray-300">&bull;</span>
                            <span>#{ticket.id}</span>
                            <span class="text-gray-300">&bull;</span>
                            <time datetime={ticket.date}>{ticket.date}</time>
                        </div>
                    </div>
                </div>

                <!-- Right Side: Status badges -->
                <div
                    class="flex flex-shrink-0 items-center gap-2 self-start sm:self-center ml-14 sm:ml-0"
                >
                    <span
                        class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset {ticket.status ===
                        'Open'
                            ? 'ring-blue-500/10 bg-blue-50 text-blue-700'
                            : ticket.status === 'In Progress'
                              ? 'ring-purple-500/10 bg-purple-50 text-purple-700'
                              : ticket.status === 'Resolved'
                                ? 'ring-green-500/10 bg-green-50 text-green-700'
                                : 'ring-gray-500/10 bg-gray-100 text-gray-600'}"
                    >
                        {ticket.status}
                    </span>
                    {#if !isResolved}
                        <span
                            class="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium {getPriorityColor(
                                ticket.priority,
                            )}"
                        >
                            {ticket.priority}
                        </span>
                    {/if}
                </div>
            </div>
        </div>
    </button>
</li>
