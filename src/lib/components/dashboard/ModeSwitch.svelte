<script>
    let { mode = $bindable("freelancer"), onToggle } = $props();

    function toggleMode() {
        if (onToggle) {
            onToggle();
            return;
        }
        mode = mode === "freelancer" ? "client" : "freelancer";
    }
</script>

<div class="flex items-center justify-center p-4">
    <button
        onclick={toggleMode}
        class="relative h-10 w-full rounded-lg bg-gray-100 p-1 transition-colors duration-200"
        aria-label="Toggle mode"
    >
        <div
            class="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-md bg-white shadow-sm transition-all duration-200 ease-in-out"
            style:left={mode === "freelancer" ? "4px" : "calc(50%)"}
        ></div>
        <div class="relative z-10 flex h-full w-full">
            <div
                class="flex flex-1 items-center justify-center text-sm font-medium transition-colors duration-200 {mode ===
                'freelancer'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'}"
            >
                Freelancer
            </div>
            <div
                class="flex flex-1 items-center justify-center text-sm font-medium transition-colors duration-200 {mode ===
                'client'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'}"
            >
                Client
            </div>
        </div>
    </button>
</div>
