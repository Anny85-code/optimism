import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Printer = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
  });

  return (
    <div ref={componentRef}>
      <button type="button" onClick={handlePrint}>
        Print
      </button>
    </div>
  );
};

export default Printer;
