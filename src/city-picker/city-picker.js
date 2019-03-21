import React, { Component } from "react";
import cityData from "./searchcitys.json";
import "./city-picker.less";

const cityList = Symbol('cityList'),
  letterList = Symbol('letterList');

/**
 * 通讯录城市列表组件
 * @class CityPicker
 */

class CityPicker extends Component {
  constructor(props) {
    super(props);
  }

  //  渲染城市列表
  [cityList] = () => {
    return <ul className="city-scope-list">
      {
        cityData.data.map((list, i) => {
          return <li key={i} className="city-scope-item">
            <div className="title">{list.sectionTitle}</div>
            <ul className="city-list">
              {
                list.citys.map((item, j) => {
                  return <li key={j} className="city-item" onClick={() => { this.props.onSelect(item.name) }}>
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
    return <ul className="letter-scope-list">
      {
        cityData.data.map((item, index) => {
          return <li key={index} className="letter-scope-item" onClick={(e) => { this.onClickLetter(e, index) }}>{item.sectionTitle}</li>
        })
      }
    </ul>
  }

  //  选择右侧字母
  onClickLetter = (e, index) => {
    let scrollEle = document.getElementById('left-city-wrapper'),
      //  当前选中的字母下所有城市对象
      cityEle = document.getElementsByClassName('city-scope-item')[index],
      top = cityEle.offsetTop
    scrollEle.scrollTop = top;
  }

  render() {
    return (
      <div className="city-picker-container">
        <div className="city">
          <div id="left-city-wrapper" className="left-city-wrapper">
            {this[cityList]()}
          </div>
          <div className="right-letter">
            {this[letterList]()}
          </div>
        </div>
      </div >
    )
  }
}

export default CityPicker;