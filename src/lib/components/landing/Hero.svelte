<script>
    import { fade, fly } from "svelte/transition";
</script>

<section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <!-- Background Decoration -->
    <div
        class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white"
    ></div>

    <div class="container mx-auto px-4 text-center">
        <div in:fly={{ y: 20, duration: 800, delay: 200 }}>
            <h1
                class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-tight"
            >
                Manage your freelance business <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400"
                    >with ease</span
                >
            </h1>

            <p
                class="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
                The all-in-one platform for freelancers to manage tickets,
                communicate with clients, and streamline your workflow.
            </p>

            <div
                class="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <a
                    href="/register"
                    class="btn btn-xl btn-primary w-full sm:w-auto min-w-[200px]"
                >
                    Get Started Free
                </a>
                <a
                    href="#features"
                    class="btn btn-xl btn-outline w-full sm:w-auto min-w-[200px]"
                >
                    Learn More
                </a>
            </div>
        </div>

        <!-- Dashboard Preview/Image Placeholder -->
        <div
            class="mt-20 relative mx-auto max-w-5xl"
            in:fly={{ y: 40, duration: 1000, delay: 400 }}
        >
            <div
                class="rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm p-4 shadow-2xl"
            >
                <div
                    class="aspect-[16/9] rounded-xl bg-slate-100 overflow-hidden relative group"
                >
                    <div
                        class="absolute inset-0 flex items-center justify-center text-slate-400"
                    >
                        <span class="text-lg font-medium"
                            >Dashboard Preview</span
                        >
                    </div>
                </div>
            </div>

            <!-- Decorative blobs -->
            <div
                class="absolute -top-20 -right-20 -z-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"
            ></div>
            <div
                class="absolute -bottom-20 -left-20 -z-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"
            ></div>
        </div>
    </div>
</section>
