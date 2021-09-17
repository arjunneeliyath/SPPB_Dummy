import React from 'react';
import {
    Grid,
    List,
    Card,
    CardHeader,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    Divider,
} from '@material-ui/core';
import useStyles from './styles';

interface IListProps {
    items: any;
    handleToggleAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    disabled?: boolean;
}

const MultiCheckboxList = (props: IListProps) => {
    const { items, handleToggleAll, handleToggle, disabled } = props;
    const classes = useStyles();

    const customList = (title: React.ReactNode, items: any) => {
        const numberOfChecked = items?.filter((y: any) => y.isSelected).length;
        return (
            <Card elevation={0} className={classes.container}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Checkbox
                            onChange={handleToggleAll}
                            checked={numberOfChecked === items.length && items.length !== 0}
                            indeterminate={numberOfChecked !== items.length && numberOfChecked !== 0}
                            color="primary"
                            inputProps={{ 'aria-label': 'Select All' }}
                        />
                    }
                    title={title}
                />
                <Divider />
                <List className={classes.list} dense role="list">
                    {items.map((value: any, i: number) => {
                        const labelId = `transfer-list-all-item-${value}-label`;

                        return (
                            <ListItem key={value.id} role="listitem">
                                <ListItemIcon>
                                    <Checkbox
                                        checked={Boolean(value.isSelected)}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        onChange={(e) => handleToggle(e, i)}
                                        value={value.isSelected}
                                        color="primary"
                                        disabled={disabled}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value.name} />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Card>
        );
    };

    return <Grid>{customList('Select All', items)}</Grid>;
};

export default MultiCheckboxList;
