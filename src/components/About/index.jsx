import React, { Component } from 'react'
import './index.css'

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <div className="Web">
                    <h1 className="title title--h1 title__separate">Web:</h1>
                    <h2>React</h2>
                    <p>content</p>
                    <h2>Axios</h2>
                    <p>content</p>
                    <h2>Antd</h2>
                    <p>content</p>
                </div>
                <div className="server">
                    <h1 className="title title--h1 title__separate">Server:</h1>
                    <h2>Django</h2>
                    <p>content</p>
                    <h2>MySQL</h2>
                    <p>content</p>
                </div>
                <div className="Solution">
                    <h1 className="title title--h1 title__separate">Solution:</h1>
                    <h2>ResNext</h2>
                    <p>content</p>
                </div>
            </div>
        )
    }
}
