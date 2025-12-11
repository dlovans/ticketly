<script>
    import { fly } from "svelte/transition";
    let isMobileMenuOpen = $state(false);

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<div class="fixed left-0 right-0 z-50 flex justify-center top-6">
    <nav
        class="flex items-center justify-between w-full max-w-5xl px-6 py-3 mx-4 border shadow-lg rounded-xl backdrop-blur-sm bg-white/80 border-slate-200/60 shadow-slate-300/20 transition-all duration-300"
    >
        <a href="/" class="flex items-center gap-2">
            <img
                src="/logo.jpg"
                alt="Ticketly Logo"
                class="h-8 w-8 rounded-full"
            />
            <span class="text-xl font-bold text-slate-900">Ticketly</span>
        </a>

        <div class="hidden md:flex md:items-center md:gap-8">
            <a
                href="#features"
                class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >Features</a
            >
            <a
                href="#pricing"
                class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >Pricing</a
            >
            <a
                href="#faq"
                class="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >FAQ</a
            >
        </div>

        <div class="hidden md:flex md:items-center md:gap-4">
            <a href="/login" class="btn btn-sm btn-outline">Log in</a>
            <a href="/register" class="btn btn-sm btn-primary">Get Started</a>
        </div>

        <button
            class="btn btn-ghost md:hidden p-2"
            onclick={toggleMobileMenu}
            aria-label="Toggle menu"
        >
            {#if isMobileMenuOpen}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                    ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
                >
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                    ><line x1="4" x2="20" y1="12" y2="12" /><line
                        x1="4"
                        x2="20"
                        y1="6"
                        y2="6"
                    /><line x1="4" x2="20" y1="18" y2="18" /></svg
                >
            {/if}
        </button>
    </nav>
</div>

{#if isMobileMenuOpen}
    <div
        class="fixed z-40 top-24 left-4 right-4 md:hidden"
        transition:fly={{ y: -20, duration: 200 }}
    >
        <div
            class="py-4 border border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm rounded-xl shadow-slate-300/20"
        >
            <div class="flex flex-col">
                <a
                    href="#features"
                    class="block w-full px-6 py-3 text-base font-medium text-left text-slate-600 transition-all duration-200 hover:text-slate-900 hover:bg-slate-50"
                    onclick={() => (isMobileMenuOpen = false)}>Features</a
                >
                <a
                    href="#pricing"
                    class="block w-full px-6 py-3 text-base font-medium text-left text-slate-600 transition-all duration-200 hover:text-slate-900 hover:bg-slate-50"
                    onclick={() => (isMobileMenuOpen = false)}>Pricing</a
                >
                <a
                    href="#faq"
                    class="block w-full px-6 py-3 text-base font-medium text-left text-slate-600 transition-all duration-200 hover:text-slate-900 hover:bg-slate-50"
                    onclick={() => (isMobileMenuOpen = false)}>FAQ</a
                >

                <div class="h-px bg-slate-100 my-2 mx-4"></div>

                <div class="flex flex-col gap-2 px-4 pt-2">
                    <a
                        href="/login"
                        class="btn btn-outline w-full justify-center py-1"
                        onclick={() => (isMobileMenuOpen = false)}>Log in</a
                    >
                    <a
                        href="/register"
                        class="btn btn-primary w-full justify-center py-1"
                        onclick={() => (isMobileMenuOpen = false)}
                        >Get Started</a
                    >
                </div>
            </div>
        </div>
    </div>
{/if}
