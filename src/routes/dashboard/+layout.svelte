<script lang="ts">
	const { children } = $props();

	let mobileMenu = $state(false);
	let profileMenu = $state(false);

	type DashboardLink = {
		href: string;
		name: string;
		icon: string;
	}

	const dashboardLinks: DashboardLink[] = [
		{
			href: "/dashboard",
			name: "Dashboard",
			icon: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
		}
	];
</script>

<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	{#if mobileMenu}
		<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
			<div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>

			<div class="fixed inset-0 flex">
				<div class="relative mr-16 flex w-full max-w-xs flex-1">
					<div class="absolute top-0 left-full flex w-16 justify-center pt-5">
						<button type="button" class="-m-2.5 p-2.5" onclick={() => mobileMenu = false}>
							<span class="sr-only">Close sidebar</span>
							<svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-600 px-6 pb-4">
						<div class="flex h-16 shrink-0 items-center">
							<!-- Insert Logo Here -->
						</div>
						<nav class="flex flex-1 flex-col">
							<ul role="list" class="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" class="-mx-2 space-y-1">
										{#each dashboardLinks as link}
											<li>
												<a href="{link.href}" class="group flex gap-x-3 rounded-md bg-primary-700 p-2 text-sm/6 font-semibold text-white">
													<svg class="size-6 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
														<path stroke-linecap="round" stroke-linejoin="round" d="{link.icon}" />
													</svg>
													{link.name}
												</a>
											</li>
										{/each}
									</ul>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-600 px-6 pb-4">
			<div class="flex h-16 shrink-0 items-center">
				<!-- Insert Logo Here -->
			</div>
			<nav class="flex flex-1 flex-col">
				<ul role="list" class="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" class="-mx-2 space-y-1">
							{#each dashboardLinks as link}
								<li>
									<a href="{link.href}" class="group flex gap-x-3 rounded-md bg-primary-700 p-2 text-sm/6 font-semibold text-white">
										<svg class="size-6 shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
											<path stroke-linecap="round" stroke-linejoin="round" d="{link.icon}" />
										</svg>
										{link.name}
									</a>
								</li>
							{/each}
						</ul>
				</ul>
			</nav>
		</div>
	</div>

	<div class="lg:pl-72">
		<div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
			<button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" onclick={() => mobileMenu = true}>
				<span class="sr-only">Open sidebar</span>
				<svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>

			<!-- Separator -->
			<div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

			<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
				<form class="grid flex-1 grid-cols-1" action="#" method="GET">
				</form>
				<div class="flex items-center gap-x-4 lg:gap-x-6">

					<!-- Profile dropdown -->
					<div class="relative">
						<button type="button" class="-m-1.5 flex items-center p-1.5" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onclick={() => profileMenu = !profileMenu}>
							<span class="sr-only">Open user menu</span>
							<span class="flex lg:items-center">
                <span class="ml-4 text-sm/6 font-semibold text-gray-900" aria-hidden="true">Firstname Lastname</span>
                <svg class="ml-2 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </span>
						</button>

						{#if profileMenu}
							<div  data-sveltekit-preload-data="false"
										class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white
									 py-2 ring-1 shadow-lg ring-gray-900/5 focus:outline-hidden" role="menu"
										aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
								<a href="/logout" class="block px-3 py-1 text-sm/6 text-gray-900" role="menuitem" tabindex="-1" id="user-menu-item-1">Sign out</a>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<main class="py-10">
			<div class="px-4 sm:px-6 lg:px-8">
				{@render children()}
			</div>
		</main>
	</div>
</div>
