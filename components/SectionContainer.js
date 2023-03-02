export default function SectionContainer({ children }) {
  return (
    <div
      className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0"
      style={{ maxWidth: 'clamp(0px, 800px, 100%)', lineHeight: '2' }}
    >
      {children}
    </div>
  )
}
