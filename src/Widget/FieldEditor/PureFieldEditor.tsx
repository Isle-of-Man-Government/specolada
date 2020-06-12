import React, { useState } from 'react';
import { Box, Collapse, Divider } from '@chakra-ui/core';

import { Field } from 'Model';
import { TreeNode } from 'Store';

import { Header } from './Header';
import { Body } from './Body';


// TODO: handle saving data: add on change callback
// TODO: move styles to CSS file, maybe


///// DOING RIGHT NOW
// Split Validation Rules into UI and data handling
// how a Field and field's Id are passed around must be reworked a bit


interface PureFieldEditorProps {
    field: Field & TreeNode;
    onSave: (newField: Field) => void;
}

export const PureFieldEditor: React.FC<PureFieldEditorProps> = ({ field: incomingFIeld, onSave }) => {
    const [isExpanded, setExpanded] = useState(true);
    const toggleExpandedState = () => setExpanded(!isExpanded);

    const [localField, setLocalField] = useState(incomingFIeld);
    const updateField = (newFieldValue: Field & TreeNode) => {
        console.log(`Pure Field Editor - field update: ${JSON.stringify(newFieldValue, null, 2)}`);
        
        setLocalField(newFieldValue);
        setSomeFieldChanged(true);
    };

    const [hasSomeFieldChanged, setSomeFieldChanged] = useState(false);
    const saveField = () => {
        onSave(localField);
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
                field={localField}
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
                    field={localField}
                    onFieldChange={updateField}
                />
            </Collapse>
        </Box>
    );
};
