import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Steps, Row, Col, Button, message, Form, InputNumber, Select, Typography, Divider } from 'antd';
import { history } from './history';

const queryString = require('query-string');

const {Title, Paragraph, Text} = Typography;


const Step = Steps.Step;
const OPTIONS = ['Ethical Investing', 'Growth Investing', 'Index Investing', 'Quality Investing', 'Value Investing'];


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
    },
};


function validateNumber(number) {
    if (number < 5000) {
        return 'error';
    }

    return 'success';
}

class App extends Component {

    state = {
        current: 0,
        showSubmit: false,
        enableBack: false,
        validateNumberStatus: 'success',
        validateOptionStatus: 'success',
        amount: 5000,
        selectedItems: [],
    };


    handleNext = () => {

        if (this.state.current === 1 && this.state.selectedItems.length > 2) {
            message.error('Select maximum of 2 Investment strategies');
            this.setState(({validateOptionStatus: 'error'}))
        }
        else if (this.state.current === 1 && this.state.selectedItems.length === 0) {
            message.error('Please select at-least 1 Investment strategy');
            this.setState(({validateOptionStatus: 'error'}))
        }
        else if (this.state.current === 0 && this.state.amount < 5000) {
            message.error('Please select valid amount');
        }
        else {
            this.setState(({validateOptionStatus: 'success'}))
            let newVal = this.state.current + 1;
            if (newVal === 2) {
                this.setState(({showSubmit: true}))
            }
            this.setState({current: (newVal)});
            this.setState({enableBack: true});
        }

    };

    handleBack = () => {

        let newVal = this.state.current - 1;
        if (newVal === 0) {
            this.setState({enableBack: false});
        }
        this.setState(({showSubmit: false}))
        this.setState({current: (newVal)});

    };

    handleSubmit = () => {
        this.setState({current: 3});
        message.info('Fetching Results');
        let query = {};
        query.amount = this.state.amount;
        query.strategy = this.state.selectedItems;

        const stringified = queryString.stringify(query);


        history.push('/results?' + stringified);

    }


    handleNumberChange = (value) => {
        this.setState({
            validateNumberStatus: validateNumber(value),
            amount: value
        });
    }

    handleOptionChange = selectedItems => {
        this.setState({selectedItems});
    };

    render() {
        const {selectedItems} = this.state;
        const formatedSelectedItems = selectedItems.join(" & ");
        const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));


        return (
            <div className="App">
                <div className="box effect1">
                    <Typography>
                        <div style={{textAlign: 'center'}}>
                            <a href="/">
                                <Title level={3}>Stock Portfolio Suggestion Engine</Title>
                            </a>
                        </div>
                        <Divider/>
                    </Typography>
                    <Row>
                        <Col span={8}>
                            <div className="stepsClass">
                                <Steps direction="vertical" size="small" current={this.state.current}>
                                    <Step title="Investment Amount" description="Investment Amount (in $)"/>
                                    <Step title="Choose Investment Strategy"
                                          description="Choose upto 2 Strategies"/>
                                    <Step title="Confirm" description="Check Input"/>
                                </Steps>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div className="contentClass">
                                <Form {...formItemLayout}>
                                    {(this.state.current === 0 &&
                                        <div>
                                            <Form.Item
                                                validateStatus={this.state.validateNumberStatus}
                                                help="Amount should be greater than $5000"
                                                style={{width: '100%'}}
                                            >
                                                <InputNumber placeholder="Enter Amount"
                                                             defaultValue={5000}
                                                             value={this.state.amount}
                                                             formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                             parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                             style={{width: '100%'}}
                                                             onChange={this.handleNumberChange}/>
                                            </Form.Item>
                                        </div>)
                                    || (this.state.current === 1 &&
                                        <div>
                                            <Form.Item
                                                help="Pick one or two Investment strategies"
                                                validateStatus={this.state.validateOptionStatus}
                                                style={{width: '100%'}}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    placeholder="Investment strategies"
                                                    value={selectedItems}
                                                    onChange={this.handleOptionChange}
                                                    style={{width: '100%'}}
                                                >
                                                    {filteredOptions.map(item => (
                                                        <Select.Option key={item} value={item}>
                                                            {item}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </div>)
                                    || (this.state.current === 2 &&
                                        <div>
                                            <Text strong>Amount: </Text> <Text>{this.state.amount}</Text>
                                            <br/>
                                            <Text strong>Investing
                                                Strategies: </Text><Text>{formatedSelectedItems}</Text>
                                        </div>)
                                    }
                                </Form>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6} offset={10}>
                            {!this.state.enableBack &&
                            <Button onClick={this.handleBack} style={{marginRight: 20}} disabled>Back</Button>
                            }

                            {this.state.enableBack &&
                            <Button onClick={this.handleBack} style={{marginRight: 20}}>Back</Button>
                            }

                            {!this.state.showSubmit &&
                            <Button type="primary" onClick={this.handleNext}>Next</Button>
                            }

                            {this.state.showSubmit &&
                            <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
                            }

                        </Col>
                    </Row>


                </div>
            </div>
        );
    }
}

export default App;
