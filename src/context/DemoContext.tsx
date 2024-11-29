import React, { PropsWithChildren, useState } from 'react';

type TDemoContext = {
  nodeId: number;
  setNodeId: (id: number) => void;
};

const default_context = {
  nodeId: 1,
  setNodeId: () => {},
};

export const DemoContext = React.createContext<TDemoContext>(default_context);

export function DepoProvider({ children }: PropsWithChildren) {
  const [nodeId, setNodeId] = useState(1);

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
