import React, { Component } from "react";
import cityData from "./searchcitys.json";
import "./city-picker.less";

const cityList = Symbol('cityList'),
  letterList = Symbol('letterList'),
  onSearch = Symbol('onSearch'),
  datas = JSON.parse(JSON.stringify(cityData.data));

/**
 * 通讯录城市列表组件
 * @class CityPicker
 */

class CityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: datas
    }
  }

  //  渲染城市列表
  [cityList] = () => {
    const {onSelect} = this.props;
    let { cityData } = this.state;
    return <ul className="city-scope-list">
      {
        cityData.map((list, i) => {
          return <li key={i} className="city-scope-item">
            <div className="title">{list.sectionTitle}</div>
            <ul className="city-list">
              {
                list.citys.map((item, j) => {
                  return <li key={j} className="city-item" onClick={() => { typeof onSelect === 'function' &&  onSelect(item.name) }}>
                    <p className="text">{item.name}</p>
                  </li>
                })
              }
            </ul>
          </li>
        })
      }
    </ul>
  }

  //  渲染右侧字母列表
  [letterList] = () => {
    let { cityData } = this.state;
    return <ul className="letter-scope-list">
      {
        cityData.map((item, index) => {
          return <li key={index} className="letter-scope-item" onClick={(e) => { this.onClickLetter(e, index) }}>{item.sectionTitle}</li>
        })
      }
    </ul>
  }

  [onSearch] = (e) => {
    let val = e.target.value.toUpperCase(),
      reg = /\w+/,
      len = cityData.data.length,
      newData = [];
    if (val) {
      for (let i = 0; i < len; i++) {
        let list = cityData.data[i],
          citysLen = list.citys.length;
        //  处理输入的是首字母做过滤
        if (val === list.sectionTitle) {
          newData.push(list);
          break;
        }
        //  输入包含英文数字跳过过滤
        if (!reg.test(val)) {
          for (let j = 0; j < citysLen; j++) {
            let item = list.citys[j];
            //  处理输入的是城市名称做过滤
            if (item.name.includes(val)) {
              //  如果是同一个组里面的城市则放入同组，否则加入新组
              if (newData.length && newData[newData.length - 1].sectionTitle === list.sectionTitle) {
                newData[newData.length - 1].citys.push(item);
              } else {
                let cityList = {
                  citys: [],
                  sectionTitle: list.sectionTitle
                }
                cityList.citys.push(item);
                newData.push(cityList);
              }
            }
          }
        }
      }
    } else {
      newData = datas;
    }

    this.setState({
      cityData: newData
    })
  }

  //  选择右侧字母
  onClickLetter = (e, index) => {
    let scrollEle = document.getElementById('left-city-wrapper'),
      //  当前选中的字母下所有城市对象
      cityEle = document.getElementsByClassName('city-scope-item')[index],
      top = cityEle.offsetTop;
    scrollEle.scrollTop = top - 46;
  }

  render() {
    const { placeholder = '请输入搜索内容', isShowSearch = true } = this.props;
    return (
      <div className="city-picker-container">
        {
          isShowSearch &&
          <div className="header">
            <input type="text" className="search" placeholder={placeholder} onChange={this[onSearch]} />
          </div>
        }
        <div className="city">
          <div id="left-city-wrapper" className="left-city-wrapper">
            {this[cityList]()}
          </div>
          <div className="right-letter">
            {this[letterList]()}
          </div>
        </div>
      </div>
    )
  }
}

export default CityPicker;