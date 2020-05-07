import React, { useContext } from 'react';

import { Id, StateContext } from 'Store';

import { PureFieldEditor } from './PureFieldEditor';


interface ConnectedFieldEditorProps {
    fieldId: Id;
}

export const ConnectedFieldEditor: React.FC<ConnectedFieldEditorProps> = ({ fieldId }) => {
    const stateContext = useContext(StateContext);
    return (
        <PureFieldEditor
            field={stateContext.getField(fieldId)}
            onSave={(newFieldValue) => {
                stateContext.updateField(fieldId, newFieldValue);
            }}
        />
    );
};
