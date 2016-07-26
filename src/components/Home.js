import React, { Component, } from 'react';
import { alphabet, compounds, } from 'emoji-alphabet';
import styles from './home.scss';

function getRandom( arr:Array ):any {
    return arr[ Math.floor( Math.random() * arr.length ) ];
}

function getEmojiString( input:string, includeRandom:?boolean ):string {

    let output = input.toUpperCase();

    for( const key in compounds ) {

        output = output.split( key ).join( compounds[ key ] );

    }

    for( const key in alphabet ) {

        const value = alphabet[ key ];
        const isArray = value instanceof Array;

        const emojiChar = includeRandom && isArray ?
            getRandom( value ) : (
                isArray ? value[ 0 ] : value
            );

        output = output.split( key ).join( emojiChar );

    }

    return output.split( / +/ )
        .join( '&nbsp;&nbsp;&nbsp;&nbsp;' )
        .replace( /F/g, 'Ⓕ' )
        .replace( /B/g, 'Ⓑ' );

}

export default class Home extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind( this );
        this.state = {
            value: '',
            output: getEmojiString( 'Emoji Text Here' )
        };
    }

    onChange( event:Object ):void {

        this.setState({
            value: event.target.value,
            output: getEmojiString( event.target.value )
        });

    }

    render() {
        const { value, } = this.state;

        return <div>
            <img
                alt="Emoji Ransom Generator"
                src={ require( '../../logo.jpg' ) }
                width={ 1010 }
                height={ 228 }
            />
            <textarea
                className={ styles.input }
                placeholder="Emoji Text Here"
                onChange={ this.onChange }
                type="text"
                value={ this.state.value }
            />
            <div
                className={ styles.output }
                dangerouslySetInnerHTML={{
                    __html: this.state.output.replace( /\n/g, '<br />' )
                }}
            />
            <div className={ styles.footer }>
                <div className={ styles.footerContent }>
                    By <a href="https://twitter.com/andrewray" target="_blank">@andrewray</a> |{' '}
                    <a href="https://github.com/DelvarWorld/emoji-ransom-generator" target="_blank">Github Repository</a>
                </div>
            </div>
        </div>;
    }

}
