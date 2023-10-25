const validationRegex = {
  text: /[A-Za-zА-Яа-яёЁ]{1,20}\-?[A-Za-zА-Яа-яёЁ]{1,20}/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  tel: /^[\+\d]?(?:[\d-.\s()]*)$/
}

export default validationRegex
