<script>
    import { onMount, onDestroy, getContext } from "svelte";
    import ClientList from "$lib/components/dashboard/clients/ClientList.svelte";
    import NewClientModal from "$lib/components/dashboard/clients/NewClientModal.svelte";
    import UpdateClientModal from "$lib/components/dashboard/clients/UpdateClientModal.svelte";
    import { listenToClients, updateRelationship, removeRelationship } from "$lib/firebase/relationships.js";
    import { sendInvite, cancelInvite, listenToOutgoingInvites } from "$lib/firebase/invites.js";

    const getUser = getContext("user");
    let user = $derived(getUser?.());

    let clients = $state([]);
    let outgoingInvites = $state([]);
    let unsubClients;
    let unsubInvites;

    let pendingInvites = $derived(outgoingInvites.filter((i) => i.status === "pending"));

    let isNewModalOpen = $state(false);
    let editingClient = $state(null);

    onMount(() => {
        if (!user?.uid) return;
        unsubClients = listenToClients(user.uid, (data) => {
            clients = data;
        });
        unsubInvites = listenToOutgoingInvites(user.uid, (data) => {
            outgoingInvites = data;
        });
    });

    onDestroy(() => {
        unsubClients?.();
        unsubInvites?.();
    });

    let addClientError = $state("");

    async function handleAddClient(clientData) {
        addClientError = "";

        if (clientData.email.toLowerCase() === user.email.toLowerCase()) {
            addClientError = "You can't invite yourself as a client.";
            throw new Error(addClientError);
        }

        // Create invite in Firestore and get its id
        let inviteRef;
        try {
            inviteRef = await sendInvite(user.uid, user.displayName, user.email, clientData);
        } catch (err) {
            console.error("Failed to create invite in Firestore:", err);
            throw err;
        }

        // Send the invite email including the invite id so recipient can accept
        try {
            await fetch("/api/invites/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: clientData.email,
                    freelancerName: user.displayName,
                    companyName: clientData.companyName,
                    inviteId: inviteRef.id,
                }),
            });
        } catch (err) {
            console.error("Failed to send invite email:", err);
        }
    }

    async function handleUpdateClient(updatedData) {
        await updateRelationship(updatedData.id, {
            clientEmail: updatedData.email,
            clientName: updatedData.name,
            companyName: updatedData.companyName,
            productName: updatedData.productName,
            website: updatedData.website,
        });
        editingClient = null;
    }

    async function handleDeleteClient(id) {
        if (confirm("Are you sure you want to remove this client?")) {
            await removeRelationship(id);
        }
    }

    async function handleCancelInvite(inviteId) {
        await cancelInvite(inviteId);
    }

    function openEditModal(client) {
        editingClient = client;
    }
</script>

<div class="p-8 max-w-7xl mx-auto space-y-8">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
            <p class="text-sm text-gray-500 mt-1">
                Manage your client roster and access.
            </p>
        </div>
        <button
            onclick={() => (isNewModalOpen = true)}
            class="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all"
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
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg>
            Add Client
        </button>
    </div>

    <!-- Pending Invites Section -->
    {#if pendingInvites.length > 0}
        <div class="space-y-3">
            <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
                Pending Invites
                <span class="ml-1 bg-amber-100 text-amber-700 py-0.5 px-2 rounded-full text-[10px]">
                    {pendingInvites.length}
                </span>
            </h2>
            <div class="space-y-2">
                {#each pendingInvites as invite (invite.id)}
                    <div class="flex items-center justify-between bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                        <div class="flex items-center gap-3">
                            <div class="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center text-xs font-bold text-amber-600">
                                {(invite.clientName || invite.clientEmail).substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <p class="text-sm font-semibold text-gray-900">{invite.clientName || "—"}</p>
                                <p class="text-xs text-gray-500">{invite.clientEmail}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-[11px] font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                                Awaiting response
                            </span>
                            <button
                                onclick={() => handleCancelInvite(invite.id)}
                                class="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="Cancel invite"
                                aria-label="Cancel invite"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <!-- Active Client List -->
    <ClientList
        {clients}
        onEdit={openEditModal}
        onDelete={handleDeleteClient}
    />

    <!-- Modals -->
    <NewClientModal
        isOpen={isNewModalOpen}
        onClose={() => { isNewModalOpen = false; addClientError = ""; }}
        onSave={handleAddClient}
        error={addClientError}
    />

    <UpdateClientModal
        isOpen={!!editingClient}
        onClose={() => (editingClient = null)}
        onSave={handleUpdateClient}
        client={editingClient}
    />
</div>
