<script>
    export let freelancers = [];
    export let onRemove;
</script>

<div
    class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
>
    <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
            <thead
                class="bg-gray-50 text-xs uppercase font-semibold text-gray-500"
            >
                <tr>
                    <th class="px-6 py-4">Freelancer</th>
                    <th class="px-6 py-4">Product</th>
                    <th class="px-6 py-4">Joined</th>
                    <th class="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                {#each freelancers as freelancer}
                    <tr class="hover:bg-gray-50/50 transition-colors">
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0"
                                >
                                    {freelancer.name.charAt(0)}
                                </div>
                                <div class="flex flex-col min-w-0">
                                    <span
                                        class="font-medium text-gray-900 truncate"
                                        >{freelancer.name}</span
                                    >
                                    <span class="text-xs text-gray-400 truncate"
                                        >{freelancer.email}</span
                                    >
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <span
                                class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                            >
                                {freelancer.productName || "Unassigned"}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-gray-500">
                            {freelancer.joinedDate || "-"}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <button
                                on:click={() => onRemove(freelancer.id)}
                                class="p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                aria-label="Remove freelancer"
                                title="Remove freelancer access"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>
                {/each}
                {#if freelancers.length === 0}
                    <tr>
                        <td
                            colspan="4"
                            class="px-6 py-12 text-center text-gray-500"
                        >
                            <div class="flex flex-col items-center gap-3">
                                <div
                                    class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">
                                        No freelancers yet
                                    </p>
                                    <p class="text-sm text-gray-400 mt-1">
                                        Freelancers will appear here once they
                                        connect with you.
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
</div>
