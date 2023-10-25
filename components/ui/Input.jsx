export default function Input({ isError, ...props }) {
  const borderClass = isError ? 'border-red-errors focus:outline-red-errors' : 'border-border'

  return (
    <label className="flex flex-col">
      <div className="mb-[3px] desktop:mb-2 flex justify-between">
        <span>{props.label}</span>
        {isError && <span className="text-red-errors font-bold">This field is required</span>}
      </div>
      <input
        className={`py-3 px-4 font-medium rounded-small desktop:rounded-large border-[1px] focus:outline-purple ${borderClass}`}
        {...props}
      />
    </label>
  )
}
