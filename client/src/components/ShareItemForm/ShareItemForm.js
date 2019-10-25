import React, { Component } from "react";
import { Field, Form } from "react-final-form";
import Input from "@material-ui/core/Input";
import { FormSpy } from "react-final-form";
import { Checkbox } from "@material-ui/core";

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = value => {};
  validate = value => {};

  render() {
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
                    this.subscription(values);
                  }
                  return "";
                }}
              />

              <Field
                name="title"
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    value={input.value}
                    placeholder="Name your item."
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
                    placeholder="Describe your item."
                    fullWidth
                    inputProps={{
                      "aria-label": "description"
                    }}
                  />
                )}
              />
              <button type="submit">Share</button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default ShareForm;
