<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { auth } from "$lib/firebase/client.js";
    import { getUserProfile, setFreelancerMode } from "$lib/firebase/user.js";

    let isLoading = $state(true);

    onMount(async () => {
        const user = auth.currentUser;
        if (user) {
            const profile = await getUserProfile(user.uid);
            if (profile && profile.freelancer_mode === true) {
                goto("/dashboard/freelancer", { replaceState: true });
                return;
            } else if (profile && profile.freelancer_mode === false) {
                goto("/dashboard/client", { replaceState: true });
                return;
            }
        } else {
            const mode = localStorage.getItem("ticketly_mode");
            if (mode === "freelancer") {
                goto("/dashboard/freelancer", { replaceState: true });
                return;
            } else if (mode === "client") {
                goto("/dashboard/client", { replaceState: true });
                return;
            }
        }
        isLoading = false;
    });

    async function selectMode(mode) {
        localStorage.setItem("ticketly_mode", mode);
        const user = auth.currentUser;
        if (user) {
            await setFreelancerMode(user.uid, mode === "freelancer");
        }
        goto(`/dashboard/${mode}`);
    }
</script>

{#if !isLoading}
    <div class="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div class="text-center mb-12">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Ticketly
            </h1>
            <p class="text-gray-500 max-w-lg mx-auto">
                Please select your workspace mode. You can easily switch between
                context later from the sidebar.
            </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
            <!-- Freelancer Card -->
            <button
                class="group relative flex flex-col items-center p-12 bg-white rounded-3xl shadow-sm border-2 border-transparent hover:border-indigo-600 hover:shadow-xl transition-all duration-300 text-center"
                onclick={() => selectMode("freelancer")}
            >
                <div
                    class="h-20 w-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.629-.78.937-1.168M11.42 15.17l-.546-.667c-.28-.338-.309-.648-.053-.948l1.79-2.086c.07-.08.156-.134.253-.153l.972-.186c.217-.042.427-.197.35-.429l-.266-.827c-.126-.4-.366-.757-.597-1.077L11.528 2.06c-.469-.877-1.748-.68-1.928.297l-.233 1.272c-.066.362-.257.696-.54.91a8.498 8.498 0 01-1.286.755l-1.425.617c-.365.158-.77.164-1.127.018l-1.018-.413c-.902-.366-1.852.3-1.85-.68l.004-.79c.004-.716.48-1.325 1.155-1.572l.275-.098c.373-.133.725-.262 1.054-.388.329-.126.568-.344.47-.69l-.166-.583c-.098-.343-.46-.576-.816-.54l-.45.045c-.477.048-1.002-.132-1.31-.563L.375 7.5a2.25 2.25 0 00.126 3c.6.657 1.341 1.411 2.215 2.261.874.85 1.839 1.743 2.879 2.678 1.04.935 2.115 1.849 3.203 2.73 1.088.88 2.19 1.726 3.295 2.535 1.107.81 2.21 1.579 3.308 2.304 1.098.725 2.186 1.406 3.265 2.043.54.318 1.078.636 1.616.953.538.318 1.076.635 1.614.953.538.317 1.075.635 1.613.952.538.317 1.075.635 1.613.952 1.613.952 3.226 1.905 4.839 2.857 1.613.953 3.226 1.905 4.839 2.857 1.613.953 3.226 1.905 4.839 2.857.382.226.757.447 1.127.663l.73.43c.18.106.36.21.537.315"
                        />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">Freelancer</h2>
                <p class="text-sm text-gray-500">
                    Manage tickets, track time, and communicate with clients.
                </p>
                <div class="mt-8 flex items-center justify-center w-full">
                    <span
                        class="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                    >
                        Enter Dashboard
                    </span>
                </div>
            </button>

            <!-- Client Card -->
            <button
                class="group relative flex flex-col items-center p-12 bg-white rounded-3xl shadow-sm border-2 border-transparent hover:border-purple-600 hover:shadow-xl transition-all duration-300 text-center"
                onclick={() => selectMode("client")}
            >
                <div
                    class="h-20 w-20 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-10 h-10"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">Client</h2>
                <p class="text-sm text-gray-500">
                    Review progress, approve work, and submit new requests.
                </p>
                <div class="mt-8 flex items-center justify-center w-full">
                    <span
                        class="px-4 py-2 bg-purple-50 text-purple-700 font-semibold rounded-lg text-sm group-hover:bg-purple-600 group-hover:text-white transition-colors"
                    >
                        Enter Dashboard
                    </span>
                </div>
            </button>
        </div>
    </div>
{/if}
