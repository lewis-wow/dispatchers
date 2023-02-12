# Fetch

## Infinity scroll

```ts
const infinityScroll = createInfinityScrollDispatcher(
  (limit) => fetch('something'), // fetcher
  (data) => console.log(data) // callback
)

const anchor = document.querySelector('div')
const scroller = infinityScroll(anchor)

scroller.destroy() // remove the observer
```

## Pagination

```ts
const paginate = createPaginationDispatcher(
  (offset: number, limit: number) => fetch('something'),
  (data: any, offset: number, limit: number) => data,
  {
    limit: 10, // fetch 10 items at a time, default: 10
    offset: 0, // start from 0, default: 0
    end: 100, // stop after 100 items, -1 for infinite, default: -1
  }
)

paginate.next().then((result) => console.log(result))

paginate.return() // stop the generator
```

### Upload files

```tsx
const [registerUploader, dispatchUpload] = createUploadFileDispatcher((files) =>
  console.log(files),
  {
    acceptManyFiles: false, // default false
  }
)

<form onSubmit={(e) => {
    e.preventDefault()
    dispatchUpload()
  }}
>
  <input type="file" ref={(el) => registerUploader(el)}>

  <button type="submit">Submit</button>
</form>
```

## Form data

```ts
const [data, getData] = createDataDispatcher({
  name: expectString(''),
  age: expectNumber(0),
  interval: expectCustom([0, 0], (newValue) => {
    const [start, end] = newValue.split('-').map(Number.parseFloat)
    return [start, end]
  }),
  date: expectDate(new Date()),
})
```

```tsx
<form
  onSubmit={(e) => {
    e.preventDefault()
    console.log(getData())
  }}
>
  <input type="text" onChange={data.name} />
  <input type="number" onChange={data.age} />
  <input type="text" onChange={data.interval} />
  <input type="date" onChange={data.date} />

  <button type="submit">Submit</button>
</form>
```
