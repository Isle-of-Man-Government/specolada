import React from 'react';
import { Collapse, Flex, Text } from '@chakra-ui/core';

import { Field } from 'Model';


interface HeaderProps {
    field: Field;
    showPropsPreview: boolean;
    onHeaderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ field, showPropsPreview, onHeaderClick }) => 
    <Flex onClick={onHeaderClick}>
        <Text as="span">
            {field?.title}
            &nbsp; {/* prevents collapsing */}
        </Text>
        <Collapse isOpen={showPropsPreview}
            marginLeft={4}
        >
            <Text
                as="span"
                fontSize={2}
                color="rgba(150, 150, 150, 0.3)"
            >
                other props will show here
            </Text>
        </Collapse>
    </Flex>;
