import FormPersonal from "@/components/form/FormPersonal"
import FormPlan from '@/components/form/FormPlan'
import FormAddons from '@/components/form/FormAddons'
import FormSummary from '@/components/form/FormSummary'
import addOns from "../data/add-ons"

const forms = [
  {
    component: <FormPersonal />,
    text: 'Your info'
  },
  {
    component: <FormAddons title="Vilka avdelningar kommer att jobba med systemet?" data={addOns[0]} />,
    text: 'Add-ons'
  },
  {
    component: <FormAddons title="Listan nedan visar viktiga grundläggande moduler i ett CRM, vilka har ni behov av?" data={addOns[1]} />,
    text: 'Add-ons'
  },
  {
    component: <FormAddons title="nummer treee?" data={addOns[2]} />,
    text: 'Add-ons'
  },
  {
    component: <FormSummary />,
    text: 'Summary'
  }
]

export default forms
