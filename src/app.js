import React from 'react';
import { render } from 'react-dom';
import BScroll from 'better-scroll'
import './App.less';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            currentSelectedItemIndex: 0
        }
        this.onCancel = this.onCancel.bind(this);
    }
    componentDidMount() {
        let scroll = new BScroll('.picker-scroll', {
            wheel:{
                selectedIndex: 0,
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item'
            },
            probeType: 3
        });
        this.wheel = scroll;
        this.wheel.on('change', () => {
            this.currentSelectedItemIndex = this.wheel.getSelectedIndex();
            console.log(this.currentSelectedItemIndex);
        })
    }

    onCancel() {
        this.setState(() => {
            return {
                show: !this.state.show
            }
        });
    }
    render() {
        return (
            <div className="picker">
                {
                    this.state.show &&
                    <div className="picker-mask">

                        <div className="picker-panel">
                            <div className="picker-bar">
                                <div className="picker-cancel" onClick={this.onCancel}>{ this.props.cancelText || '取消'}</div>
                                <div className="picker-title">{ this.props.title || ''}</div>
                                <div className="picker-confirm">{ this.props.confirmText || '确定'}</div>
                            </div>
                            <div className="picker-scroll">

                                <div className="wheel-scroll">
                                    {
                                        this.props.data.map((item) => {
                                            return (
                                                <div key={item.text} className="wheel-item">{ item.text }</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
const data = [
    {
        text: '哈哈',
        value: 0
    },
    {
        text: '呵呵',
        value: 1
    },
    {
        text: '呼呼',
        value: 2
    },
]
render(<App data={data}/>, document.getElementById('root'));
