import React from 'react';
import SelectableListItem from './SelectableListItem';

const SelectableList = (props) => {
  const listStyle = {
    display: props.visible ? 'block' : 'none',
  };

  const listItems = props.items.map(
    (item, index) => <SelectableListItem
      key={item.id}
      id={item.id}
      label={item.label}
      isActive={index === props.activeIndex}
      onItemClick={props.onItemClick}
      onItemMouseDown={props.onItemMouseDown}
      onItemMouseEnter={props.onItemMouseEnter}
    />
  );

  return (
    <ul className="input-dropdown__list" style={listStyle}>
      {listItems}
    </ul>
  );
};

SelectableList.propTypes = {
  activeIndex: React.PropTypes.number,
  items: React.PropTypes.array,
  visible: React.PropTypes.bool,
  onItemClick: React.PropTypes.func,
  onItemMouseDown: React.PropTypes.func,
  onItemMouseEnter: React.PropTypes.func,
};

export default SelectableList;
