import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { attributeMaintenance } from '../../../constants/admin/attribute-maintenance/attribute-maintenance';
import Cards from '../../../components/cards/cards';

export default function AttributeMaintenanceCards() {
    const container = (items: any) => {
        return (
            <Grid container spacing={4}>
                {items.map((item: any, index: number) => (
                    <Grid item key={index} xs={6} sm={4} md={4} lg={3}>
                        <Link underline="none" component={RouterLink} to={item.url}>
                            <Cards key={index} imageurl={item.imageurl} name={item.name} url={item.url} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    };
    return <>{container(attributeMaintenance)}</>;
}
