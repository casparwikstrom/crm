import { useContext } from 'react'
import { StepContext } from '../context/StepContext'
import SidebarButton from '../ui/SidebarButton'
import forms from '@/data/forms'
import { FormContext } from '../context/FormContext'

function Sidebar() {
  const { state } = useContext(FormContext)
  const { step, dispatchStep } = useContext(StepContext)

  function goTo(to) {
    dispatchStep({ type: 'GO_TO', payload: { to } })
  }

  const buttons = forms.map((form, index) => (
    <SidebarButton
      key={index}
      value={index + 1}
      selected={step.current === index + 1}
      text={form.text}
      onClick={() => goTo(index + 1)}
      disabled={step.isCompleted || state.isValidationError}
    />
  ))

  return (
    <aside className="mobile:w-auto mobile:mr-[-1rem] w-40 desktop:m-0 mobile:flex-row flex-col rounded-lg bg-purple flex justify-center pt-8 mobile:p-[1rem] pb-[6.75rem] text-[0.875rem] font-bold bg-mobile-sidebar bg-bottom bg-no-repeat bg-cover desktop:w-[274px] desktop:flex-col desktop:justify-start desktop:pt-10 px-4 desktop:rounded-sidebar desktop:bg-desktop-sidebar mobile:gap-0 desktop:gap-10">
      {buttons}
    </aside>
  )
}

export default Sidebar
