import React from 'react';
import { Text, Button } from '@chakra-ui/core';

import { Page } from 'Model';

import './page.css';


interface PurePageProps {
    page: Page;
    onAddFieldClick: () => void;
    children: ({key: string, child: React.ReactNode})[];  // TODO: child can be either Field or FieldGroup
}

export const PurePage: React.FC<PurePageProps> = ({ page, onAddFieldClick, children }) =>
    <article className={"page"}>
        <Text as="h1" textAlign="center" marginTop={0}>
            {page.title}
        </Text>
        {children.map(({ key, child }) =>
            <React.Fragment key={key}>
                {child}
            </React.Fragment>
        )}
        <Button onClick={onAddFieldClick}>
            + Add Field
        </Button>
    </article>;
