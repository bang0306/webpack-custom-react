import React, { Component, PureComponent } from 'react';
import { render } from 'react-dom';
import Error from './Error';
// import logo from './logo.svg';
import './App.less';

class QueueInfo extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loaded: false,
            errMsg: '',
        }
    }

    static run() {
        render(<QueueInfo />, document.getElementById('queue-info'));
    }

    componentDidMount() {
        const self = this;
        let pvType;
        Ajax.get({
            url: Ajax.apiConfig.QUEUE_INFO,
            data: {
                shopId
            },
            success(res) {
                if (res.get('code') == 200) {
                    const result = res.get('data').toJS();
                    pvType = result.type + 1;
                    self.setState({
                        ...result,
                        error: false,
                        loaded: true,
                    });
                    document.title = result.shopName || '排队';
                } else {
                    pvType = 3;
                    self.setState({
                        error: true,
                        errMsg: res.get('errMsg')
                    })
                }
                sendPV({
                    shopId,
                    type: pvType
                });
            },
            error(e) {
                sendPV({
                    shopId,
                    type: 3
                 });
                self.setState({
                    error: true
                });
                console.log(e);
            }
        });
    }

    getStatusText(statusCode) {
        switch (statusCode) {
            case 1:
                return '充裕';
            case 2:
                return '紧张';
            case 3:
                return '已满';
            default:
                return '';
        }
    }

    getStatusStyle(statusCode) {
        if (this.state.type === 1) {
            return 'item-full'
        }
        switch (statusCode) {
            case 1:
                return 'item-ample';
            case 2:
                return 'item-tension';
            case 3:
                return 'item-full';
            default:
                return ''

        }
    }

    renderTitle() {
        return (
            <div className="queue-section">
                <div className="title">
                    <div className={"main-title"}>
                        { this.state.mainTitle }
                    </div>
                    {
                        this.state.type === 0 ? (
                            <div className="sub-title">
                                { this.state.subTitle }
                            </div>
                        ) : null
                    }
                </div>
            </div>
        )
    }

    renderTableStatus(list) {
        const tableStatusCaption = this.state.type === 0 ? '实时桌位信息:' : '餐厅桌位信息:';

        let tableStausList = [];
        if (list && list.length) {
            for (var i = 0; i < list.length; i++) {
                let arr = [];
                arr.push(list[i]);
                if (list[i+1]) {
                    arr.push(list[++i])
                }
                tableStausList.push(arr);
            }
        }
        return (
            <div className="queue-section">
                <div className="status-header">
                    <span className="status-header-caption">{tableStatusCaption}</span>
                </div>
                <div className="table-status-wrapper">
                    {
                        tableStausList.map((pair, idx) => {
                            return (
                                <div className="table-status-row" key={idx}>
                                    {
                                        pair.map((item, idx) => {

                                            const tableStatusStyle = this.getStatusTextStyle(item.availability);
                                            return (
                                                <div className={`table-status-item ${getStatusStyle(item.availability)}`} key={idx}>
                                                    <div className="table-status-item-icon"></div>
                                                    <div className="table-status-item-info">
                                                        <div>
                                                            <span className="item-info-title">{item.tableTitle}</span>
                                                            <span className="item-info-capacity">({item.tableDesc})</span>
                                                        </div>
                                                        <div className={`item-info-row2`}>
                                                            {this.state.type === 0 ? this.getStatusText(item.availability) : `共${item.tableCapacity}桌`}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className="status-footer">
                    {this.state.hint}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <Error text={this.state.errMsg} />
                </div>
            );
        } else {
            return this.state.loaded ? (
                <div>
                    { this.renderTitle() }
                    { this.renderTableStatus(this.state.tableStatusList) }
                    <div className="tips-bottom">由美团排队提供服务</div>
                </div>
            ) : null;
        }
    }
}

render(<QueueInfo />, document.getElementById('root'));
