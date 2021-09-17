import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles } from './styles';
import clsx from 'clsx';

interface IMultiDropdownProps {
    data: any[];
    handleChange: (event: React.ChangeEvent<any>) => void;
    isAllSelected: boolean;
    selected: any[];
    displayValue: string;
    concatDisplay: boolean;
    placeholder: string;
    concatDisplayName1?: string;
    concatDisplayName2?: string;
    seperator?: string;
}

const MenuProps = {
    getContentAnchorEl: null,
};

const MultiSelectCheckboxDropdown = (props: IMultiDropdownProps) => {
    const classes = useStyles();
    const {
        data,
        handleChange,
        isAllSelected,
        selected,
        displayValue,
        concatDisplay,
        placeholder,
        concatDisplayName1,
        concatDisplayName2,
        seperator,
    } = props;

    return (
        <FormControl className={clsx(classes.formControl, classes.noLabel)}>
            <Select
                multiple
                displayEmpty
                value={selected}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected: any) => {
                    if ((selected as string[])?.length === 0) {
                        return <em>{placeholder}</em>;
                    }
                    return concatDisplay
                        ? concatDisplayName1 && concatDisplayName2
                            ? selected
                                  .map((e: any) => {
                                      const option = data.find((element: any) => element[displayValue] === e);
                                      if (option) {
                                          e =
                                              option[displayValue] +
                                              seperator +
                                              option[concatDisplayName1] +
                                              seperator +
                                              option[concatDisplayName2];
                                      }
                                      return e;
                                  })
                                  .join(', ')
                            : null
                        : selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem
                    value="all"
                    classes={{
                        root: isAllSelected ? classes.selectedAll : '',
                    }}
                >
                    <ListItemIcon>
                        <Checkbox
                            color="primary"
                            checked={isAllSelected}
                            indeterminate={
                                selected.length > 0 &&
                                selected.length < [...new Set(data.map((option: any) => option[displayValue]))].length
                            }
                        />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.selectAllText }} primary={placeholder} />
                </MenuItem>
                {data.map((option: any, index: number) => (
                    <MenuItem key={index} value={option[displayValue]}>
                        <ListItemIcon>
                            <Checkbox checked={selected.indexOf(option[displayValue]) > -1} color="primary" />
                        </ListItemIcon>
                        {concatDisplay ? (
                            concatDisplayName1 && concatDisplayName2 ? (
                                <ListItemText
                                    primary={
                                        option[displayValue] +
                                        seperator +
                                        option[concatDisplayName1] +
                                        seperator +
                                        option[concatDisplayName2]
                                    }
                                />
                            ) : null
                        ) : (
                            <ListItemText primary={option[displayValue]} />
                        )}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
export default MultiSelectCheckboxDropdown;
