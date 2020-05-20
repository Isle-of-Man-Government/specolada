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

export const Header: React.FC<HeaderProps> = (
    { field, showPropsPreview, showSaveControls, onHeaderClick, onSaveClick }
) =>
    <Flex
        onClick={onHeaderClick}
            margin={1}
            flexWrap="wrap"
        >
            <TitleOrReplacementText title={field.title} />
            <PropsPreview show={showPropsPreview} />
            <SaveButton show={showSaveControls} onSaveClick={onSaveClick} />
        </Flex>;

const TitleOrReplacementText: React.FC<{ title: string }> = ({ title }) =>
    (title &&
        <Text as="span">
            {title}
            &nbsp; {/* effectively, this serves as 'min height' */}
        </Text>
    ) || (
        <Text as="span" opacity={0.5}>
            {"<no title>"}
        </Text>
    );

const PropsPreview: React.FC<{ show: boolean }> = ({ show }) =>
    <Collapse
        isOpen={show}
        marginLeft={4}
    >
        <Text
            as="span"
            fontSize={14}
            color="rgba(150, 150, 150, 0.3)"
        >
            other props will show here
        </Text>
    </Collapse>;

const SaveButton: React.FC<{ show: boolean, onSaveClick: () => void }> = ({ show, onSaveClick }) =>
    <Button
        variantColor="green"
        size="sm"
        visibility={show ? "visible" : "hidden"}
        marginLeft="auto"  // to keep it on the right
        flexShrink={0}  // keep shape when other elements in the flex grow bigger
        border={0}
        opacity={0.8}
        onClick={onSaveClick}
    >
        Save
    </Button>;
