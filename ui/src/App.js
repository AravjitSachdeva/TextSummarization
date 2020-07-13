import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {

        textfield1: '',
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Text summarization using LSTMs</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
                <Form.Label>Enter Text</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Paste text to summarize" 
                  name="textfield1"
                  value={formData.textfield1}
                  onChange={this.handleChange} />

            </Form.Row>

            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Summarize text' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      <h2 className="examples_title">Example sentences similar to training data: </h2>
      <p className="para"> five-time world champion michelle kwan withdrew from the #### us figure skating
         championships on wednesday , but will petition us skating officials for the chance to compete at the #### turin olympics .</p>
      <p className="para"> us business leaders lashed out wednesday at legislation that would penalize companies for employing illegal immigrants .</p>
      <p className="para"> general motors corp. said wednesday its us sales fell ##.# percent in december and four percent in #### with 
        the biggest losses coming from passenger car sales .</p>
      <p className="para"> somalia 's feuding president and parliament speaker have agreed a compromise in a bitter row over the appropriate seat for their 
        fledgling transitional government , a yemeni official said wednesday .</p>
      <p className="para"> canada advised its nationals wednesday to avoid non-essential travel to nepal , following the resumption of a 
        maoist rebel insurgency in the himalayan kingdom .
      </p>
      </Container>

    
    );
  }
}

export default App;