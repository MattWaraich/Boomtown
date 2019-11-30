import React, { createContext, Component } from "react";

export const ItemPreviewContext = createContext();

class ItemPreviewProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        id: "Insert your name.",
        title: "Name your item",
        tag: "Pick your tags.",
        imageurl: "https://via.placeholder.com/350",
        description: "Describe your item",
        itemowner: "Item owner.",
        created: "Created",
        borrower: "Borrower",
        tags: []
      }
    };
  }
  updatePreview = item => {
    this.setState({ item: { ...this.state.item, ...item } });
    console.log("update preview: ", item);
  };

  resetPreview = () => {
    this.setState({
      item: {
        id: "Insert your name.",
        title: "Insert your title.",
        tag: "Pick your tags.",
        imageurl: "https://via.placeholder.com/350",
        description: "Description of item.",
        itemowner: "Item owner.",
        created: "Created",
        borrower: "Borrower",
        tags: []
      }
    });
  };

  render() {
    return (
      <ItemPreviewContext.Provider
        value={{
          state: this.state,
          updatePreview: this.updatePreview,
          resetPreview: this.resetPreview
        }}
      >
        {this.props.children}
      </ItemPreviewContext.Provider>
    );
  }
}

export default ItemPreviewProvider;
