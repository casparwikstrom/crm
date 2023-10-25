export default function FormHeader(props) {
  return (
    <>
      <h1 className="text-heading-mobile desktop:text-heading font-bold mb-2 desktop:mb-[0.625rem]">{props.title}</h1>
      <p className="text-gray mb-[1.375rem]">{props.text}</p>
    </>
  )
}
