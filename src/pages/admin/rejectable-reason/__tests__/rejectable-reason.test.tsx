import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AddRejectableReason from '../add-rejectable-reason';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('initial form', async () => {
    render(<AddRejectableReason />);
});

test('testing form', async () => {
    render(<AddRejectableReason />);
    const radioValues = screen.getByLabelText(/Inspection Type/i);
    expect(radioValues).toBeChecked();
    const RejectableReason = screen.getByLabelText(/Rejectable Reason/i);
    expect(RejectableReason).toBeVisible();
    const description = screen.getByLabelText(/Description/i);
    expect(description).toBeVisible();
    expect(screen.getByRole('submit-btn')).not.toBeEnabled();
    expect(screen.getByRole('cancel-role')).toBeEnabled();
});

test('testing form value change', async () => {
    render(<AddRejectableReason />);
    const reason = screen.getByLabelText(/Rejectable Reason/i);
    expect(reason).toHaveValue('');
    fireEvent.change(reason, { target: { value: 'reason' } });
    expect(reason).toHaveValue('reason');
    const description = screen.getByLabelText(/Description/i);
    expect(description).toHaveValue('');
    fireEvent.change(description, { target: { value: 'description' } });
    expect(description).toHaveValue('description');
    expect(screen.getByRole('submit-btn')).toBeEnabled();
});

test('clicking cancel button', async () => {
    const setModalStatus = jest.fn();
    render(<AddRejectableReason setModalStatus={setModalStatus} />);
    userEvent.click(screen.getByRole('cancel-role'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('submit-btn'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
});
