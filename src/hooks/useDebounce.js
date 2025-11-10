
import { useState, useEffect } from 'react';

// এই হুকটি ইউজার টাইপ করা থামা পর্যন্ত অপেক্ষা করে
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay সময় পর ভ্যালু আপডেট করে
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // ইউজার নতুন করে টাইপ করলে আগের টাইমারটি ক্লিয়ার করে দেয়
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}