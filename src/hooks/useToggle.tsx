import { useState } from 'react';

export const useToggle = () => {
  const [value, setValue] = useState(false);

  const toggle = (val?: boolean) =>
    setValue((prev) => (typeof val === 'boolean' ? val : !prev));

  return [value, toggle] as const;
};
