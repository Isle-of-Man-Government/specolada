import React from "react";
import { Box, Flex, Text, Input, InputGroup, InputLeftAddon } from "@chakra-ui/core";

import { ValidationRule } from "Model";


// TODO: handle change of validation rules


interface Props {
    rule: ValidationRule;
    // onValueChange: (rule: ValidationRule) => void;
}

export const ValidationRuleEditor: React.FC<Props> = ({ rule }) =>
    <Text as="div">
        <Text as="div" fontSize="0.8em">
            {rule.description}
        </Text>
        <Box ml={4}>
            {rule.params.map(param =>
                <Flex key={param.name}>
                    <InputGroup size="sm">
                        <InputLeftAddon children={param.title} backgroundColor="transparent" />
                        <Input
                            variant="outline"
                            roundedLeft={0}
                            placeholder={param.valType}
                            value={param.value ?? ""}
                            onChange={() => console.error(`rule value change not handled yet`)}
                        />
                    </InputGroup>
                </Flex>
            )}
        </Box>
    </Text>;
