export default function Switch(props) {
  return (
    <label className="mx-6 relative inline-block w-[38px] h-[20px]" aria-label="Monthly of yearly">
      <input
        className="peer sr-only"
        type="checkbox"
        name={props.name}
        checked={props.checked}
        onChange={props.toggle}
      />
      <span className="absolute cursor-pointer inset-0 rounded-[10px] bg-denim before:absolute before:content-[''] before:h-[14px] before:w-[14px] before:rounded-full before:left-[4px] before:bottom-[3px] before:bg-white peer-focus-visible:bg-violet-500 peer-checked:before:translate-x-[16px] before:transition-all"></span>
    </label>
  )
}
