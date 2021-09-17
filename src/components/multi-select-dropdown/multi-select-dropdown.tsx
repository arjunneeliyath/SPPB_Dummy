import React from 'react';
import { FormControl, Input, MenuItem, Select, Theme, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './styles';

interface IMultiDropdownProps {
    data: any[];
    placeholder: string;
    displyValue: string;
    handleChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
    selectedName?: string[];
}

const getStyles = (name: string, theme: Theme, displayValues?: string[]) => {
    return {
        fontWeight:
            displayValues?.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

const MultiSelectDropdown = (props: IMultiDropdownProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const { data, placeholder, displyValue, handleChange, selectedName } = props;

    return (
        <FormControl className={clsx(classes.formControl, classes.noLabel)}>
            <Select
                multiple
                displayEmpty
                value={selectedName}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => {
                    if ((selected as string[])?.length === 0) {
                        return <em>{placeholder}</em>;
                    }

                    return (selected as string[])?.join(', ');
                }}
                MenuProps={{ classes: { paper: classes.selected }, getContentAnchorEl: null }}
                title={selectedName?.join(', ')}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="" className={classes.selectDisabled}>
                    <em>{placeholder}</em>
                </MenuItem>
                {data?.map((item) => (
                    <MenuItem
                        key={item.id}
                        value={item[displyValue]}
                        id={item.id}
                        style={getStyles(item[displyValue], theme, selectedName)}
                        className={classes.selected}
                    >
                        {item[displyValue]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
export default MultiSelectDropdown;
