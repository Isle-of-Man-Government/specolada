import React from 'react';

import { useSpecoladaStore } from 'Store';

import { ConnectedPage } from './ConnectedPage';


export const DefaultTestPage: React.FC<{}> = () => {
    const store = useSpecoladaStore();
    return (
        <ConnectedPage pageId={store.lastPageUsedId()} />
    );
};
