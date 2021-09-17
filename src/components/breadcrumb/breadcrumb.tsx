import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Typography, Link } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useStyles } from './styles';

const Breadcrumbs = (props: RouteComponentProps) => {
    const {
        history,
        location: { pathname },
    } = props;
    const classes = useStyles();
    const pathnames = pathname.split('/').filter((x: string) => x);
    return (
        <MUIBreadcrumbs aria-label="breadcrumb" separator="|">
            {pathnames.map((name: string, index: number) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <Typography className={classes.typography}>{name}</Typography>
                ) : (
                    <Link
                        key={'key-' + index}
                        color="inherit"
                        onClick={() => history.push(routeTo)}
                        className={classes.link}
                    >
                        {name}
                    </Link>
                );
            })}
        </MUIBreadcrumbs>
    );
};
export default withRouter(Breadcrumbs);
