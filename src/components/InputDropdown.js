import React from 'react';
import ReactDOM from 'react-dom';
import SelectableList from './SelectableList';

import './inputDropdown.css';

class InputDropdown extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      isActive: false,
      inputValue: '',
      activeIndex: -1,
    };

    this.itemWasPressed = false;

    this.onInputChange = this.onInputChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onItemMouseDown = this.onItemMouseDown.bind(this);
    this.onItemMouseEnter = this.onItemMouseEnter.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onItemClick(itemId) {
    const clickedItem = this.props.items.find(item => item.id === itemId);

    this.selectItem(clickedItem);
  }

  onFocus() {
    this.setState({
      isActive: true,
      activeIndex: -1,
    });
  }

  onBlur() {
    if (this.itemWasPressed) {
      // Blur event is triggered before click event, which means a click on a dropdown item wont be triggered if we hide the dropdown list here.
      this.itemWasPressed = false;

      return;
    }

    this.setState({ isActive: false });
  }

  onKeyDown(event) {
    let nextIndex = this.state.activeIndex;
    switch (event.keyCode) {
      case 13:
        // enter
        this.selectCurrentActive();
        break;
      case 38:
        // up
        nextIndex = Math.max(this.state.activeIndex - 1, 0);
        break;
      case 40:
        // down
        nextIndex = Math.min(this.state.activeIndex + 1, this.props.items.length - 1);
        break;
      default:
        break;
    }

    if (nextIndex !== this.state.activeIndex) {
      this.setState({ activeIndex: nextIndex });
    }
  }

  onInputChange(event) {
    const value = event.currentTarget.value;
    this.setState({ inputValue: value });

    if (this.props.onInputChange) {
      this.props.onInputChange(value);
    }
  }

  onItemMouseDown() {
    this.itemWasPressed = true;
  }

  onItemMouseEnter(id) {
    const index = this.props.items.findIndex(item => item.id === id);
    this.setState({ activeIndex: index });
  }

  selectCurrentActive() {
    if (this.state.activeIndex > -1) {
      this.selectItem(this.props.items[this.state.activeIndex]);
    }
  }

  selectItem(item) {
    this.setState({
      inputValue: item.label,
      isActive: false,
    });

    ReactDOM.findDOMNode(this.refs.inputDropdownInput).blur();

    if (this.props.onItemSelected) {
      this.props.onItemSelected(item);
    }
  }

  render() {
    return (
      <div className="input-dropdown">
        <input
          type="text"
          name={this.props.name}
          value={this.state.inputValue}
          onChange={this.onInputChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          ref="inputDropdownInput"
        />
        <SelectableList
          visible={this.state.isActive}
          items={this.props.items}
          activeIndex={this.state.activeIndex}
          onItemClick={this.onItemClick}
          onItemMouseDown={this.onItemMouseDown}
          onItemMouseEnter={this.onItemMouseEnter}
        />
      </div>
    );
  }
}

InputDropdown.propTypes = {
  name: React.PropTypes.string,
  items: React.PropTypes.array,
  activeIndex: React.PropTypes.number,
  onInputChange: React.PropTypes.func,
  onItemSelected: React.PropTypes.func,
};

export default InputDropdown;
