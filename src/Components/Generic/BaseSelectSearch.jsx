import React, { useState } from "react";
import Select from 'react-select';

const BaseSelectSearch = ({ options, onChange, value, width }) => {
    const [selected, setSelected] = useState(value);
    const onChangeSelect = (value) => {
        setSelected(value);
        onChange(value);
    }
  return (
    <div style={{width: width}}>
        <Select
          options={options}
          placeholder="Select movie..."
          defaultValue={selected}
          onChange={(value) => onChangeSelect(value)}
          isSearchable
        />
    </div>
  );
};

export default BaseSelectSearch;
