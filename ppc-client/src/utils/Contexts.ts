import { createContext } from 'react';

export const LoaderContext = createContext({
    pendingActions: 0,
    increasePendingAction: () => { },
    decreasePendingActions: () => { }
});
