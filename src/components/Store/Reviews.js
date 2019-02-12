import React, { Component } from 'react'
import Review from './Review';
import { Carousel } from 'antd';
export class Reviews extends Component {

    state = {
        reviews: [{ content: 'the best seller in the world', value: 3, name: 'Eliran Suissa' },
        { content: 'you need to do that much better.', value: 4, name: 'Eliran Hasin' },
        { content: 'The best proudcts I ever rent, You are The best!!', value: 5, name: 'Sean Assis' }]
    }

    renderReviews = () => {

        return this.state.reviews.map(review => (
            <div>
                <Review review={review} />
            </div>
        ))

    }
    render() {
        return (
            <div>
                <div className="header-store">
                    <h1>Wellcome To Eliran Hasin Store :)</h1>
                    <h3>You can enjoy with Eliran`s Products</h3>
                </div>
                <div>
                    <Carousel autoplay>
                        {this.renderReviews()}
                    </Carousel>,
                 </div>
            </div>
        )
    }
}

export default Reviews
