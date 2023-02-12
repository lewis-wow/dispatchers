import { createUploadFileDispatcher } from './src/main'

const [upload, dispatch] = createUploadFileDispatcher(
	(files) => console.log(files),
	{
		acceptManyFiles: true,
	}
)

upload(document.querySelector('input[type="file"]')!)

dispatch()
