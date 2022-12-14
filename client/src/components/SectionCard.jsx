import React from 'react';
import { useState } from 'react';
import { CaretDown } from 'phosphor-react';
import '../index.css';

export default function SectionCard({ name, value, detail, detailContent }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex-col">
      <div className="text-color-vorboss2 bg-color-vorboss1 card">
        <span className="card-name">{name}: </span>
        <span className="card-value">{value}</span>
        {detail && (
          <CaretDown
            size={32}
            onClick={() => setOpen(!open)}
            className="pointer"
          >
            ⬇️
          </CaretDown>
        )}
      </div>
      {open &&
        detailContent &&
        detailContent.map((content, index) => (
          <div key={index} className="card-detail">
            <span className="card-detail-name">{content.name}: </span>
            <span className="card-detail-value">{content.value}</span>
          </div>
        ))}
    </div>
  );
}
