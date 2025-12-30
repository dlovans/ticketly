<script>
    import { getContext } from "svelte";
    import ModeSwitch from "./ModeSwitch.svelte";
    import { page } from "$app/stores";
    import logo from "$lib/assets/logo.jpg";

    let { isOpen = $bindable(false) } = $props();

    const dashboardState = getContext("dashboard");

    let navigation = $derived([
        {
            name: "Tickets",
            href: `/dashboard/${dashboardState.mode === "client" ? "client" : "freelancer"}`,
            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        },
        {
            name: dashboardState.mode === "client" ? "Freelancers" : "Clients",
            href:
                dashboardState.mode === "freelancer"
                    ? "/dashboard/freelancer/clients"
                    : "/dashboard/client/freelancers",
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
        },
        {
            name: "Chat",
            href:
                dashboardState.mode === "freelancer"
                    ? "/dashboard/freelancer/chat"
                    : "/dashboard/client/chat",
            icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        },
        {
            name: "Settings",
            href:
                dashboardState.mode === "freelancer"
                    ? "/dashboard/freelancer/settings"
                    : "/dashboard/client/settings",
            icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543 .826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
        },
        ...(dashboardState.mode === "freelancer"
            ? [
                  {
                      name: "Billing",
                      href: "/dashboard/freelancer/billing",
                      icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
                  },
              ]
            : []),
    ]);

    import { goto } from "$app/navigation";

    function handleModeSwitch() {
        const newMode =
            dashboardState.mode === "freelancer" ? "client" : "freelancer";
        dashboardState.mode = newMode;
        localStorage.setItem("ticketly_mode", newMode);
        // Navigate
        if (newMode === "freelancer") goto("/dashboard/freelancer");
        if (newMode === "client") goto("/dashboard/client");
    }
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
    class="fixed z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out
    md:translate-x-0 md:static md:h-[calc(100vh-2rem)] md:m-4 md:rounded-3xl md:shadow-2xl md:border-0
    inset-y-0 left-0 w-64 border-r border-gray-100
    {isOpen ? 'translate-x-0' : '-translate-x-full'}"
>
    <div class="flex h-20 shrink-0 items-center px-8">
        <a href="/dashboard" class="flex items-center gap-3 group">
            <img
                src={logo}
                alt="Ticketly"
                class="h-10 w-10 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform object-cover"
            />
            <span class="text-xl font-bold tracking-tight text-gray-900"
                >Ticketly</span
            >
        </a>
        <button
            class="ml-auto md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-700"
            onclick={() => (isOpen = false)}
            aria-label="Close sidebar"
        >
            <svg
                class="h-6 w-6"
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

    <div class="flex flex-1 flex-col overflow-y-auto px-4 pb-4">
        <nav class="flex-1 space-y-1">
            <div class="px-2 mb-6 mt-2">
                <!-- Pass standard binding, but also we need to intercept the toggle -->
                <!-- Actually ModeSwitch probably handles the click internally and just updating 'mode' which is bound. 
                     If I want to trigger nav on change, I can use a reactive statement or modify ModeSwitch.
                     Let's check ModeSwitch. 
                -->
                <ModeSwitch
                    bind:mode={dashboardState.mode}
                    onToggle={handleModeSwitch}
                />
            </div>

            <!-- Navigation Section -->
            <div
                class="px-2 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider"
            >
                Menu
            </div>

            {#each navigation as item}
                {@const isClients =
                    item.name === "Clients" || item.name === "Freelancers"}
                {@const name = isClients
                    ? dashboardState.mode === "client"
                        ? "Freelancers"
                        : "Clients"
                    : item.name}
                {@const isActive =
                    item.name === "Tickets"
                        ? $page.url.pathname === item.href
                        : $page.url.pathname.startsWith(item.href)}

                <a
                    href={item.href}
                    class="group flex items-center px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 {isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}"
                >
                    <svg
                        class="mr-3 h-4.5 w-4.5 flex-shrink-0 transition-colors {isActive
                            ? 'text-indigo-600'
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
    <div class="p-4 border-t border-gray-50">
        <div
            class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
        >
            <div
                class="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-indigo-100"
            >
                JS
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-900 truncate">
                    John Smith
                </p>
                <p class="text-[10px] font-medium text-gray-400 truncate">
                    john@ticketly.app
                </p>
            </div>
            <button
                class="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200/50 transition-colors"
                title="Logout"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-4 h-4"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                </svg>
            </button>
        </div>
    </div>
</aside>
