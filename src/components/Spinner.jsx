import React from 'react';

function Spinner() {
  return (
    <div className="flex flex-col items-center w-full justify-center py-3">
      <div className="w-10 h-10 border-2 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
      <p className="font-bold">Loading data...</p>
    </div>
  );
}

export default Spinner;
