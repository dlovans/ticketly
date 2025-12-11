<script>
    import { slide } from "svelte/transition";

    let openIndex = $state(null);

    const faqs = [
        {
            question: "What is Ticketly?",
            answer: "Ticketly is a comprehensive communication platform designed specifically for freelancers and their clients. It helps you manage requests, track issues, and communicate effectively in one place.",
        },
        {
            question: "How does the ticket system work?",
            answer: "Clients can create tickets for specific requests, bugs, or issues. You can then track the status of these tickets (Open, In Progress, Resolved, Closed) and prioritize them based on urgency.",
        },
        {
            question: "Can I use Ticketly for free?",
            answer: "Yes! We offer a Free tier that allows you to manage up to 2 clients with unlimited tickets. It's perfect for freelancers just starting out.",
        },
        {
            question: "What is the difference between Chat and Tickets?",
            answer: "Chat is for general communication, quick questions, and file sharing. Tickets are for specific tasks, bug reports, or maintenance requests that need to be tracked and resolved.",
        },
        {
            question: "Can I invite my clients?",
            answer: "Absolutely. You can add clients to your dashboard, and they will get their own portal to create tickets, view progress, and chat with you.",
        },
        {
            question: "Is there a limit to how many tickets I can have?",
            answer: "No, all our plans, including the Free tier, come with unlimited tickets. We believe you shouldn't be penalized for being busy!",
        },
        {
            question: "Can I upgrade or downgrade my plan at any time?",
            answer: "Yes, you can change your subscription plan at any time from your settings. Changes will take effect immediately or at the start of the next billing cycle.",
        },
        {
            question: "Do you offer refunds?",
            answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, simply contact our support team.",
        },
        {
            question: "How do I get support if I have an issue?",
            answer: "You can reach out to our support team via the 'Help' section in your dashboard. Standard and Professional plans also include priority support.",
        },
    ];

    function toggle(index) {
        openIndex = openIndex === index ? null : index;
    }
</script>

<section id="faq" class="py-24 bg-slate-50">
    <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Frequently asked questions
            </h2>
            <p class="text-lg text-slate-600">
                Everything you need to know about Ticketly and how it works.
            </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-4">
            {#each faqs as faq, index}
                <div
                    class="bg-white rounded-xl border border-slate-200 overflow-hidden"
                >
                    <button
                        class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        onclick={() => toggle(index)}
                    >
                        <span class="text-lg font-medium text-slate-900"
                            >{faq.question}</span
                        >
                        <svg
                            class="w-5 h-5 text-slate-500 transition-transform duration-200 {openIndex ===
                            index
                                ? 'rotate-180'
                                : ''}"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {#if openIndex === index}
                        <div transition:slide={{ duration: 200 }}>
                            <div
                                class="px-6 pb-6 text-slate-600 leading-relaxed"
                            >
                                {faq.answer}
                            </div>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>
