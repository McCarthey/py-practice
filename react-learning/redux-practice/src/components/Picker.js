import React from 'react'

const Picker = ({ value, onChange, options }) => (
  <span>
    <h1>{value}</h1>
    <select onChange={e => onChange(e.target.value)}>
      {options.map((op, i) => (
        <option value={op} key={i}>{op}</option>
      ))}
    </select>
  </span>
)

export default Picker