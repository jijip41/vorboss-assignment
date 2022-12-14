import React from 'react';
import { useState } from 'react';
import { CaretDown } from 'phosphor-react';

import './index.css';

export default function SectionCard({ name, value, detail, detailContent }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-col">
      <div className="text-color-vorboss2 bg-color-vorboss1 card">
        <span className="card-name">{name}: </span>
        <span className="card-value">{value}</span>
        {detail && (
          <CaretDown size={32} onClick={() => setOpen(!open)}>
            ⬇️
          </CaretDown>
        )}
      </div>
      {open &&
        detailContent &&
        detailContent.map((content) => (
          <div>
            <span className="card-name">{content.name}: </span>
            <span className="card-value">{content.value}</span>
          </div>
        ))}
    </div>
  );
}
