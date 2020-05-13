import React from 'react';

import { FieldEditor } from 'Widget';
import { Id, useSpecoladaStore } from 'Store';

import { PurePage } from './PurePage';


interface ConnectedPageProps {
    pageId: Id;
}

export const ConnectedPage: React.FC<ConnectedPageProps> = ({ pageId }) => {
    const store = useSpecoladaStore();

    return (
        <PurePage
            page={store.getPage(pageId)}
            onAddFieldClick={() => store.addFieldTo(pageId)}
        >
            {store.getChildrenIdsOf(pageId)
                .map(fieldId => {  // TODO: it can be either a field of field group
                    return { key: fieldId, child: <FieldEditor fieldId={fieldId} /> };
                })
            }
        </PurePage>
    );
};
