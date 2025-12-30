<script>
    export let clients = [];
    export let onEdit;
    export let onDelete;
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
                    <th class="px-6 py-4">Company</th>
                    <th class="px-6 py-4">Contact</th>
                    <th class="px-6 py-4">Product</th>
                    <th class="px-6 py-4">Website</th>
                    <th class="px-6 py-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                {#each clients as client}
                    <tr class="hover:bg-gray-50/50 transition-colors">
                        <td class="px-6 py-4 font-medium text-gray-900">
                            {client.companyName}
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex flex-col">
                                <span class="font-medium text-gray-900"
                                    >{client.name}</span
                                >
                                <span class="text-xs text-gray-400"
                                    >{client.email}</span
                                >
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            {client.productName || "-"}
                        </td>
                        <td class="px-6 py-4">
                            {#if client.website}
                                <a
                                    href={client.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-indigo-600 hover:text-indigo-500 hover:underline truncate max-w-[150px] block"
                                >
                                    {client.website.replace(/^https?:\/\//, "")}
                                </a>
                            {:else}
                                -
                            {/if}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <button
                                    on:click={() => onEdit(client)}
                                    class="p-2 text-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                                    aria-label="Edit client"
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
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                        />
                                    </svg>
                                </button>
                                <button
                                    on:click={() => onDelete(client.id)}
                                    class="p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                    aria-label="Delete client"
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
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                {/each}
                {#if clients.length === 0}
                    <tr>
                        <td
                            colspan="5"
                            class="px-6 py-12 text-center text-gray-500"
                        >
                            No clients yet. Click "Add Client" to get started.
                        </td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
</div>
