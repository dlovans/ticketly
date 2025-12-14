<script>
    import FreelancerList from "$lib/components/dashboard/freelancers/FreelancerList.svelte";
    import ConfirmModal from "$lib/components/ui/ConfirmModal.svelte";

    // Mock Data
    let freelancers = [
        {
            id: 1,
            name: "Alex Developer",
            email: "alex@devstudio.io",
            productName: "Acme SaaS",
            joinedDate: "Oct 15, 2024",
        },
        {
            id: 2,
            name: "Maria Designer",
            email: "maria@creativeco.com",
            productName: "Globex Portal",
            joinedDate: "Sep 3, 2024",
        },
        {
            id: 3,
            name: "James Support",
            email: "james@helpdesk.pro",
            productName: "Acme SaaS",
            joinedDate: "Nov 20, 2024",
        },
    ];

    // Modal state
    let isConfirmModalOpen = false;
    let freelancerToRemove = null;

    function openRemoveModal(id) {
        const freelancer = freelancers.find((f) => f.id === id);
        freelancerToRemove = freelancer;
        isConfirmModalOpen = true;
    }

    function confirmRemoveFreelancer() {
        if (freelancerToRemove) {
            freelancers = freelancers.filter(
                (f) => f.id !== freelancerToRemove.id,
            );
            freelancerToRemove = null;
        }
    }

    function cancelRemove() {
        freelancerToRemove = null;
    }
</script>

<div class="p-8 max-w-7xl mx-auto space-y-8">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">My Freelancers</h1>
            <p class="text-sm text-gray-500 mt-1">
                Manage freelancers connected to your account.
            </p>
        </div>
        <!-- Info badge instead of Add button -->
        <div
            class="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2.5 rounded-xl text-sm font-medium"
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
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
            </svg>
            {freelancers.length} Active
        </div>
    </div>

    <!-- Freelancer List Component -->
    <FreelancerList {freelancers} onRemove={openRemoveModal} />

    <!-- Remove Confirmation Modal -->
    <ConfirmModal
        bind:isOpen={isConfirmModalOpen}
        title="Remove Freelancer"
        message={freelancerToRemove
            ? `Are you sure you want to remove ${freelancerToRemove.name}? They will no longer be able to chat with you.`
            : ""}
        confirmLabel="Remove"
        cancelLabel="Cancel"
        confirmVariant="danger"
        onConfirm={confirmRemoveFreelancer}
        onCancel={cancelRemove}
    />
</div>
