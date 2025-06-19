// Filename: ExamplePage.jsx
import React from 'react';
import { PrimaryButton, SecondaryButton, SuccessButton, DangerButton } from '../components/Button.jsx';
import "../index.css"

function Test() {
  return (
    <div className="p-5">
      <h2>Contoh Tombol</h2>

      {/* Default */}
      <PrimaryButton className="btn-primary"/>
      {/* Default */}
      <SecondaryButton className="btn-secondary"/>
      {/* Default */}
      <SuccessButton className="btn-secondary"/>
      {/* Default */}
      <DangerButton className="btn-secondary"/>
    </div>
  );
}

export default Test;