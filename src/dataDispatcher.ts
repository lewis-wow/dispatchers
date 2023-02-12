export const expectNumber = (initialValue: number) => {
	let value = initialValue

	return (newValue?: string) => {
		if (newValue === undefined) return value

		value = Number.parseFloat(newValue)
		return value
	}
}

export const expectString = (initialValue: string) => {
	let value = initialValue

	return (newValue?: string) => {
		if (newValue === undefined) return value

		value = newValue
		return value
	}
}

export const expectBoolean = (initialValue: boolean) => {
	let value = initialValue

	return (newValue?: string) => {
		if (newValue === undefined) return value

		value = newValue === 'true'
		return value
	}
}

export const expectDate = (initialValue: Date | null) => {
	let value = initialValue

	return (newValue?: string) => {
		if (newValue === undefined) return value

		value = new Date(newValue)
		return value
	}
}

export const expectCustom = <T>(
	initialValue: T,
	watcher: (newValue: string) => T
) => {
	let value = initialValue

	return (newValue?: string) => {
		if (newValue === undefined) return value

		value = watcher(newValue)
		return value
	}
}

export default function createDataDispatcher(
	data: Record<string | symbol, any>
) {
	const proxy = new Proxy(data, {
		get(target, prop) {
			return (e: Event) => {
				const { value } = e.target as HTMLInputElement
				console.log(value)

				target[prop](value)
			}
		},
	})

	const getData = () => {
		const res: Record<string | symbol, any> = {}

		Object.keys(data).forEach((key) => {
			res[key] = data[key]()
		})

		return res
	}

	return [proxy, getData] as const
}
