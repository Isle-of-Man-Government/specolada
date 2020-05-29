import React from 'react';
import { Text, Button } from '@chakra-ui/core';

import { Page } from 'Model';

import './page.css';


interface PurePageProps {
    page: Page;
    onAddFieldClick: () => void;
}

export const PurePage: React.FC<PurePageProps> = ({ page, onAddFieldClick, children }) =>
    <article className={"page"}>
        <Text as="h1" textAlign="center" marginTop={0}>
            {page.title}
        </Text>
        {children}
        <Button onClick={onAddFieldClick}>
            + Add Field
        </Button>
    </article>;
