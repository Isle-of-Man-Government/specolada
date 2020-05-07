import React, { useState } from 'react';
import { Box, Collapse, Divider } from '@chakra-ui/core';

import { Field } from 'Model';

import { Header } from './Header';
import { Body } from './Body';


// TODO: handle saving data: add on change callback
// TODO: move styles to CSS file, maybe


interface PureFieldEditorProps {
    field: Field;
    onSave: (newField: Field) => void;
}

export const PureFieldEditor: React.FC<PureFieldEditorProps> = ({ field: fieldProp, onSave }) => {
    const [isExpanded, setExpanded] = useState(false);
    const toggleExpandedState = () => setExpanded(!isExpanded);

    const [field, setField] = useState(fieldProp);
    const updateField = (newFieldValue: Field) => {
        setField(newFieldValue);
        setSomeFieldChanged(true);
    };

    const [hasSomeFieldChanged, setSomeFieldChanged] = useState(false);
    const saveField = () => {
        onSave(field);
        setSomeFieldChanged(false);
    };

    return (
        <Box
            borderRadius={4}
            paddingX={2}
            paddingY={2}
            margin={1}
            backgroundColor="rgba(155, 155, 155, 0.05)"
            border="solid 1px rgba(155, 155, 155, 0.15)"
        >
            <Header
                field={field}
                showPropsPreview={!isExpanded}
                showSaveControls={hasSomeFieldChanged}
                onHeaderClick={toggleExpandedState}
                onSaveClick={saveField}
            />
            <Collapse isOpen={isExpanded}>
                <Divider
                    marginX={2}
                    color="rgba(155, 155, 155, 0.4)"
                />
                <Body
                    field={field}
                    onFieldChange={updateField}
                />
            </Collapse>
        </Box>
    );
};
