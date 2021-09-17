import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AddDataType from '../add-data-type';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const setModalStatus = jest.fn();
const onSaveClick = jest.fn();

test('initial form', async () => {
    render(<AddDataType setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
});

test('testing form', async () => {
    render(<AddDataType setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
    const dataTypeName = screen.getByLabelText(/Data Type Name/i);
    expect(dataTypeName).toBeVisible();
    const description = screen.getByLabelText(/Type Description/i);
    expect(description).toBeVisible();
    expect(screen.getByRole('add-btn')).toBeEnabled();
    expect(screen.getByRole('submit-btn')).not.toBeEnabled();
    expect(screen.getByRole('cancel-role')).toBeEnabled();
    expect(screen.getByRole('reset-role')).toBeEnabled();
});

test('testing form value change', async () => {
    render(<AddDataType setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
    const dataTypeName = screen.getByLabelText(/Data Type Name/i);
    expect(dataTypeName).toHaveValue('');
    fireEvent.change(dataTypeName, { target: { value: 'dataTypeName' } });
    expect(dataTypeName).toHaveValue('dataTypeName');
    const typeDescription = screen.getByLabelText(/Type Description/i);
    expect(typeDescription).toHaveValue('');
    fireEvent.change(typeDescription, { target: { value: 'typeDescription' } });
    expect(typeDescription).toHaveValue('typeDescription');
    expect(screen.getByRole('submit-btn')).toBeEnabled();
});

test('clicking cancel button', async () => {
    render(<AddDataType setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
    userEvent.click(screen.getByRole('cancel-role'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('submit-btn'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('reset-role'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('add-btn'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
});
