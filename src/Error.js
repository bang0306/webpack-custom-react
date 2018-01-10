import React, { Component } from 'react';
import './Error.less';

class Error extends Component {
    render() {
        return (
            <div className="page-error">
                <div className="error-container">
                    <div className="error-icon"></div>
                    <span className="tips">抱歉，当前商家服务异常</span>
                </div>
            </div>
        )
    }
}

export default Error;
