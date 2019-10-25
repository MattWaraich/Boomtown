import React, { Component } from "react";
import { Field, Form } from "react-final-form";
import Input from "@material-ui/core/Input";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { FormSpy } from "react-final-form";
import { Checkbox } from "@material-ui/core";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = () => {
    console.log(1);
  };
  validate = () => {
    console.log(2);
  };

  applyTags = (tags, allTags) => {
    return tags.map(tag => {
      const updatedTag = { title: tag };
      allTags.filter(t => {
        if (t.title === tag) {
          updatedTag.id = t.id;
        }
      });
      return updatedTag;
    });
  };

  dispatchUpdate = (values, allTags, updatePreview) => {
    updatePreview({
      ...values,
      tags: this.applyTags(values.tags || [], allTags)
    });
  };

  render() {
    const { tags } = this.props;
    console.log(tags);
    return (
      <ItemPreviewContext.Consumer>
        {/* REST PREVIEW HERE */}
        {({ updatePreview, resetPreview }) => {
          return (
            <div className="sharePageInputFields">
              <h1>
                <strong>SHARE. BORROW. PROSPER.</strong>
              </h1>

              {/* SELECT AN IMAGE BUTTON  */}

              <Form
                onSubmit={this.onSubmit}
                validate={this.validate}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <FormSpy
                      subscription={{ values: true }}
                      onChange={({ values }) => {
                        if (values) {
                          this.dispatchUpdate(values, tags, updatePreview);
                        }
                      }}
                    />
                    <Field
                      name="title"
                      render={({ input, meta }) => (
                        <Input
                          {...input}
                          value={input.value}
                          placeholder="Name your item"
                          fullWidth
                          inputProps={{
                            "aria-label": "description"
                          }}
                        />
                      )}
                    />
                    <Field
                      name="description"
                      render={({ input, meta }) => (
                        <Input
                          {...input}
                          value={input.value}
                          placeholder="Describe your item"
                          fullWidth
                          inputProps={{
                            "aria-label": "description"
                          }}
                        />
                      )}
                    />

                    {/* <Field /> */}

                    <button type="submit">Share</button>
                  </form>
                )}
              />
            </div>
          );
        }}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default ShareForm;
