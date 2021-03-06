import * as React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert } from 'reactstrap';

import { handlePasswordResetInit, reset } from '../password-reset.reducer';

export interface IPasswordResetInitProps {
  handlePasswordResetInit: Function;
  reset: Function;
  resetPasswordSuccess: boolean;
  resetPasswordFailure: boolean;
}

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

  render() {
    const { resetPasswordSuccess, resetPasswordFailure } = this.props;
    let alertMessage = null;

    if (resetPasswordFailure) {
      alertMessage = (
        <Alert color="danger">
          <Translate contentKey="reset.request.messages.notfound">
            <strong>Email address isn't registered!</strong> Please check and try again
          </Translate>
        </Alert>
      );
    } else {
      if (resetPasswordSuccess) {
        alertMessage = (
          <Alert color="success">
            <Translate contentKey="reset.request.messages.success">Check your emails for details on how to reset your password.</Translate>
          </Alert>
        );
      } else {
        alertMessage = null;
      }
    }

    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1>
              <Translate contentKey="reset.request.title">Reset your password</Translate>
            </h1>
            <Alert color="warning">
              <p>
                <Translate contentKey="reset.request.messages.info">Enter the email address you used to register</Translate>
              </p>
            </Alert>
            {alertMessage}
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="email"
                label={translate('global.form.email')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') }
                }}
              />
              <Button color="primary" type="submit">
                <Translate contentKey="reset.request.form.button">Reset password</Translate>
              </Button>
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ passwordReset }) => ({
  resetPasswordSuccess: passwordReset.resetPasswordSuccess,
  resetPasswordFailure: passwordReset.resetPasswordFailure
});

const mapDispatchToProps = { handlePasswordResetInit, reset };

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetInit);
