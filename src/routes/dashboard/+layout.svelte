<script>
    import Sidebar from "$lib/components/dashboard/Sidebar.svelte";
    import { page } from "$app/stores";
    import { setContext } from "svelte";
    import logo from "$lib/assets/logo.jpg";

    let { children } = $props();

    let isSidebarOpen = $state(false);
    let dashboardState = $state({ mode: "freelancer", layout: "standard" }); // layout: "standard" | "full"

    setContext("dashboard", dashboardState);

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }

    // Close sidebar on navigation (mobile)
    $effect(() => {
        // Just reading page.url to react to it
        const path = $page.url.pathname;

        isSidebarOpen = false;

        // Reset layout on nav (optional, but safe)
        dashboardState.layout = "standard";

        // Sync mode from URL (single source of truth for these routes)
        if (path.startsWith("/dashboard/client")) {
            dashboardState.mode = "client";
        } else if (path.startsWith("/dashboard/freelancer")) {
            dashboardState.mode = "freelancer";
        }
    });

    let isGatekeeper = $derived($page.url.pathname === "/dashboard");
</script>

<div
    class="flex h-screen bg-[#F3F4F6] font-sans selection:bg-indigo-100 selection:text-indigo-700"
>
    {#if !isGatekeeper}
        <Sidebar bind:isOpen={isSidebarOpen} />
    {/if}

    <div class="flex flex-1 flex-col overflow-hidden relative">
        <!-- Top bar for mobile only -->
        <header
            class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden z-10 sticky top-0"
        >
            <div class="flex items-center gap-3">
                <img
                    src={logo}
                    alt="Ticketly"
                    class="h-8 w-8 rounded-lg object-cover"
                />
                <div class="text-lg font-bold text-gray-900">Ticketly</div>
            </div>
            <button
                type="button"
                class="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:outline-none"
                onclick={toggleSidebar}
            >
                <span class="sr-only">Open sidebar</span>
                <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </header>

        <main
            class="flex-1 overflow-y-auto transition-all duration-300
            {dashboardState.layout === 'full' ? 'p-0' : 'p-4 sm:p-8 lg:p-12'}"
        >
            <div
                class={dashboardState.layout === "full"
                    ? "h-full"
                    : "mx-auto max-w-6xl"}
            >
                {@render children()}
            </div>
        </main>
    </div>
</div>
