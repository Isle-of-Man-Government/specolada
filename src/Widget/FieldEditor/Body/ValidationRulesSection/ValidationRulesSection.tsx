import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";

import { ValidationRule, ValidationRuleDefinition, Field } from "Model";
import { Id, useSpecoladaStore, TreeNode } from "Store";

import { ui } from "../common";
import { Label } from "../Label";
import { ValidationRuleAdder } from "./ValidationRuleAdder";
import { ValidationRuleEditor } from "./ValidationRuleEditor";


interface ConnectorProps {
    field: Field & TreeNode;
}

export const ValidationRulesConnector: React.FC<ConnectorProps> = ({ field }) => {
    const store = useSpecoladaStore();
    const availableRules = field.type?.allowedRules ?? [];
    const rules: ValidationRule[] = []; //store.getValidationRulesForField(fieldId);
    const selectableRules = availableRules.filter(x => !rules.map(y => y.name).includes(x.ruleName));
    
    return (
        <ValidationRulesList
            selectableRules={selectableRules}
            onRuleAdding={(newRule) => store.addValidationRuleTo(field.id, newRule)}
        >
            {rules.length === 0 &&
                <Text key="<none>" as="div" fontSize="0.8em" color="grey">
                    no rules yet
                </Text>
            }
            {/* {rules.map(x => <ValidationRuleEditor key={x.ruleName} rule={x} />)} */}
        </ValidationRulesList>
    );
};

interface UIProps {
    // rules: ValidationRule[];
    selectableRules: ValidationRuleDefinition[];
    onRuleAdding: (newRule: ValidationRule) => void;
}

export const ValidationRulesList: React.FC<UIProps> = ({ selectableRules, onRuleAdding, children }) => {
    // const rulesForAddMenu = availableRules.filter(x => !rules.map(y => y.name).includes(x.ruleName));
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
                    availableRules={selectableRules}
                    onRuleSelected={newRule => onRuleAdding(newRule)}
                />
                {children}
            </Box>
        </Flex>
    );
};
