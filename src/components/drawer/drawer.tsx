import React, { LazyExoticComponent, useState, useEffect } from 'react';
import { Grid, List, ListItem, Typography } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { styles } from './style';

interface IQCRList {
    id?: number;
    label: string;
    component?: JSX.Element | LazyExoticComponent<any>;
    path: string;
    exact?: boolean;
    isSubRoute?: boolean;
}

interface IDrawerProps {
    routes: Array<IQCRList>;
    gridClassName?: string;
}

const CustomDrawer = (props: IDrawerProps) => {
    const { routes, gridClassName } = props;
    const { pathname } = useLocation();
    const classes = styles();
    const initialValue = routes.find((item) => item.path === pathname)?.id || 0;
    const [value, setValue] = React.useState<number | undefined>(initialValue);
    const [selectedValue, setSelectedValue] = useState<IQCRList | undefined>(routes.find((item) => item.id === value));

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleChange = (newValue?: number) => {
        setValue(newValue);
        const selected = routes.find((item) => item.id === newValue);
        setSelectedValue(selected);
    };

    return (
        <>
            <List component="nav" className={classes.liststyle}>
                {routes.map((route, i) => {
                    if (!route.isSubRoute) {
                        return route.path && route.id ? (
                            <ListItem key={`key-${i}`} button className={classes.listitems}>
                                <Link
                                    className={value === route?.id ? classes.linkSelected : classes.link}
                                    to={route.path}
                                    onClick={() => handleChange(route.id)}
                                >
                                    {route.label}
                                </Link>
                            </ListItem>
                        ) : (
                            route.id !== undefined && <Typography variant="subtitle2">{route.label}</Typography>
                        );
                    }
                })}
            </List>
            {selectedValue && !selectedValue.path && (
                <Grid item xs={12} className={gridClassName}>
                    {selectedValue.component}
                </Grid>
            )}
        </>
    );
};

export default CustomDrawer;
