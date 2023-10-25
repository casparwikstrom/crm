import { useContext } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import { StepContext } from "../context/StepContext"
import Buttons from "../Buttons"



function MainForm(props) {
  const { step } = useContext(StepContext)
  
  const completionClass = step.isCompleted ? 'justify-center' : 'desktop:justify-between'

  return (
    <main className="px-4 desktop:w-[55rem] desktop:mr-4 desktop:mx-[2.25rem] desktop:p-0 desktop:mt-0">
      
      <form
        className={`px-6 py-8 rounded-[10px] text-denim mb-24 desktop:m-0 desktop:shadow-none desktop:p-0 desktop:flex desktop:flex-col desktop:mb-0 desktop:min-h-[528px] ${completionClass}`}
        autoComplete="off"
      >
        <SwitchTransition>
          <CSSTransition key={step.current} classNames="fade" timeout={400}>
            {!step.isCompleted ? props.children : "thank you"}
          </CSSTransition>
        </SwitchTransition>
        <Buttons />
      </form>
    </main>
  )
}

export default MainForm
