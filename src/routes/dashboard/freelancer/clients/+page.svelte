<script>
    import ClientList from "$lib/components/dashboard/clients/ClientList.svelte";
    import NewClientModal from "$lib/components/dashboard/clients/NewClientModal.svelte";
    import UpdateClientModal from "$lib/components/dashboard/clients/UpdateClientModal.svelte";

    // Mock Data
    let clients = [
        {
            id: 1,
            email: "contact@acme.com",
            companyName: "Acme Corp",
            name: "John Acme",
            productName: "Acme SaaS",
            website: "acme.com",
        },
        {
            id: 2,
            email: "support@globex.com",
            companyName: "Globex",
            name: "Sarah Globex",
            productName: "Globex Portal",
            website: "globex.com",
        },
    ];

    let isNewModalOpen = false;
    let editingClient = null;

    function handleAddClient(newClientData) {
        const newClient = {
            id: Date.now(), // Simple mock ID
            ...newClientData,
        };
        clients = [...clients, newClient];
    }

    function handleUpdateClient(updatedClientData) {
        clients = clients.map((c) =>
            c.id === updatedClientData.id ? updatedClientData : c,
        );
        editingClient = null;
    }

    function handleDeleteClient(id) {
        if (confirm("Are you sure you want to delete this client?")) {
            clients = clients.filter((c) => c.id !== id);
        }
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
            on:click={() => (isNewModalOpen = true)}
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

    <!-- Client List Component -->
    <ClientList
        {clients}
        onEdit={openEditModal}
        onDelete={handleDeleteClient}
    />

    <!-- Modals -->
    <NewClientModal
        isOpen={isNewModalOpen}
        onClose={() => (isNewModalOpen = false)}
        onSave={handleAddClient}
    />

    <UpdateClientModal
        isOpen={!!editingClient}
        onClose={() => (editingClient = null)}
        onSave={handleUpdateClient}
        client={editingClient}
    />
</div>
