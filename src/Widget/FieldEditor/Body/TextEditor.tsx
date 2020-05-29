import React from "react";
import { Input } from "@chakra-ui/core";

import { ui } from "./common";
import { Label } from "./Label";


interface Props {
    title: string;
    value: string;
    onValueChange: (newValue: string) => void;
}

export const TextEditor: React.FC<Props> = ({ title, value, onValueChange }) => {
    return (
        <>
            <Label title={title} />
            <Input
                size={ui.size}
                width={ui.width}
                borderRadius={ui.radius}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
            />
        </>
    );
};
