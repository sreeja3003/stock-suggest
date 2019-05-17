import React, { Component } from 'react';
import { Typography, Divider, Spin, Row, Col, Card, Icon } from 'antd';
import axios from 'axios';

const queryString = require('query-string');

const {Title, Paragraph, Text} = Typography;

class StockCard extends Component {


    render() {
        const props = this.props.data;
        let icon = "arrow-up";
        let iconColor = "#52c41a";
        if (props) {
            if (props.change < 0) {
                icon = "arrow-down";
                iconColor = "#eb2f96"
            }
        }


        return (

            <div>
                {props
                &&
                <Col span={8}>
                    <Card title={props.companyName} bordered={false} className="stockCard" style={{width: '100%'}}>
                        <Text strong>Amount: </Text>{Math.round(this.props.amount)} $
                        <br/>
                        <Text strong>Price: </Text>{props.latestPrice}
                        <br/>
                        <Text strong>Time: </Text>{props.latestTime}
                        <br/>
                        <Icon type={icon} style={{
                        color: iconColor,
                        fontSize: 20
                    }}/> {props.change} $
                        <Text style={{fontSize: 10}}>( {props.changePercent} % )</Text>

                    </Card>
                </Col>
                }
            </div>


        )
            ;
    }
}


export default StockCard;
