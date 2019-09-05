import { useEffect, useRef } from 'react';

// only update call not on initial mount
// see https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update
export default function useUpdateEffect(effect: () => any, dependencies: Array<any> = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
  }, dependencies);
}