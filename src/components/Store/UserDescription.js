import React, { Component } from 'react'
import Avatar from './Avatar';
import { Card } from 'antd';
const { Meta } = Card;



export class UserDescription extends Component {



    render() {

        return (
            <div>


                <div className="user-card">
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta
                            title="Eliran Hasin"
                            description={`eliranh1@gmail.com\n
                                          phone:050-7332922\n
                                          Location:Rishon Le-Ziyon`}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}

export default UserDescription
