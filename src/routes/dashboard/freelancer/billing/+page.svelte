<script>
    import { fade } from "svelte/transition";

    let isSubscribed = false; // Mock state

    // Pricing Data (Simulated from Pricing.svelte)
    const plans = [
        {
            name: "Standard",
            price: "$19",
            period: "/month",
            description: "For growing freelance businesses.",
            features: [
                "Up to 10 Clients",
                "Unlimited Tickets",
                "Real-time Chat",
                "Client Dashboard",
                "File Sharing",
            ],
            cta: "Upgrade to Standard",
            highlight: true,
        },
        {
            name: "Professional",
            price: "$79",
            period: "/month",
            description: "For established agencies.",
            features: [
                "Unlimited Clients",
                "Unlimited Tickets",
                "Real-time Chat",
                "Client Dashboard",
                "File Sharing",
            ],
            cta: "Upgrade to Professional",
            highlight: false,
        },
    ];

    // Mock Invoices
    const invoices = [
        {
            id: "INV-2023-001",
            date: "Oct 12, 2023",
            amount: "$19.00",
            status: "Paid",
        },
        {
            id: "INV-2023-002",
            date: "Sep 12, 2023",
            amount: "$19.00",
            status: "Paid",
        },
        {
            id: "INV-2023-003",
            date: "Aug 12, 2023",
            amount: "$19.00",
            status: "Paid",
        },
    ];

    function handleManageSubscription() {
        alert("Redirecting to Customer Portal...");
    }
</script>

<div class="p-8 max-w-7xl mx-auto space-y-8">
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <!-- Mock Toggle for Demo -->
        <button
            class="text-xs text-gray-500 underline"
            on:click={() => (isSubscribed = !isSubscribed)}
        >
            Toggle State (Currently: {isSubscribed ? "Paid" : "Free"})
        </button>
    </div>

    {#if isSubscribed}
        <div in:fade class="max-w-3xl space-y-8">
            <!-- Paid State -->
            <div
                class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
                <div class="flex items-start justify-between">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <h2 class="text-xl font-bold text-gray-900">
                                Current Plan: Standard
                            </h2>
                            <span
                                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                >Active</span
                            >
                        </div>
                        <p class="text-gray-500 mb-6">
                            Your next billing date is <span
                                class="font-semibold text-gray-900"
                                >November 12, 2025</span
                            >.
                        </p>
                        <div class="flex items-baseline gap-1 mb-8">
                            <span class="text-3xl font-bold text-gray-900"
                                >$19.00</span
                            >
                            <span class="text-gray-500">/month</span>
                        </div>
                    </div>
                    <div
                        class="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"
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
                                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                            />
                        </svg>
                    </div>
                </div>

                <div class="border-t border-gray-100 pt-8">
                    <button
                        on:click={handleManageSubscription}
                        class="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                    >
                        Manage Subscription
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
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Invoices List -->
            <div
                class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                <div class="p-6 border-b border-gray-100">
                    <h3 class="text-base font-semibold text-gray-900">
                        Payment History
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                        Receipts are sent to your email automatically.
                    </p>
                </div>
                <div class="divide-y divide-gray-100">
                    {#each invoices as invoice}
                        <div
                            class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div class="flex items-center gap-4">
                                <div
                                    class="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400"
                                >
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
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {invoice.date}
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        #{invoice.id}
                                    </p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-bold text-gray-900">
                                    {invoice.amount}
                                </p>
                                <span
                                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                                    >{invoice.status}</span
                                >
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {:else}
        <!-- Free State (Upgrade Options) -->
        <div in:fade>
            <div class="mb-8">
                <div
                    class="bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex gap-4 max-w-3xl mb-8"
                >
                    <div
                        class="p-2 bg-indigo-100 rounded-lg h-fit text-indigo-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="w-5 h-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-bold text-indigo-900 text-sm">
                            You are on the Free Plan
                        </h3>
                        <p class="text-xs text-indigo-700 mt-1">
                            You currently have access to up to 2 clients.
                            Upgrade to unlock unlimited clients and features.
                        </p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {#each plans as plan}
                    <div
                        class="relative rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md
                        {plan.highlight
                            ? 'border-2 border-indigo-600 z-10'
                            : 'border-gray-200'}"
                    >
                        {#if plan.highlight}
                            <div
                                class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm"
                            >
                                Most Popular
                            </div>
                        {/if}

                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {plan.name}
                        </h3>
                        <div class="flex items-baseline gap-1 mb-4">
                            <span class="text-3xl font-bold text-gray-900"
                                >{plan.price}</span
                            >
                            <span class="text-sm text-gray-500"
                                >{plan.period}</span
                            >
                        </div>
                        <p class="text-sm text-gray-500 mb-6">
                            {plan.description}
                        </p>

                        <ul class="space-y-3 mb-8">
                            {#each plan.features as feature}
                                <li
                                    class="flex items-center gap-3 text-sm text-gray-600"
                                >
                                    <svg
                                        class="h-4 w-4 shrink-0 text-indigo-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>

                        <button
                            class="w-full rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                            {plan.highlight
                                ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                                : 'bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'}"
                        >
                            {plan.cta}
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
