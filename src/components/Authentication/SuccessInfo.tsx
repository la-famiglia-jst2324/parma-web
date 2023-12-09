export default function SuccessInfo({ msg }: { msg: string }) {
  return (
    <div className="relative rounded border border-green-400 bg-green-100 px-4 py-3 text-red-700" role="alert">
      <span className="block sm:inline">{msg}</span>
    </div>
  )
}
