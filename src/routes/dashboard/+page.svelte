<script>
    import { getContext } from "svelte";
    const dashboardState = getContext("dashboard");
    let tickets = [
        {
            id: "101",
            title: "Login page throwing 500 error",
            priority: "High",
            status: "Open",
            date: "2023-10-27",
            client: "Acme Corp",
        },
        {
            id: "102",
            title: "Update landing page text",
            priority: "Low",
            status: "In Progress",
            date: "2023-10-26",
            client: "Globex",
        },
        {
            id: "103",
            title: "Fix mobile responsiveness in header",
            priority: "Medium",
            status: "Resolved",
            date: "2023-10-25",
            client: "Soylent Corp",
        },
        {
            id: "104",
            title: "Add PayPal integration",
            priority: "Medium",
            status: "Open",
            date: "2023-10-28",
            client: "Acme Corp",
        },
    ];

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

    function getStatusColor(status) {
        switch (status) {
            case "Open":
                return "bg-blue-100 text-blue-800";
            case "In Progress":
                return "bg-purple-100 text-purple-800";
            case "Resolved":
                return "bg-green-100 text-green-800";
            case "Closed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }
</script>

<div class="mb-8 flex items-center justify-between">
    <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500">Overview of recent tickets.</p>
    </div>
    {#if dashboardState.mode === "client"}
        <button
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            Create Ticket
        </button>
    {/if}
</div>

<div class="overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
        {#each tickets as ticket}
            <li>
                <a
                    href="/dashboard/tickets/{ticket.id}"
                    class="block hover:bg-gray-50"
                >
                    <div class="px-4 py-4 sm:px-6">
                        <div class="flex items-center justify-between">
                            <p
                                class="truncate text-sm font-medium text-indigo-600"
                            >
                                #{ticket.id} - {ticket.title}
                            </p>
                            <div class="ml-2 flex flex-shrink-0">
                                <span
                                    class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 {getPriorityColor(
                                        ticket.priority,
                                    )}"
                                >
                                    {ticket.priority}
                                </span>
                            </div>
                        </div>
                        <div class="mt-2 sm:flex sm:justify-between">
                            <div class="sm:flex">
                                <p
                                    class="flex items-center text-sm text-gray-500 mr-6"
                                >
                                    <svg
                                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    {ticket.client}
                                </p>
                                <p
                                    class="flex items-center text-sm text-gray-500"
                                >
                                    <span
                                        class="inline-flex rounded-full px-2 text-xs font-semibold leading-5 {getStatusColor(
                                            ticket.status,
                                        )}"
                                    >
                                        {ticket.status}
                                    </span>
                                </p>
                            </div>
                            <div
                                class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                            >
                                <svg
                                    class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <p>
                                    <time datetime={ticket.date}
                                        >{ticket.date}</time
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</div>
