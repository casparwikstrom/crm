// components/withTranslations.js
import React from 'react';
import { useRouter } from 'next/router';

const withTranslations = (WrappedComponent) => {
  const WithTranslations = (props) => {
    const router = useRouter();
    const { locale } = router;

    const translatedProps = {
      ...props,
      // Add any additional translation-related logic here
      // For example, modify the API fetch URL to include the `lang` query parameter
    };

    return <WrappedComponent {...translatedProps} />;
  };

  WithTranslations.displayName = `WithTranslations(${getDisplayName(WrappedComponent)})`;

  return WithTranslations;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withTranslations;