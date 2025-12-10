<script>
    import Sidebar from "$lib/components/dashboard/Sidebar.svelte";
    import { page } from "$app/stores";
    import { setContext } from "svelte";

    let isSidebarOpen = $state(false);
    let dashboardState = $state({ mode: "freelancer" });

    setContext("dashboard", dashboardState);

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }

    // Close sidebar on navigation (mobile)
    $effect(() => {
        // Just reading page.url to react to it
        $page.url;
        isSidebarOpen = false;
    });
</script>

<div class="flex h-screen bg-white">
    <Sidebar bind:isOpen={isSidebarOpen} />

    <div class="flex flex-1 flex-col overflow-hidden">
        <!-- Top bar for mobile only -->
        <header
            class="flex h-16 items-center border-b border-gray-200 bg-white px-4 md:hidden"
        >
            <button
                type="button"
                class="-ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:outline-none"
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
            <div class="ml-4 text-lg font-semibold text-gray-900">Ticketly</div>
        </header>

        <main class="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div class="mx-auto max-w-7xl">
                <slot />
            </div>
        </main>
    </div>
</div>
