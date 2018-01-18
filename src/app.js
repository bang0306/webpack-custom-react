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
        this.createWheel();
    }

    createWheel() {
      this.wheel = new BScroll(this.wheelEl, {
          preventDefault: false,
          // preventDefaultException: [],
          wheel:{
              selectedIndex: 0,
              rotate: 5,
              adjustTime: 100,
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item'
          }
      });
      this.wheel.on('scrollEnd', () => {
          let currentSelectedItemIndex = this.wheel.getSelectedIndex();
          if (this.state.currentSelectedItemIndex != currentSelectedItemIndex) {
              this.setState({
                  currentSelectedItemIndex
              })
          }
          console.log('scrollEnd detected, currentIndex is: '+currentSelectedItemIndex);
      });
      this.wheel.enable();
    }

    onCancel() {
        this.setState(() => {
            return {
                show: !this.state.show
            }
        });
    }

    onClickItem(index) {
        console.log('clicked');
        this.setState({
            currentSelectedItemIndex: index
        });
        this.wheel.wheelTo(index);
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
                            <div className="wheel-wrapper">
                              <div className="wheel" ref={(wheelEl) => this.wheelEl = wheelEl}>

                                  <div className="wheel-scroll">
                                  {
                                    this.props.data.map((item, index) => {
                                      return (
                                        <div
                                            key={item.text}

                                            className={`wheel-item ${index === this.state.currentSelectedItemIndex ? 'wheel-item-selected': ''}`}>
                                            <div onClick={(e) => {for (let i in e.target) { console.log(i) } this.onClickItem(index)}}>{ item.text }</div>
                                          </div>
                                      )
                                    })
                                  }
                                  </div>
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
render(<App data={data} title="哇哈哈哈"/>, document.getElementById('root'));
