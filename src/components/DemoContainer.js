import React from 'react';
import InputDropdown from './InputDropdown';

class DemoContainer extends React.Component {
  constructor() {
    super();

    this.originalList = [
      { label: 'China', id: 1 },
      { label: 'Sweden', id: 2 },
      { label: 'United Kingdom', id: 3 },
      { label: 'United States', id: 4 },
    ];

    this.state = {
      items: this.originalList,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * onInputChange gets called as the user types into the input field (because we pass this function in the onInputChange props)
   * @param userInput {String} - The user entered input value
   */
  onInputChange(userInput) {
    const normalisedInput = userInput.toLowerCase();

    /**
     * Filter the original list based on user input.
     * Instead of having a static list you could, for example, make a call to your server to search based on the user input
     * and then update the this.state.items array with the results.
     */
    const filteredArray = this.originalList.filter(item => {
      return item.label.toLowerCase().indexOf(normalisedInput) === 0;
    });

    this.setState({ items: filteredArray });
  }

  render() {
    return (
      <div style={DemoContainer.style}>
        <InputDropdown name="demo" onInputChange={this.onInputChange} items={this.state.items} />
      </div>
    );
  }
}

DemoContainer.style = {
  margin: '30px auto 0 auto',
  width: 300,
};

export default DemoContainer;
