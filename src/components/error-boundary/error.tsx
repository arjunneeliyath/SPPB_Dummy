import React, { ReactElement } from 'react';
import { routePath } from '../../constants/routes';
import { Redirect } from 'react-router-dom';
import './styles.css';

interface IErrorProps {
    location: History;
}

const Error = (props: IErrorProps): ReactElement => {
    const errorDetails = props.location?.state;
    return (
        <div>
            <div className="error-container">
                {errorDetails ? <>{errorDetails?.error?.message}</> : <Redirect to={routePath.demo.index} />}
            </div>
        </div>
    );
};

export default Error;
