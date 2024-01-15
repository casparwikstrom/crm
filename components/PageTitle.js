export default function PageTitle({ children }) {
  return (
    <h1 className="py-2 md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl">
      {children}
    </h1>
  )
}
