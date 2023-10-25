import { useContext } from 'react'
import { FormContext } from "@/components/context/FormContext"

export default function PlanSelect({ item }) {
  const { state, dispatch } = useContext(FormContext)

  function handleChange(event) {
    const { name, type: inputType, value, checked } = event.target

    dispatch({
      type: 'HANDLE_CHANGE',
      name,
      value: inputType === 'checkbox' ? checked : value
    })
  }

  return (
    <label>
      <input
        checked={state.plan === item.name}
        type="radio"
        name="plan"
        value={item.name}
        className="peer sr-only"
        onChange={handleChange}
      />
      <div className="flex transition-all border-light-gray rounded-large p-4 border-[1px] peer-checked:bg-very-light-gray cursor-pointer peer-checked:border-purple gap-[0.875rem] desktop:justify-between desktop:flex-col desktop:h-[160px] desktop:w-[138px]">
        <img src={item.img} className="desktop:w-[40px]" alt={`${item.name} plan`} />
        <div className="flex flex-col justify-between">
          <h5 className="font-medium">{item.name}</h5>
          <p className="text-gray text-body-m">
            ${state.isYearly ? item.price.yearly : item.price.monthly}/{state.isYearly ? 'yr' : 'mo'}
          </p>
          {state.isYearly && <p className="text-body-s">2 months free</p>}
        </div>
      </div>
    </label>
  )
}
