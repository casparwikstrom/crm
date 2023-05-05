
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactFlagsSelect from 'react-flags-select';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, locales, asPath } = router;
  const [select, setSelect] = useState("US");

  const onSelect = (code) => {

    handleChange(code);
    return setSelect(code);
  };

  const countryOptions = locales.map((lang) => ({
    value: lang,
    label: lang.toUpperCase(),
  }));

  const handleChange = (countryCode) => {
    if (countryCode === "US") {
      countryCode = "en";
    }
    const selectedOption = countryOptions.find(
      (option) => option.value === countryCode.toLowerCase()
    );
    
    const href = countryCode != "en" ? `/${selectedOption.value}${asPath}` : asPath;

    router.push(href, href, { locale: selectedOption.value });
  };


  console.log("SELECT", select);
  return (
    <ReactFlagsSelect
      selected={select}
      onSelect={onSelect}
      countries={['US', 'RU', 'FR', 'ES', 'RO']}
      className="dark:bg-gray-900 dark:text-gray-100"
    />
  );
};

export default LanguageSwitcher;
