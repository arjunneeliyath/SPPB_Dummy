import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import DefectCategory from '../add-new-defect-category';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const setModalStatus = jest.fn();
const onSaveClick = jest.fn();

test('initial form', async () => {
    render(<DefectCategory setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
});

test('testing form', async () => {
    render(<DefectCategory setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
    const location = screen.getByLabelText(/Defect Category Name/i);
    expect(location).toBeVisible();
    const description = screen.getByLabelText(/Defect Category Description/i);
    expect(description).toBeVisible();
    expect(screen.getByRole('add-btn')).toBeEnabled();
    expect(screen.getByRole('submit-btn')).not.toBeEnabled();
    expect(screen.getByRole('cancel-role')).toBeEnabled();
    expect(screen.getByRole('reset-role')).toBeEnabled();
});

test('testing form value change', async () => {
    render(<DefectCategory setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
    const categoryName = screen.getByLabelText(/Defect Category Name/i);
    expect(categoryName).toHaveValue('');
    fireEvent.change(categoryName, { target: { value: 'categoryName' } });
    expect(categoryName).toHaveValue('categoryName');
    const categoryDescription = screen.getByLabelText(/Defect Category Description/i);
    expect(categoryDescription).toHaveValue('');
    fireEvent.change(categoryDescription, { target: { value: 'categoryDescription' } });
    expect(categoryDescription).toHaveValue('categoryDescription');
    expect(screen.getByRole('submit-btn')).toBeEnabled();
});

test('clicking cancel button', async () => {
    render(<DefectCategory setModalStatus={setModalStatus} onSaveClick={onSaveClick} />);
    userEvent.click(screen.getByRole('cancel-role'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('submit-btn'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
    userEvent.click(screen.getByRole('reset-role'));
    expect(setModalStatus).toHaveBeenCalledTimes(1);
});
