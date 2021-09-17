import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../../utils/test-utils';
import LocationList from '../location-list';
import { locationResponse } from '../../../../mocks/admin/location-mock';
import { locationReducerInit } from '../../../../modules/admin/location';

const initialState = {
    admin: {
        ...locationReducerInit,
        locationResponse: locationResponse,
    },
};
const titles = [
    { value: 'locationName', label: 'Location', sortValue: 'rr' },
    { value: 'locationDesc', label: 'Description', sortValue: 'des' },
    { value: 'edit', label: '', sortValue: 'edit', width: '10%' },
    { value: 'delete', label: '', sortValue: 'delete', minWidth: 50 },
];

test('Location List check add button', async () => {
    render(<LocationList />);
    expect(screen.getByRole('add-btn')).toBeEnabled();
    fireEvent.click(screen.getByRole('add-btn'));
});
test('Location List check back button', async () => {
    render(<LocationList />);
    expect(screen.getByRole('back-btn')).toBeEnabled();
    fireEvent.click(screen.getByRole('back-btn'));
});

test('clicking update and delete button', async () => {
    render(<LocationList />, { initialState });
    expect(screen.getByRole(titles[0].label));
});
