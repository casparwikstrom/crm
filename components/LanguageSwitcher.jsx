
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
      countryCode = 'en';
    }
    if (countryCode === "SE") {
      countryCode = "sv";
    }
    if (countryCode === "SA") {
      countryCode = "AR";
    }

    const selectedOption = countryOptions.find(
      
      (option) => option.value === countryCode.toLowerCase()
    );

    const href = countryCode != "sv" ? `/${selectedOption.value}${asPath}` : asPath;

    router.push(href, href, { locale: selectedOption.value });
  };

  return (
    <ReactFlagsSelect
      selected={select}
      onSelect={onSelect}
      countries={['SE', 'US', 'ES', 'RO']}
      className="dark:bg-gray-900 dark:text-gray-100"
      //fullWidth={true}
      selectedSize={14}
        /*showSelectedLabel={showSelectedLabel}
      selectedSize={selectedSize}
      showOptionLabel={showOptionLabel}
      optionsSize={optionsSize}
      placeholder={placeholder}
      searchable={searchable}
      searchPlaceholder={searchPlaceholder}
      alignOptionsToRight={alignOptionsToRight}
      fullWidth={fullWidth}
      disabled={disabled} */
    />
  );
};

export default LanguageSwitcher;
