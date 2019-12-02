import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from "../../apollo/queries";
import { graphql, compose } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Typography,
  TextField
} from "@material-ui/core";
import validate from "./helpers/validation";
import styles from "./styles";
import PropTypes from "prop-types";

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formToggle: true,
      error: null
    };
  }

  render() {
    const { classes, LOGIN_MUTATION, SIGNUP_MUTATION } = this.props;

    return (
      <Form
        onSubmit={async values => {
          const patt = /\b[\w-]+@[\w-]+\w{2,4}\b/g;

          if (!patt.test(values.email)) {
            this.setState({ error: { email: "Invalid type of the email" } });
            return;
          }

          if (this.state.error) {
          } else {
            try {
              this.state.formToggle
                ? await LOGIN_MUTATION({ variables: { user: values } })
                : await SIGNUP_MUTATION({ variables: { user: values } });
            } catch (e) {
              this.setState({ error: { database: { ...e } } });
            }
          }
        }}
        validate={values => {
          return validate(values, this.state.formToggle);
        }}
        render={({ handleSubmit, form, valid, submitSucceeded }) => {
          return (
            <form
              onSubmit={e => {
                handleSubmit(e);
              }}
              noValidate
              className={classes.accountForm}
            >
              {!this.state.formToggle && (
                <FormControl fullWidth>
                  <InputLabel htmlFor="fullname">Username</InputLabel>
                  <Field
                    name="fullname"
                    render={({ input, meta }) => (
                      <Input
                        id="fullname"
                        {...input}
                        type="text"
                        value={input.value}
                        className={classes.signInField}
                      />
                    )}
                  />
                </FormControl>
              )}
              <FormControl fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field
                  name="email"
                  render={({ meta, input }) => (
                    <Input
                      id="email"
                      {...input}
                      type="text"
                      value={input.value}
                      className={classes.signInField}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Field
                  name="password"
                  render={({ meta, input }) => (
                    <TextField
                      {...input}
                      id="password"
                      label="Password"
                      type="password"
                      value={input.value}
                      className={classes.signInField}
                    />
                  )}
                />
              </FormControl>
              <FormControl>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justify="space-between"
                  className={classes.enterBtn}
                >
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="secondary"
                    disabled={!valid}
                  >
                    {this.state.formToggle ? "Enter" : "Create Account"}
                  </Button>
                  <Typography className={classes.createAccBtnContainer}>
                    <button
                      className={classes.createAccBtn}
                      type="button"
                      onClick={() => {
                        this.setState({
                          formToggle: !this.state.formToggle
                        });
                      }}
                    >
                      {this.state.formToggle
                        ? "Create an account."
                        : "Login to existing account."}
                    </button>
                  </Typography>
                </Grid>
              </FormControl>
              <Typography>
                {submitSucceeded && this.state.error
                  ? this.state.error.email
                    ? this.state.error.email
                    : this.state.error.database
                    ? this.state.error.database.message.split(": ")[1]
                    : ""
                  : ""}
              </Typography>
            </form>
          );
        }}
      ></Form>
    );
  }
}

AccountForm.propTypes = {
  LOGIN_MUTATION: PropTypes.func.isRequired,
  SIGNUP_MUTATION: PropTypes.func.isRequired
};

const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];

export default compose(
  graphql(SIGNUP_MUTATION, {
    options: { refetchQueries },
    name: "SIGNUP_MUTATION"
  }),
  graphql(LOGIN_MUTATION, {
    options: { refetchQueries },
    name: "LOGIN_MUTATION"
  }),
  withStyles(styles)
)(AccountForm);
