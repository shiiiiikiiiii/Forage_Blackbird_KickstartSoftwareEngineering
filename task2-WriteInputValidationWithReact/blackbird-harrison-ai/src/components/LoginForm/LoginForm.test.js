import { render, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('renders login form with email and password fields', () => {
    const { getByLabelText, getByText } = render(<LoginForm />);

    const emailInput = getByLabelText('Email Address');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();

    const loginButton = getByText('Sign In');
    expect(loginButton).toBeInTheDocument();
  });

  test('validates email and password fields on form submission', () => {
    const { getByLabelText, getByText, getByRole, queryByText } = render(<LoginForm />);
    const emailInput = getByLabelText('Email Address');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Sign In');

    // Submit the form without entering any values
    fireEvent.click(loginButton);
    expect(queryByText('Email is required')).toBeInTheDocument();
    expect(queryByText('Password is required')).toBeInTheDocument();

    // Submit the form with invalid email and password
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'invalid-password' } });
    fireEvent.click(loginButton);
    expect(queryByText('Invalid email address')).toBeInTheDocument();
    expect(queryByText('Password must contain at least 8 characters, including uppercase and lowercase letters, one numerical digit, and one special character')).toBeInTheDocument();

    // Submit the form with valid email and password
    fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Validpassword1!' } });
    fireEvent.click(loginButton);
    expect(getByRole('alert')).toHaveTextContent('Login Successful');
  });
});