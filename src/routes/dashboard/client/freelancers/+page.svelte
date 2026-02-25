<script>
    import { onMount, onDestroy, getContext } from "svelte";
    import FreelancerList from "$lib/components/dashboard/freelancers/FreelancerList.svelte";
    import ConfirmModal from "$lib/components/ui/ConfirmModal.svelte";
    import { listenToFreelancers, removeRelationship } from "$lib/firebase/relationships.js";
    import { listenToIncomingInvites, acceptInvite, declineInvite } from "$lib/firebase/invites.js";
    import { getUserProfile } from "$lib/firebase/user.js";

    const getUser = getContext("user");
    let user = $derived(getUser?.());

    let freelancers = $state([]);
    let pendingInvites = $state([]);
    let unsubFreelancers;
    let unsubInvites;

    // Remove modal state
    let isConfirmModalOpen = $state(false);
    let freelancerToRemove = $state(null);

    onMount(() => {
        if (!user?.email) return;
        unsubFreelancers = listenToFreelancers(user.email, async (data) => {
            const enriched = await Promise.all(
                data.map(async (f) => {
                    const profile = await getUserProfile(f.uid);
                    return {
                        ...f,
                        phone: profile?.showPhoneNumber ? (profile?.phone || null) : null,
                    };
                }),
            );
            freelancers = enriched;
        });
        unsubInvites = listenToIncomingInvites(user.email, (data) => {
            pendingInvites = data;
        });
    });

    onDestroy(() => {
        unsubFreelancers?.();
        unsubInvites?.();
    });

    function openRemoveModal(id) {
        const freelancer = freelancers.find((f) => f.id === id);
        freelancerToRemove = freelancer;
        isConfirmModalOpen = true;
    }

    async function confirmRemoveFreelancer() {
        if (freelancerToRemove) {
            await removeRelationship(freelancerToRemove.id);
            freelancerToRemove = null;
        }
    }

    function cancelRemove() {
        freelancerToRemove = null;
    }

    async function handleAcceptInvite(invite) {
        await acceptInvite(invite);
    }

    async function handleDeclineInvite(inviteId) {
        await declineInvite(inviteId);
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

    <!-- Pending Invites Section -->
    {#if pendingInvites.length > 0}
        <div class="space-y-3">
            <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                Pending Invites
                <span class="ml-1 bg-indigo-100 text-indigo-700 py-0.5 px-2 rounded-full text-[10px]">
                    {pendingInvites.length}
                </span>
            </h2>
            <div class="space-y-2">
                {#each pendingInvites as invite (invite.id)}
                    <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                                {(invite.freelancerName || invite.freelancerEmail || "??").substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-gray-900">{invite.freelancerName}</p>
                                <p class="text-xs text-gray-500">{invite.freelancerEmail}</p>
                                {#if invite.productName}
                                    <p class="text-xs text-gray-400 mt-0.5">{invite.productName}</p>
                                {/if}
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                onclick={() => handleDeclineInvite(invite.id)}
                                class="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                            >
                                Decline
                            </button>
                            <button
                                onclick={() => handleAcceptInvite(invite)}
                                class="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-all"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

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
