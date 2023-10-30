import { useContext } from 'react'

import { FormContext } from "@/components/context/FormContext"
import { StepContext } from "@/components/context/StepContext"
import FormHeader from '../ui/FormHeader'
import plans from '../../data/plans'

export default function FormSummary() {
  const { state } = useContext(FormContext)
  const { dispatchStep } = useContext(StepContext)

  const termSlug = state.isYearly ? 'yr' : 'mo'
  const currentPlan = plans.find(plan => plan.name === state.plan)
  const planPrice = state.isYearly ? currentPlan.price.yearly : currentPlan.price.monthly

  const addons = state.addons.map((addon, index) => (
    <li key={index} className="flex justify-between mt-3">
      <span>{addon.name}</span>
      <span className="text-denim">
        {/* +{state.isYearly ? addon.price.yearly : addon.price.monthly}/{termSlug} */}
      </span>
    </li>
  ))

  // const addonsPrice = state.addons.reduce((result, currentAddon) => {
  //   return result + (state.isYearly ? currentAddon.price.yearly : currentAddon.price.monthly)
  // }, 0)
  // const totalPrice = planPrice + addonsPrice
  const hasAddons = state.addons.length > 0

  function goToSelectPlan() {
    dispatchStep({
      type: 'GO_TO',
      payload: { to: 2 }
    })
  }

  return (
    <div className="flex flex-col">
      <FormHeader title="Finishing up" text="Double-check everything looks OK before confirming." />
      <div className="p-4 bg-very-light-gray text-body-m rounded-large">
        <div className="flex justify-between items-center">
          <div>

            <button
              type="button"
              className="underline text-gray hover:text-purple transition-colors"
              onClick={goToSelectPlan}
            >
              Change
            </button>
          </div>
          <span className="font-bold">
           
          </span>
        </div>
        {hasAddons && <ul className="mt-3 border-t-gray border-t-[1px] text-gray">{addons}</ul>}
      </div>
      <div className="flex justify-between mt-6 mx-4">
        <span className="text-gray text-body-m">Total (per {state.isYearly ? 'year' : 'month'})</span>
        <span className="text-purple font-bold">
          
        </span>
      </div>
    </div>
  )
}
