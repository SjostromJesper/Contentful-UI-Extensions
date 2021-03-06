import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Checkbox } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  detachExternalChangeHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      value: props.sdk.field.getValue() || '',
      show: false
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(this.onExternalChange);

    init(extension => {

      let page = extension.entry

      if (page.fields.contentType
        && (page.fields.contentType.getValue() === "LinkCollectionPage"
          || page.fields.contentType.getValue() === "LinkCollectionPageAdv")) {
        this.setState({ show: true })
        console.log("YUP")
      }
      else {
        this.setState({ show: false })
      }
    })
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = value => {
    this.setState({ value: value });
  };

  onChange = e => {
    this.setState({ value: !this.state.value }, () => this.props.sdk.field.setValue(this.state.value));
  };

  render() {
    return (<>
      <Checkbox checked={!!this.state.value} labelText="" disabled={!!!this.state.show} onChange={this.onChange.bind(this)} />
    </>)
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
