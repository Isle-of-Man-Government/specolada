import React from "react";
import { Text } from "@chakra-ui/core";

import { ui } from "./common";


interface Props {
    title: string
}

export const Label: React.FC<Props> = ({ title }) =>
    <Text
        as="span"
        paddingX="0.6em"
        marginLeft="1.7em"
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        color="black"
        backgroundColor="white"
        borderRadius={ui.radius}
    >
        {title}
    </Text>;