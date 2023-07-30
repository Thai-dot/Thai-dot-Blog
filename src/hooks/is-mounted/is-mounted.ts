import React from "react";

export default function useIsMounted() {
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);

  return mounted;
}
