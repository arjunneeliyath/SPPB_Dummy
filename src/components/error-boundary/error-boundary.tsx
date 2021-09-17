import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { routePath } from '../../constants/routes';

interface Props {
    children: ReactNode;
}

interface State {
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    redirectToError = (): JSX.Element => {
        return (
            <Redirect
                to={{
                    pathname: routePath.error.index,
                    state: { error: this.state.error, errorInfo: this.state.errorInfo },
                }}
            />
        );
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ error, errorInfo });
    }

    render(): ReactNode {
        return this.state.error ? this.redirectToError() : this.props.children;
    }
}

export default ErrorBoundary;
