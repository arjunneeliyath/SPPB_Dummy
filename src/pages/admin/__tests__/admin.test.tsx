import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import AdminCards from '../admin';

//Non Rejectable Reason
test('Non Rejectable Reason List should be exist', async () => {
    render(
        <Router>
            <AdminCards />
        </Router>
    );
    expect(screen.getByText('Non Rejectable Reason List')).toBeTruthy();
});

test('Click on Non Rejectable Reason List', async () => {
    render(
        <Router>
            <AdminCards />
        </Router>
    );

    const button = screen.getByText(/Non Rejectable Reason List/i);
    fireEvent.click(button);

    await expect(screen.findByText('Add A Non Rejectable Reason')).toBeTruthy();
});

test('Click on Add a Non Rejectable Reason find table header', async () => {
    render(
        <Router>
            <AdminCards />
        </Router>
    );

    const button = await screen.getByText(/Non Rejectable Reason List/i);
    await fireEvent.click(button);

    await expect(screen.findByText('Non Rejectable Reason')).toBeTruthy();
});

test('Click on Add a Non Rejectable Reason', async () => {
    render(
        <Router>
            <AdminCards />
        </Router>
    );

    const button = await screen.getByText(/Non Rejectable Reason List/i);
    await fireEvent.click(button);
    setTimeout(async () => {
        const button1 = screen.getByText('Add A Non Rejectable Reason');
        await fireEvent.click(button1);

        await expect(screen.findByText('Inspection Type')).toBeTruthy();
    }, 1000);
});
