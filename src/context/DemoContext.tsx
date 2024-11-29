import { PropsWithChildren, useState } from 'react';
import { DemoContext } from '.';

export function DepoProvider({ children }: PropsWithChildren) {
  const [nodeId, setNodeId] = useState<null | number>(null);

  return (
    <DemoContext.Provider
      value={{
        nodeId,
        setNodeId,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
