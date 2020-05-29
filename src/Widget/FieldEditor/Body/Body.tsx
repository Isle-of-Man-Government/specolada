import React from 'react';

import { Field } from 'Model';

import { TextEditor } from './TextEditor';
import { TypeEditor } from './TypeEditor';
import { ValidationRulesSection } from './ValidationRulesSection';


// TODO: handle 'required'
// TODO: handle null values for 'hintText': on/off switch maybe?
// TODO: move styles to CSS file, maybe


interface Props {
    field: Field;
    onFieldChange: (newField: Field) => void;
}

export const Body: React.FC<Props> = ({ field, onFieldChange }) => {
    // helper, to make the rest of the code shorter and more readable
    const partialFieldUpdate = (fieldPart: Partial<Field>) => onFieldChange({...field, ...fieldPart});

    return (<>
        <TextEditor
            title="field title"
            value={field.title}
            onValueChange={newValue => partialFieldUpdate({ title: newValue })}
        />
        <TypeEditor
            title="field type"
            value={field.type}
            onValueChange={newValue => partialFieldUpdate({ type: newValue })}
        />
        <ValidationRulesSection
            rules={field.validationRules}
            availableRules={field.type?.allowedRules ?? []}
            onValueChange={newValue => partialFieldUpdate({ validationRules: newValue })}
        />
        <TextEditor
            title="hint text"
            value={field.hintText ?? ""}
            onValueChange={newValue => partialFieldUpdate({ hintText: newValue })}
        />
    </>);
};
