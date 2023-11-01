import { useContext } from 'react'

import Sidebar from "@/components/form/FormSidebar"
import MainForm from '@/components/form/MainForm'

import { StepContext } from '@/components/context/StepContext'
import forms from "@/data/forms"

export default function SystemGuide() {
  const { step } = useContext(StepContext)

  return (
    
    <div className="min-w-full ml-0 grid-gap-4 flex mobile:flex-col mt-10 rounded-lg desktop:flex-row shadow-form desktop:mx-auto desktop:py-4 desktop:pl-4 desktop:rounded-main">
      
        <Sidebar />
        <MainForm>{forms[step.current - 1].component}</MainForm>
      
    </div>
  )
}

