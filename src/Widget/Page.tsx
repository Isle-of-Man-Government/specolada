import React, { useContext } from 'react';
import { Text } from '@chakra-ui/core';

import { StateContext, Id } from 'Store';
import { Page as PageModel } from 'Model';
import { FieldEditor } from 'Widget';

import './page.css';


interface PurePageProps {
    page: PageModel;
    children: ({key: string, child: React.ReactNode})[];  // TODO: child can be either Field or FieldGroup
}
export const PurePage: React.FC<PurePageProps> = ({ page, children }) =>
    <article className={"page"}>
        <Text as="h1" textAlign="center" marginTop={0}>
            {page.title}
        </Text>
        {children.map(({ key, child }) =>
            <React.Fragment key={key}>
                {child}
            </React.Fragment>
        )}
    </article>;


interface ConnectedPageProps {
    pageId: Id;
}
export const ConnectedPage: React.FC<ConnectedPageProps> = ({ pageId }) => {
    const stateContext = useContext(StateContext);

    return (
        <PurePage page={stateContext.getPage(pageId)}>
            {stateContext.getChildrenOf(pageId)
                .map(fieldId => {  // TODO: it can be either a field of field group
                    return { key: fieldId, child: <FieldEditor fieldId={fieldId} /> };
                })
            }
        </PurePage>
    );
};


export const DefaultTestPage: React.FC<{}> = () => {
    const stateContext = useContext(StateContext);
    return <ConnectedPage pageId={stateContext.lastPageUsedId()} />;
};
