// pages/taxes/index.js
import StaticDataComponent from '../../components/StaticDataComponent';
import { fetchVideoData } from '@/lib/utils/api/api';
import TaxCalculator from "@/components/tax/TaxCalculator"

export default function TaxesPage({ vid, metaData }) {
  return (
    <div>
      <TaxCalculator />
      <StaticDataComponent vid={vid} metaData={metaData} />
    </div>
  
  );
}

export async function getStaticProps() {
  const slug = 'tax-calculator'; // Replace with the actual slug you want to fetch
  const vid = await fetchVideoData(slug);

  return {
    props: { vid },
  };
}
