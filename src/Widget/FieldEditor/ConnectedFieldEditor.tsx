import React from 'react';

import { Id, useSpecoladaStore } from 'Store';

import { PureFieldEditor } from './PureFieldEditor';


interface ConnectedFieldEditorProps {
    fieldId: Id;
}

export const ConnectedFieldEditor: React.FC<ConnectedFieldEditorProps> = ({ fieldId }) => {
    const store = useSpecoladaStore();
    return (
        <PureFieldEditor
            field={store.getField(fieldId)}
            onSave={(newFieldValue) => {
                store.updateField(fieldId, newFieldValue);
            }}
        />
    );
};
