import React from 'react';
import { Button, Collapse, Flex, Text } from '@chakra-ui/core';

import { Field } from 'Model';


interface HeaderProps {
    field: Field;
    showPropsPreview: boolean;
    showSaveControls: boolean;
    onHeaderClick: () => void;
    onSaveClick: () => void;
}

export const Header: React.FC<HeaderProps> =
    ({ field, showPropsPreview, showSaveControls, onHeaderClick, onSaveClick }) =>
        <Flex onClick={onHeaderClick} margin={1}>
            <Text as="span">
                {field?.title}
            &nbsp; {/* effectively, this serves as 'min height' */}
            </Text>
            <Collapse isOpen={showPropsPreview}
                marginLeft={4}
            >
                <Text
                    as="span"
                    fontSize={14}
                    color="rgba(150, 150, 150, 0.3)"
                >
                    other props will show here
            </Text>
            </Collapse>
            <Button
                variantColor="green"
                size="sm"
                visibility={showSaveControls ? "visible" : "hidden"}
                marginLeft="auto"  // to keep it on the right if it spills to the next line
                border={0}
                opacity={0.8}
                onClick={onSaveClick}
            >
                Save
        </Button>
        </Flex>;
