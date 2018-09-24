import React, { Component } from 'react';
import Router from 'next/router';

export default function withAuth(AuthComponent) {
  return class Authenticated extends Component {
    static async getInitialProps(ctx) {
      const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);
      console.log(ctx.req.user);
      return {
        ...pageProps,
        user: ctx.req.user,
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
      const { user } = this.props;
      if (!user || !user.id) {
        Router.push('/login/google');
      }
      this.setState({ isLoading: false });
    }

    render() {
      const { isLoading } = this.state;
      return (
        <div>
          {isLoading ? (
            <div>LOADING....</div>
          ) : (
            <AuthComponent {...this.props} />
          )}
        </div>
      );
    }
  };
}
