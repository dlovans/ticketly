<script>
    let {
        settings = $bindable({
            showPhoneNumber: false,
            notificationDelay: "1h",
        }),
        onSave = null,
    } = $props();
</script>

<div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
    <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900">Privacy</h2>
        <p class="text-sm text-gray-500 mt-1">
            Control what clients can see on their dashboard.
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
                class="relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 {settings.showPhoneNumber
                    ? 'bg-indigo-600'
                    : 'bg-gray-200'}"
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
                    class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out {settings.showPhoneNumber
                        ? 'translate-x-5'
                        : 'translate-x-0'}"
                ></span>
            </button>
        </div>

    </div>
</div>
