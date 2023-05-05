import InventarizationBody from './InventarizationBody';
import AdditionalHeader from '../../Headers/AdditionalHeader';

function Inventarization() {
  return (
    <>
      <AdditionalHeader linkTo='/storage' />
      <InventarizationBody />
    </>
  );
}

export default Inventarization;
