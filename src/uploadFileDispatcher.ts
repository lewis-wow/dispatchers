export interface UploadFileDispatcherOptions {
	acceptManyFiles?: boolean
}

export default function createUploadFileDispatcher(
	uploader: <T>(files: File[]) => T | void,
	options: UploadFileDispatcherOptions = {}
) {
	const acceptManyFiles = options?.acceptManyFiles ?? false
	let files: File[] = []

	const eventUploadDirective = (node: HTMLInputElement) => {
		const eventListener = (e: Event) => {
			const { files: inputFiles } = e.target as HTMLInputElement

			if (inputFiles === null) {
				files = []
				return
			}

			if (acceptManyFiles) {
				files = Array.from(inputFiles)
				return
			}

			files = [inputFiles[0]]
		}

		node.addEventListener('change', eventListener)

		acceptManyFiles && node.setAttribute('multiple', 'multiple')

		return {
			destroy() {
				node.removeEventListener('change', eventListener)
			},
		}
	}

	const dispatchUpload = () => uploader(files)

	return [eventUploadDirective, dispatchUpload] as const
}
