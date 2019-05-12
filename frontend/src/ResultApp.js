import React, { Component } from 'react';
import { Steps, Row, Col, Button, message, Form, InputNumber, Select, Typography, Divider } from 'antd';

const queryString = require('query-string');

const {Title, Paragraph, Text} = Typography;

class ResultApp extends Component {

    state = {
        amount: 0,
        strategyList: [],
    };


    componentDidMount() {
        const values = queryString.parse(this.props.location.search)

        this.setState({amount: values.amount, strategyList: values.strategy})

    }

    render() {
        const {strategyList} = this.state;
        let isSecondStrategyPresent = false;

        let formatedSelectedItems;
        if (strategyList.length === 2) {
            formatedSelectedItems = strategyList.join(" & ");
            isSecondStrategyPresent = true;
        }
        else {
            formatedSelectedItems = strategyList;
        }

        return (
            <div className="ResultApp">
                <div className="box effect1">
                    <Typography>
                        <div style={{textAlign: 'center'}}>
                            <a href="/">
                                <Title level={3}>Stock Portfolio Suggestion Engine</Title>
                            </a>
                        </div>
                        <Divider/>
                    </Typography>
                    <div>
                        <Text strong>Amount: </Text> <Text>$ {this.state.amount}</Text>

                        <div style={{float: 'right'}}>
                            <Text strong>Investing Strategies: </Text><Text>{formatedSelectedItems}</Text>
                        </div>
                    </div>
                    <Divider/>

                    {!isSecondStrategyPresent &&
                    <div>
                        <Text strong>{strategyList} </Text>
                    </div>
                    }

                    {isSecondStrategyPresent &&
                    <div>
                        <Text strong>{strategyList[0]} </Text>
                        <Divider/>
                        <Text strong>{strategyList[1]} </Text>
                    </div>
                    }


                </div>
            </div>
        );
    }
}


export default ResultApp;
