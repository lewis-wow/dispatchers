export interface PaginationDispatcherOptions {
	limit?: number
	offset?: number
	end?: number
}

export default function createPaginationDispatcher<T>(
	fetcher: (offset: number, limit: number) => Promise<T>,
	callback: <T>(data: T, offset: number, limit: number) => T,
	options: PaginationDispatcherOptions = {}
) {
	let offset = options?.offset ?? 0
	const end = options?.end ?? -1
	const limit = options?.limit ?? 10

	return (async function* () {
		while (offset < end || end === -1) {
			const data = await fetcher(offset, limit)
			offset += limit

			yield callback(data, offset, limit)
		}
	})()
}
