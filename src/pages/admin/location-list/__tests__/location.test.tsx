import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AddLocation from '../add-location';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('initial form', async () => {
    render(<AddLocation />);
});

test('testing form', async () => {
    render(<AddLocation />);
    const location = screen.getByLabelText(/Location/i);
    expect(location).toBeVisible();
    const description = screen.getByLabelText(/Description/i);
    expect(description).toBeVisible();
    expect(screen.getByRole('submit-btn')).not.toBeEnabled();
    expect(screen.getByRole('cancel-role')).toBeEnabled();
});

test('testing form value change', async () => {
    render(<AddLocation />);
    const location = screen.getByLabelText(/Location/i);
    expect(location).toHaveValue('');
    fireEvent.change(location, { target: { value: 'location' } });
    expect(location).toHaveValue('location');
    const description = screen.getByLabelText(/Description/i);
    expect(description).toHaveValue('');
    fireEvent.change(description, { target: { value: 'description' } });
    expect(description).toHaveValue('description');
    expect(screen.getByRole('submit-btn')).toBeEnabled();
});

test('clicking cancel button', async () => {
    const setModalStatus = jest.fn();
    render(<AddLocation setModalStatus={setModalStatus} />);
    userEvent.click(screen.getByRole('cancel-role'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('submit-btn'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
});
