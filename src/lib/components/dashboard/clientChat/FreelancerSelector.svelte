<script>
    let { freelancers = [], selectedFreelancerId = null, onSelectFreelancer, isCollapsed = false, onToggleCollapse } = $props();

    let searchTerm = $state("");

    let filteredFreelancers = $derived(
        freelancers.filter(
            (freelancer) =>
                freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                freelancer.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
        ),
    );
</script>

<div
    class="flex flex-col h-full bg-white border-r border-gray-100 transition-all duration-300 ease-in-out"
>
    <!-- Header/Search -->
    <div class="p-4 border-b border-gray-100 flex flex-col gap-4">
        <div
            class="flex items-center justify-between {isCollapsed
                ? 'justify-center'
                : ''}"
        >
            {#if !isCollapsed}
                <h2 class="text-lg font-bold text-gray-900">Messages</h2>
            {/if}
            <button
                onclick={onToggleCollapse}
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label={isCollapsed ? "Expand list" : "Collapse list"}
            >
                {#if isCollapsed}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                        />
                    </svg>
                {/if}
            </button>
        </div>

        {#if !isCollapsed}
            <div class="relative">
                <input
                    type="text"
                    bind:value={searchTerm}
                    placeholder="Search by name or product..."
                    class="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 text-gray-900 placeholder:text-gray-400 transition-all"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        {/if}
    </div>

    <!-- Freelancer List -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden">
        {#if filteredFreelancers.length === 0 && !isCollapsed}
            <div class="p-8 text-center text-gray-400 text-sm">
                No freelancers found.
            </div>
        {/if}

        {#each filteredFreelancers as freelancer (freelancer.id)}
            <button
                onclick={() => onSelectFreelancer(freelancer.id)}
                class="w-full flex items-center {isCollapsed
                    ? 'justify-center px-2 py-4'
                    : 'px-4 py-4 gap-3'} hover:bg-gray-50 transition-colors text-left relative {selectedFreelancerId ===
                freelancer.id
                    ? 'bg-indigo-50/50 hover:bg-indigo-50'
                    : ''}"
                title={isCollapsed ? freelancer.name : ""}
            >
                {#if selectedFreelancerId === freelancer.id}
                    <div
                        class="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-r"
                    ></div>
                {/if}

                <div class="relative flex-shrink-0">
                    <div
                        class="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm transition-all duration-300"
                    >
                        {freelancer.name.charAt(0)}
                    </div>
                    <!-- Collapsed View Unread Badge -->
                    {#if isCollapsed && freelancer.unreadCount > 0}
                        <div
                            class="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 border-2 border-white rounded-full flex items-center justify-center"
                        >
                            <span class="text-[8px] font-bold text-white"
                                >{freelancer.unreadCount}</span
                            >
                        </div>
                    {/if}
                </div>

                {#if !isCollapsed}
                    <div class="flex-1 min-w-0 transition-opacity duration-300">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <span
                                class="text-sm font-semibold text-gray-900 truncate"
                            >
                                {freelancer.name}
                            </span>
                            {#if freelancer.lastMessageTime}
                                <span
                                    class="text-[10px] text-gray-400 flex-shrink-0 ml-2"
                                >
                                    {freelancer.lastMessageTime}
                                </span>
                            {/if}
                        </div>
                        <p class="text-xs text-gray-500 truncate mb-1">
                            {freelancer.productName}
                        </p>
                        <p
                            class="text-sm text-gray-600 truncate {freelancer.unreadCount >
                            0
                                ? 'font-medium text-gray-900'
                                : ''}"
                        >
                            {freelancer.lastMessage || "No messages yet"}
                        </p>
                    </div>

                    {#if freelancer.unreadCount > 0}
                        <div class="flex-shrink-0 ml-2">
                            <span
                                class="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-[10px] font-bold text-white"
                            >
                                {freelancer.unreadCount}
                            </span>
                        </div>
                    {/if}
                {/if}
            </button>
        {/each}
    </div>
</div>
