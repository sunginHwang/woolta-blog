import { ChangeEvent, useCallback, useState } from 'react';

export default function useInputs<T>(initialValues: T) {
  const [values, setValue] = useState(initialValues);
  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue({
      ...values,
      [e.target.name]: e.target.value,
    });
  }, [initialValues]);

  return [values, onChange] as [T, typeof onChange];
}