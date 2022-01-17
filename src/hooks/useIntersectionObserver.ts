import { useState, useEffect, useCallback, LegacyRef } from "react";

const defaultOptions = {
  root: null,
  rootMargin: "1px",
  threshold: 0.1,
};

export default function useIntersectionObserver(
  onIntersect: {
    (entry: any, observer: any): void;
    (arg0: any, arg1: any): void;
  },
  option = defaultOptions
) {
  const [ref, setRef] = useState<any>(null);
  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );
  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, option);
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option, checkIntersect]);
  return [ref, setRef];
}
