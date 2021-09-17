import React, { LazyExoticComponent, useState, useEffect } from 'react';
import { Tabs, Tab, Grid } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { styles } from './style';

interface IQCRList {
    id?: number;
    label: string;
    component?: JSX.Element | LazyExoticComponent<any>;
    path?: string;
    exact?: boolean;
    isSubRoute?: boolean;
}

interface ITabProps {
    list: Array<IQCRList>;
    tabClassName?: string;
    gridClassName?: string;
    indicatorColor?: 'secondary' | 'primary';
    variant?: 'scrollable' | 'fullWidth' | 'standard';
}

const CustomTabs = (props: ITabProps) => {
    const { list, tabClassName, gridClassName, variant } = props;
    const { pathname } = useLocation();
    const classes = styles();
    const initialValue = list.find((item) => item.path === pathname)?.id || 0;
    const [value, setValue] = React.useState<number | undefined>(initialValue);
    const [selectedValue, setSelectedValue] = useState<IQCRList | undefined>(list.find((item) => item.id === value));
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    const handleChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
        setValue(newValue);
        const selected = list.find((item) => item.id === newValue);
        setSelectedValue(selected);
    };
    return (
        <>
            <Grid container>
                <Grid item xs={12} className={gridClassName}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{ style: { display: 'none' } }}
                        textColor="primary"
                        aria-label="QCR-Tabs"
                        variant={variant}
                        scrollButtons="auto"
                        className={tabClassName}
                    >
                        {list.map((item) => {
                            if (!item.isSubRoute) {
                                return item.path && item.id ? (
                                    <Link
                                        key={item.id}
                                        className={value === item?.id ? classes.linkSelected : classes.link}
                                        to={item.path}
                                        onClick={() => item.id && setValue(item.id)}
                                    >
                                        <Tab
                                            className={value === item?.id ? classes.tabSelected : classes.tab}
                                            label={item.label}
                                        />
                                    </Link>
                                ) : (
                                    item.id !== undefined && (
                                        <Tab label={item.label} key={item.id} id={`qcr-add-tab-${item.id}`} />
                                    )
                                );
                            }
                        })}
                    </Tabs>
                </Grid>
            </Grid>
            {selectedValue && !selectedValue.path && (
                <Grid item xs={12} className={gridClassName}>
                    {selectedValue.component}
                </Grid>
            )}
        </>
    );
};

export default CustomTabs;
