<script>
    import { getContext } from "svelte";
    import ModeSwitch from "./ModeSwitch.svelte";
    import { page } from "$app/stores";

    let { isOpen = $bindable(false) } = $props();

    const dashboardState = getContext("dashboard");

    const navigation = [
        {
            name: "Tickets",
            href: "/dashboard",
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
            name: "Clients",
            href: "/dashboard/clients",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        },
        {
            name: "Chat",
            href: "/dashboard/chat",
            icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        },
        {
            name: "Settings",
            href: "/dashboard/settings",
            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543 .826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
        },
    ];

    // Example logo - simplified text for now
</script>

<!-- Mobile Overlay -->
{#if isOpen}
    <div
        class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity md:hidden"
        onclick={() => (isOpen = false)}
        role="presentation"
    ></div>
{/if}

<!-- Sidebar -->
<aside
    class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:static md:translate-x-0 {isOpen
        ? 'translate-x-0'
        : '-translate-x-full'}"
>
    <div class="flex h-16 shrink-0 items-center px-6 border-b border-gray-100">
        <a href="/dashboard" class="flex items-center gap-2">
            <!-- Ticketly Logo Placeholder -->
            <div
                class="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold"
            >
                T
            </div>
            <span class="text-xl font-bold tracking-tight text-gray-900"
                >Ticketly</span
            >
        </a>
        <button class="ml-auto md:hidden" onclick={() => (isOpen = false)}>
            <svg
                class="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    </div>

    <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div class="px-4 mb-6">
            <ModeSwitch bind:mode={dashboardState.mode} />
        </div>

        <nav class="mt-2 flex-1 space-y-1 px-3">
            {#each navigation as item}
                {@const isClients =
                    item.name === "Clients" || item.name === "Freelancers"}
                {@const name = isClients
                    ? dashboardState.mode === "client"
                        ? "Freelancers"
                        : "Clients"
                    : item.name}
                {@const isActive = $page.url.pathname === item.href}

                <a
                    href={item.href}
                    class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors {isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    <svg
                        class="mr-3 h-5 w-5 flex-shrink-0 transition-colors {isActive
                            ? 'text-gray-900'
                            : 'text-gray-400 group-hover:text-gray-500'}"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d={item.icon}
                        />
                    </svg>
                    {name}
                </a>
            {/each}
        </nav>
    </div>

    <!-- User Profile Strip (Bottom) -->
    <div class="border-t border-gray-200 p-4">
        <div class="flex items-center">
            <div
                class="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-white"
            >
                JS
            </div>
            <div class="ml-3">
                <p
                    class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                >
                    John Smith
                </p>
                <p
                    class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                >
                    View Profile
                </p>
            </div>
        </div>
    </div>
</aside>
