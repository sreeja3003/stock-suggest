import React, { Component } from 'react';
import { Typography, Divider, Spin, Row, Col, Card, Icon } from 'antd';
import axios from 'axios';

const queryString = require('query-string');

const {Title, Paragraph, Text} = Typography;


const cardPositive = {

    boxShadow: '0 3px 8px rgba(106, 204, 66, 0.65)',
};


const cardNegative = {

    boxShadow: '0 3px 8px rgba(238, 78, 90, 0.65)',
};

class StockCard extends Component {


    render() {
        let cardStyle = {};
        const props = this.props.data;
        let icon = "arrow-up";
        cardStyle = cardPositive;
        let iconColor = "#52c41a";
        if (props) {
            if (props.change < 0) {
                icon = "arrow-down";
                iconColor = "#ee4e5a"
                cardStyle = cardNegative;
            }
        }


        return (

            <div>
                {props
                &&
                <Col span={8}>
                    <Card title={props.companyName} bordered={false} className="stockCard" extra={<p>{props.symbol}</p>}
                          style={cardStyle}>
                        <Text strong>Price: </Text>{props.latestPrice}
                        <br/>
                        <Text strong>Invest Amount: </Text>{Math.round(this.props.amount)} $
                        <br/>
                        <Icon type={icon} style={{
                            color: iconColor,
                            fontSize: 20
                        }}/> {props.change} $
                        <Text style={{fontSize: 10}}>( {props.changePercent} % )</Text>
                        <br/>
                        <div style={{textAlign: 'right'}}>
                            <Text style={{fontSize: 10}}>{props.latestTime} </Text>
                        </div>

                    </Card>
                </Col>
                }
            </div>


        )
            ;
    }
}


export default StockCard;
