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

<div
    class="flex h-screen bg-[#F3F4F6] font-sans selection:bg-indigo-100 selection:text-indigo-700"
>
    <Sidebar bind:isOpen={isSidebarOpen} />

    <div class="flex flex-1 flex-col overflow-hidden relative">
        <!-- Top bar for mobile only -->
        <header
            class="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden z-10 sticky top-0"
        >
            <div class="flex items-center gap-3">
                <div
                    class="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold"
                >
                    T
                </div>
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

        <main class="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
            <div class="mx-auto max-w-6xl">
                <slot />
            </div>
        </main>
    </div>
</div>
