import React, { useState } from 'react';
import { Box, Collapse, Divider, Input, Text } from '@chakra-ui/core';

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

    return (
        <Box
            borderRadius={4}
            paddingLeft={2}
            paddingRight={2}
            paddingTop={1}
            paddingBottom={2}
            margin={1}
            backgroundColor="rgba(155, 155, 155, 0.05)"
            border="solid 1px rgba(155, 155, 155, 0.15)"
        >
            <Header
                field={field}
                showPropsPreview={!isExpanded}
                onHeaderClick={toggleExpandedState}
            />
            <Collapse isOpen={isExpanded}>
                <Body
                    field={field}
                    onFieldChange={setField}
                />
            </Collapse>
        </Box>
    );
};
