import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import DispositionList from '../add-disposition';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('initial form', async () => {
    render(<DispositionList />);
});

test('testing form', async () => {
    render(<DispositionList />);
    const disposition = screen.getByLabelText(/Disposition/i);
    expect(disposition).toBeVisible();
    const description = screen.getByLabelText(/Description/i);
    expect(description).toBeVisible();
    expect(screen.getByRole('submit-btn')).not.toBeEnabled();
    expect(screen.getByRole('cancel-role')).toBeEnabled();
});

test('testing form value change', async () => {
    render(<DispositionList />);
    const disposition = screen.getByLabelText(/Disposition/i);
    expect(disposition).toHaveValue('');
    fireEvent.change(disposition, { target: { value: 'disposition' } });
    expect(disposition).toHaveValue('disposition');
    const description = screen.getByLabelText(/Description/i);
    expect(description).toHaveValue('');
    fireEvent.change(description, { target: { value: 'description' } });
    expect(description).toHaveValue('description');
    expect(screen.getByRole('submit-btn')).toBeEnabled();
});

test('clicking cancel button', async () => {
    const setModalStatus = jest.fn();
    render(<DispositionList setModalStatus={setModalStatus} />);
    userEvent.click(screen.getByRole('cancel-role'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('submit-btn'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
});
