import React from "react";
import { Button, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/core";

import { ValidationRule, ValidationRuleDefinition } from "Model";

import { ui } from "../common";


interface Props {
    availableRules: ValidationRuleDefinition[];
    onRuleSelected: (rule: ValidationRule) => void;
}

export const ValidationRuleAdder: React.FC<Props> = ({ availableRules, onRuleSelected }) => {
    return (
        <Menu>
            {/* due to a bug in Chakra (missing TS definition?)
                I can't use:   rightIcon="chevron-down"
                and I use:   {...{rightIcon: "chevron-down"}}
            */}
            <MenuButton
                as={Button}
                size={ui.size}
                borderRadius={ui.radius}
                {...{rightIcon: "chevron-down"}}
            >
                Add validation rule
            </MenuButton>
            <MenuList>
                {(availableRules.length === 0) &&
                    <MenuItem as="div" width="auto" color="black" fontSize="0.8em" isDisabled>
                        {"<none available>"}
                    </MenuItem>
                }
                {availableRules.map(creator =>
                    <MenuItem
                        key={creator.ruleName}
                        as="div"
                        width="auto"
                        color="black"
                        onClick={() => onRuleSelected(creator.createRule())}
                    >
                        <Text as="div">
                            {creator.ruleTitle}
                        </Text>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};
