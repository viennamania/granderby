//export { default as useLocalStorage } from 'react-use/lib/useLocalStorage';

export { default as useLocalStorage } from 'use-local-storage-state';

////export { default as useLocalStorage } from 'react-use/lib/useLocalStorage';

/*
import { useEffect, useState } from "react";

export default function useLocalStorage(key: string,) {
///////function useLocalStorage(key: string, initialValue: any) {
    const [value, setValue] = useState(() => {
      try {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : undefined;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    });
  
    useEffect(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }, [key, value]);
  
    return [value, setValue];
  }

  */
