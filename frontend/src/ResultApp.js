import React, { Component } from 'react';
import { Typography, Divider, Spin, Row, Col, Card, Table, Space, Tag } from 'antd';
import axios from 'axios';
import StockCard from './StockCard'

const queryString = require('query-string');

const {Title, Paragraph, Text} = Typography;

const columns = [
    {
        title: 'Name',
        dataIndex: 'symbol',
        key: 'name',
        render: text => <a>{text}</a>
    },
    {
        title: 'Current Price',
        dataIndex: 'latestPrice',
        key: 'curr_price',
    },
    {
        title: 'Allotment',
        dataIndex: 'allot',
        key: 'allot',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    },

];

class ResultApp extends Component {

    state = {
        amount: 0,
        strategyList: [],
        loading: true,
        strategyResponse0: [],
        strategyResponse1: [],
        amountResponse: [],
    };


    async componentDidMount() {
        const values = queryString.parse(this.props.location.search)

        this.setState({amount: parseInt(values.amount), strategyList: values.strategy})

        //API call to server to fetch information

        let postBody = {}
        postBody.Amount = parseInt(values.amount);
        postBody.Strategies = [];
        if (values.strategy.length === 2) {
            postBody.Strategies = [...values.strategy]
        }
        else {
            postBody.Strategies.push(values.strategy)
        }

        console.log(postBody);


        //let response = await axios.post(`http://localhost:5000/ret_portfol_table`, postBody)

        let response = {data: {
            "strategiesResponse": [
                [{"symbol": "MMM", "latestPrice":"100.00","allot":"6.25","total":"625.00"},
                  {"symbol": "MSFT", "latestPrice":"100.00","allot":"11.25","total":"1125.00"},
                  {"symbol": "BYND", "latestPrice":"100.00","allot":"7.50","total":"750.00"}
                ],
                [{"symbol": "NFLX", "latestPrice":"100.00","allot":"7.50","total":"750.00"},
                  {"symbol": "GOOG", "latestPrice":"100.00","allot":"10.00","total":"1000.00"},
                  {"symbol": "AMZN", "latestPrice":"100.00","allot":"7.50","total":"750.00"}
                ]
              ],
            "amountResponse": [
              {"Total":5000,"final_portfolio":5000},
              {"final_portfolio":5000,"total":5000}
            ]
          }}
        console.log(JSON.stringify(response.data.strategiesResponse[1]));

        this.setState({loading: false});
        if (response.data.strategiesResponse[1]) {
            this.setState({strategyResponse0: [...response.data.strategiesResponse[0]]});
            this.setState({strategyResponse1: [...response.data.strategiesResponse[1]]});
        }
        else {
            this.setState({strategyResponse0: [...response.data.strategiesResponse[0]]});
        }

        this.setState({amountResponse: response.data.amountResponse});

    }

    render() {
        const {strategyList} = this.state;
        let isSecondStrategyPresent = false;

        let formatedSelectedItems;
        if (strategyList.length === 2) {
            formatedSelectedItems = strategyList.join(" & ");
            console.log(formatedSelectedItems)
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

                            <Title level={3}> <a href="/">Stock Portfolio Suggestion Engine </a></Title>

                        </div>
                        <Divider/>
                    </Typography>
                    <div style={{textAlign: 'center'}}><Title level={4}>{strategyList[0]} </Title></div>
                            <Table columns ={columns} dataSource={this.state.strategyResponse0} pagination={false}/>
                    <div style={{textAlign: 'center'}}><Title level={4}>{strategyList[1]} </Title></div>
                            <Table columns ={columns} dataSource={this.state.strategyResponse1} pagination={false} />

                        </div>
                    

                </div>
        );
    }
}


export default ResultApp;
