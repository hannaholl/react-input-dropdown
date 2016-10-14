import React from 'react';

class SelectableListItem extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onClick() {
    if (this.props.onItemClick) {
      this.props.onItemClick(this.props.id);
    }
  }

  onMouseEnter() {
    if (this.props.onItemMouseEnter) {
      this.props.onItemMouseEnter(this.props.id);
    }
  }

  render() {
    const className = `input-dropdown__item ${this.props.isActive ? 'input-dropdown__item--active' : ''}`;
    return (
      <li onClick={this.onClick} className={className} onMouseDown={this.props.onItemMouseDown} onMouseEnter={this.onMouseEnter}>{this.props.label}</li>
    );
  }
}

SelectableListItem.propTypes = {
  label: React.PropTypes.string.isRequired,
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  isActive: React.PropTypes.bool,
  onItemClick: React.PropTypes.func,
  onItemMouseDown: React.PropTypes.func,
  onItemMouseEnter: React.PropTypes.func,
};

export default SelectableListItem;
