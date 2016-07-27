import React, { Component, } from 'react';

export default class GoogleAd extends Component {

    componentDidMount() {
        ( window.adsbygoogle = window.adsbygoogle || [] ).push({});
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return <div>
            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-1460131002512982"
                data-ad-slot="7428902199"
                data-ad-format="auto"></ins>
        </div>;
    }

}
