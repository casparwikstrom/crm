import { createContext, useReducer, useEffect } from 'react';
import inputs from '@/data/inputs';

const importedInputs = {};
inputs.forEach(input => {
  importedInputs[input.name] = '';
});

const initialState = {
  ...importedInputs,
  isValidationError: true,
  plan: 'Arcade',
  isYearly: false,
  addons: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'HANDLE_CHANGE':
      return {
        ...state,
        [action.name]: action.value
      };
    case 'ADD_ADDON':
      return {
        ...state,
        addons: [...state.addons, action.addon]
      };
    case 'REMOVE_ADDON':
      return {
        ...state,
        addons: state.addons.filter(addon => addon.name !== action.addon.name)
      };
    case 'SET_VALIDATION':
      return {
        ...state,
        isValidationError: action.isValidationError
      };
    default:
      return state;
  }
}

const FormContext = createContext();

function FormProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('formData');
      return savedState ? JSON.parse(savedState) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log(state)
      localStorage.setItem('formData', JSON.stringify(state));
    }
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FormContext.Provider>
  );
}

export { FormProvider, FormContext };
