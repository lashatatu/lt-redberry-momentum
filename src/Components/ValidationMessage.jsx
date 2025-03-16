import React from 'react';

const ValidationMessage = ({ value, hasError, message }) => {
  const className = value.length > 0
    ? hasError
      ? "text-error"
      : "text-success"
    : "";

  return (
    <div className={className}>
      √ {message}
    </div>
  );
};

export default ValidationMessage;
