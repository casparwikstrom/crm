import { useContext } from 'react'
import { FormContext } from "@/components/context/FormContext"
import Switch from '../ui/Switch'
import plans from "@/data/plans"
import PlanSelect from '../ui/Plan'
import FormHeader from '../ui/FormHeader'

export default function FormPlan() {
  const { state, dispatch } = useContext(FormContext)

  const planSelects = plans.map((item, index) => <PlanSelect key={index} item={item} />)

  function handleChange(event) {
    const { name, checked } = event.target

    dispatch({ type: 'HANDLE_CHANGE', name, value: checked })
  }

  return (
    <div className="flex flex-col">
      <FormHeader title="Select your plan" text="You have the option of monthly or yearly billing." />
      <div className="flex desktop:flex-row gap-3 desktop:gap-[1.125rem]">{planSelects}</div>
      <div className="flex justify-center items-center bg-very-light-gray rounded-large py-[0.875rem] mt-6 desktop:mt-8 font-medium">
        <span>Monthly</span>
        <Switch name="isYearly" checked={state.isYearly} toggle={handleChange} />
        <span>Yealy</span>
      </div>
    </div>
  )
}
