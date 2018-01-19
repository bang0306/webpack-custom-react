import React from 'react';
import { render } from 'react-dom';
import BScroll from 'better-scroll'
import './App.less';

/*
 * props: { data: [] require}
 */

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            currentSelectedItemIndex: 0
        }
    }
    componentDidMount() {
        this.createWheel();
    }

    createWheel() {
      this.wheel = new BScroll(this.wheelEl, {
          preventDefault: true,
          preventDefaultException: { className: /wheel-item/},
          wheel:{
              selectedIndex: 0,
              rotate: 15,
              adjustTime: 100,
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item'
          }
      });
      this.wheel.on('scrollEnd', () => {
          let currentSelectedItemIndex = this.wheel.getSelectedIndex();
          if (this.state.currentSelectedItemIndex != currentSelectedItemIndex) {
              this.setState(() => {
                  return {
                      currentSelectedItemIndex
                  }
              })
          }
          console.log('scrollEnd detected, currentIndex is: '+currentSelectedItemIndex);
      });
      this.wheel.enable();
    }

    toggleShow() {
        this.setState(() => {
            return {
                show: !this.state.show
            }
        });
    }

    onCancel() {
        this.toggleShow();
        const cancelCb = this.props.cancelCb || (() => {});
        cancelCb();
    }
    onConfirm() {
        this.toggleShow();
        const confirmCb = this.props.confirmCb || (() => {});
        confirmCb();
    }
    onClickItem(index) {
        this.setState(() => {
            return {
                currentSelectedItemIndex: index
            }
        });
        this.wheel.wheelTo(index);
        console.log('clicked current index is ', this.state.currentSelectedItemIndex);
    }
    render() {
        return (
            <div className="picker">
                <div className="picker-mask"></div>

                <div className="picker-panel">
                    <div className="picker-bar">
                        <div className="picker-cancel" onClick={this.onCancel}>{ this.props.cancelText || '取消'}</div>
                        <div className="picker-title">{ this.props.title || ''}</div>
                        <div className="picker-confirm" onClick={this.onConfirm}>{ this.props.confirmText || '确定'}</div>
                    </div>
                    <div className="wheel-wrapper">
                        <div className="panel-mask panel-mask-top"></div>
                        <div className="wheel" ref={(wheelEl) => { this.wheelEl = wheelEl }}>

                          <div className="wheel-scroll">
                          {
                            this.props.data.map((item, index) => {
                                return (
                                    <div
                                        onClick={(e) => { this.onClickItem(index) }}
                                        key={item.text}
                                        className={`wheel-item ${index === this.state.currentSelectedItemIndex ? 'wheel-item-selected': ''}`}>
                                        { item.text }
                                    </div>
                                )
                            })
                          }
                          </div>
                      </div>
                      <div className="panel-mask panel-mask-bottom"></div>
                    </div>
                </div>

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
    {
        text: '喵喵',
        value: 3
    },
    {
        text: '但是',
        value: 3
    },
    {
        text: '违反',
        value: 2
    },
    {
        text: '手动',
        value: 3
    },
    {
        text: '下次',
        value: 3
    }
]
render(<App data={data} title="哇哈哈哈"/>, document.getElementById('root'));
