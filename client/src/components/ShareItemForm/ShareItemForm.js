import React, { Component } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Input from "@material-ui/core/Input";
import { ItemPreviewContext } from "../../context/ItemPreviewProvider";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";
import { Mutation } from "react-apollo";
import { ADD_ITEM_MUTATION } from "../../apollo/queries";
import PropTypes from "prop-types";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveItem = async (addItem, allTags, values) => {
    try {
      const newItem = {
        ...values,
        tags: this.applyTags(values.tags, allTags)
      };
      await addItem({ variables: { input: newItem } });
    } catch (e) {
      throw e;
    }
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

  dispatchUpdate = (values, allTags, updatePreview, resetPreview) => {
    updatePreview({
      ...values,
      tags: this.applyTags(values.tags || [], allTags)
    });
  };

  render() {
    const { tags, classes } = this.props;

    return (
      <ItemPreviewContext.Consumer>
        {({ updatePreview, resetPreview }) => {
          return (
            <div>
              <div className={classes.sharePageTitle}>
                <h1>SHARE. BORROW. PROSPER.</h1>
              </div>

              <Mutation mutation={ADD_ITEM_MUTATION}>
                {(addItem, { loading, error, data }) => {
                  return (
                    <Form
                      onSubmit={values => {
                        this.saveItem(addItem, tags, values);
                      }}
                      validate={this.validate}
                      render={({ handleSubmit, form }) => (
                        <form
                          onSubmit={event => {
                            handleSubmit(event);
                            form.reset();
                            resetPreview();
                          }}
                        >
                          <FormSpy
                            subscription={{ values: true }}
                            onChange={({ values }) => {
                              if (values) {
                                this.dispatchUpdate(
                                  values,
                                  tags,
                                  updatePreview
                                );
                              }
                            }}
                          />

                          <Field
                            name="imageurl"
                            render={({ input, meta }) => (
                              <Input
                                {...input}
                                value={input.value}
                                placeholder="Image URL"
                                fullWidth
                                inputProps={{
                                  "aria-label": "image"
                                }}
                              />
                            )}
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
                          <div className={classes.tagsOptions}>
                            {tags.map(tag => {
                              return (
                                <label key={tag.id}>
                                  <Field
                                    name="tags"
                                    component="input"
                                    type="checkbox"
                                    value={tag.title}
                                  />
                                  {tag.title}
                                </label>
                              );
                            })}
                          </div>

                          <Button
                            className={classes.shareButton}
                            type="submit"
                            variant="outlined"
                          >
                            Share
                          </Button>
                          {data && <div>Complete</div>}
                        </form>
                      )}
                    />
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareForm);

ShareForm.propTypes = {
  tags: PropTypes.array.isRequired
};
