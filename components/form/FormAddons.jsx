import Addon from '../ui/Addon'

import FormHeader from '../ui/FormHeader'

export default function FormAddons(props) {
  
  const addonSelects = props.data.map((addon, index) => {
    debugger
    return <Addon key={index} item={addon} />
  })
  
  return (
    <div className="flex flex-col">
      <FormHeader text={props.title} />
      {addonSelects}
    </div>
  )
}
