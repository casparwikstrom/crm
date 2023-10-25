import { useContext } from 'react'
import { FormContext } from "@/components/context/FormContext"

export default function Addon({ item }) {
  const { state, dispatch } = useContext(FormContext)
  const isAdded = state.addons.some(addon => addon.name === item.name)
/*   const addonPrice = "state.isYearly ? item.price.yearly : item.price.monthly"
  const termSlug = state.isYearly ? 'yr' : 'mo' */

  function handleChange(event) {
    const { checked } = event.target
    dispatch({
      type: checked ? 'ADD_ADDON' : 'REMOVE_ADDON',
      addon: item
    })
  }

  return (
    <label
      className={`flex items-center transition-all border-light-gray rounded-large px-4 py-1 border-[1px] mb-3 peer-checked:bg-very-light-gray cursor-pointer peer-checked:border-purple text-body-s ${
        isAdded ? 'bg-very-light-gray border-purple' : ''
      }`}
    >
      <input
        checked={isAdded}
        type="checkbox"
        className="appearance-none transition-colors w-[20px] h-[20px] border-light-gray border-[1px] rounded-small focus:border-purple checked:border-purple checked:bg-purple checked:bg-checkmark checked:bg-no-repeat checked:bg-center shrink-0 cursor-pointer"
        onChange={handleChange}
      />
      <div className="flex flex-col justify-between ml-[0.875rem]">
        <h5 className="font-medium text-body-m">{item.name}</h5>
        {/* <p className="text-gray text-body-m">{item.description}</p> */}
      </div>
      {/* <span className="ml-auto text-purple">
        +${addonPrice}/{termSlug}
      </span> */}
    </label>
  )
}
