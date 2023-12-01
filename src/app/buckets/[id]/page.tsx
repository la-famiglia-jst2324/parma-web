'use client'

export default function BucketPage({ params: { id } }: { params: { id: string } }) {
  console.log(id)
  return (
    <div>
      <h1>Bucket {id}</h1>
    </div>
  )
}
