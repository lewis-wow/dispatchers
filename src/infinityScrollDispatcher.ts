export interface InfinityScrollDispatcherOptions {
	limit?: number
	observerOptions?: IntersectionObserverInit
}

export default function createInfinityScrollDispatcher<T>(
	fetcher: (limit: number) => Promise<T>,
	callback: (data: T, limit: number) => void,
	options: InfinityScrollDispatcherOptions = {}
) {
	const limit = options?.limit ?? 10
	const observerOptions = options?.observerOptions ?? {}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(async (entry) => {
			if (!entry.isIntersecting) return

			const data = await fetcher(limit)
			callback(data, limit)
		})
	}, observerOptions)

	return (node: HTMLElement) => {
		observer.observe(node)

		return {
			destroy() {
				observer.disconnect()
			},
		}
	}
}
