<script>
    let {
        settings = $bindable({
            showPhoneNumber: false,
            notification_delays: {
                Emergency: { type: "immediate" },
                High: { type: "immediate" },
                Medium: { type: "delay", minutes: 30 },
                Low: { type: "on_login" },
            },
        }),
        onSave = null,
    } = $props();

    const priorities = ["Emergency", "High", "Medium", "Low"];

    function setDelay(priority, type, minutes = null) {
        settings.notification_delays = {
            ...settings.notification_delays,
            [priority]: type === "delay" ? { type, minutes } : { type },
        };
    }
</script>

<div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
    <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900">Notification & Privacy</h2>
        <p class="text-sm text-gray-500 mt-1">
            Control what clients can see and when you receive email notifications.
        </p>
    </div>

    <div class="space-y-8 max-w-2xl">
        <!-- Privacy Section -->
        <div class="flex items-center justify-between group">
            <div class="flex-1 pr-8">
                <h3 class="text-sm font-bold text-gray-900">
                    Client Visibility
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    Allow clients to see your phone number on their dashboard.
                </p>
            </div>
            <button
                class="relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onclick={() => {
                    settings.showPhoneNumber = !settings.showPhoneNumber;
                    if (onSave) onSave();
                }}
                role="switch"
                aria-checked={settings.showPhoneNumber}
                aria-label="Toggle Phone Number Visibility"
            >
                <span
                    aria-hidden="true"
                    class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    class:translate-x-5={settings.showPhoneNumber}
                ></span>
            </button>
        </div>

        <!-- Notification delays per priority -->
        <div>
            <h3 class="text-sm font-bold text-gray-900">Email notification timing</h3>
            <p class="text-sm text-gray-500 mt-1">Set when you want to receive emails for new tickets per priority.</p>

            <div class="mt-4 space-y-3">
                {#each priorities as p}
                    <div class="flex items-center justify-between">
                        <div class="flex-1 pr-4">
                            <div class="text-sm font-medium text-gray-900">{p}</div>
                            <div class="text-xs text-gray-500">Current: {settings.notification_delays?.[p]?.type}</div>
                        </div>
                        <div class="flex gap-2 items-center">
                            <select
                                value={settings.notification_delays[p].type}
                                on:change={(e) => {
                                    const val = e.target.value;
                                    if (val === 'delay') setDelay(p, 'delay', settings.notification_delays[p].minutes ?? 30);
                                    else setDelay(p, val);
                                }}
                                class="rounded-md border px-3 py-2 text-sm"
                            >
                                <option value="immediate">Immediate</option>
                                <option value="delay">Delay (minutes)</option>
                                <option value="on_login">On next login</option>
                            </select>

                            {#if settings.notification_delays[p].type === 'delay'}
                                <input
                                    type="number"
                                    min="1"
                                    class="w-24 rounded-md border px-2 py-2 text-sm"
                                    value={settings.notification_delays[p].minutes}
                                    on:change={(e) => setDelay(p, 'delay', Number(e.target.value))}
                                />
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>

    </div>

    <div class="mt-6 flex justify-end">
        <button
            class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-all duration-150"
            onclick={() => onSave && onSave()}
        >
            Save settings
        </button>
    </div>
</div>
