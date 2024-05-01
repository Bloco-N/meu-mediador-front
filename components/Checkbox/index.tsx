import React from 'react'
import * as C from './styles'  

export const Checkbox:React.FC<any> = ({
    value,
    checked,
    onChange,
    name,
    id,
    label,
    disabled
  }) => {
    return (
      <C.Label htmlFor={id} disabled={disabled}>
        {label}
        <C.Input
          id={id}
          type="checkbox"
          name={name}
          value={value}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <C.Indicator />
      </C.Label>
    );
  }
  