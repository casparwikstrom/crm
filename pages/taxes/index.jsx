
import TaxCalculator from '@/components/tax/TaxCalculator';
import dynamic from 'next/dynamic';

const SSRComponent = dynamic(() => import('../../components/StaticData'), {
  ssr: true,
});

export default function Tax({ metaData }) {
    
    return (
      <div>
        <TaxCalculator />
        <SSRComponent slug="tax-calculator" metaData={metaData}/>
      </div>
    );
}


