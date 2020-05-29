import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";

import { ValidationRule, ValidationRuleDefinition } from "Model";

import { ui } from "./common";
import { Label } from "./Label";
import { ValidationRuleAdder } from "./ValidationRuleAdder";
import { ValidationRuleEditor } from "./ValidationRuleEditor";


interface Props {
    rules: ValidationRule[];
    availableRules: ValidationRuleDefinition[];
    onValueChange: (rule: ValidationRule[]) => void;
}

export const ValidationRulesSection: React.FC<Props> = ({ rules, availableRules, onValueChange }) => {
    const rulesForAddMenu = availableRules.filter(x => !rules.map(y => y.name).includes(x.ruleName));
    return (
        <Flex flexDirection="column" alignItems="flex-start" marginLeft={6}>
            <Label title="validation rules" />
            <Box
                border="white solid 1px"
                borderRadius={ui.radius}
                paddingX={3}
                paddingTop={1}
                paddingBottom={3}
            >
                <ValidationRuleAdder
                    availableRules={rulesForAddMenu}
                    onRuleSelected={newRule => onValueChange([...rules, newRule])}
                />
                {rules.length === 0 &&
                    <Text key="<none>" as="div" fontSize="0.8em" color="grey">
                        no rules yet
                    </Text>
                }
                {rules.map(x => <ValidationRuleEditor key={x.name} rule={x} />)}
            </Box>
        </Flex>
    );
};
