import React from 'react';

const TableHeader = (headerData) => (
  <thead>
    <tr>
      {headerData.map((title) => (
        <th key={title}>{title}</th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
