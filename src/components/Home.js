import React, { Component, } from 'react';
import { alphabet, compounds, } from 'emoji-alphabet';
import styles from './home.scss';

const defaultString = 'Your Message Here';

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

        const chars = output.split( key );

        if( chars.length > 1 ) {

            for( let i = chars.length - 1; i > 0; i-- ) {

                const emojiChar = includeRandom && isArray ?
                    getRandom( value ) : (
                        isArray ? value[ 0 ] : value
                    );

                chars.splice( i, 0, emojiChar );

            }

        }

        output = chars.join('');

    }

    return output.split( / +/ )
        .join( '    ' )
        .replace( /F/g, 'Ⓕ' )
        .replace( /B/g, 'Ⓑ' )
        .replace( /K/g, 'Ⓚ' )
        .replace( /Q/g, 'Ⓠ' );

}

export default class Home extends Component {

    constructor() {
        super();

        this.onChange = this.onChange.bind( this );
        this.onRandomizeToggle = this.onRandomizeToggle.bind( this );
        this.onFocus = this.onFocus.bind( this );

        this.state = {
            value: '',
            output: getEmojiString( defaultString, true ),
            randomize: true,
        };
    }

    onFocus( event:Object ):void {

        const { target, } = event;

        target.focus();
        if( target.setSelectionRange ) {
            target.setSelectionRange( 0, 9999 );
        } else {
            target.select();
        }

    }

    onChange( event:Object ):void {

        this.setState({
            value: event.target.value,
            output: getEmojiString( event.target.value || defaultString, this.state.randomize )
        });

    }

    onRandomizeToggle( event:Object ):void {
        this.setState({
            randomize: event.target.checked
        }, () => {

            this.setState({
                output: getEmojiString( this.state.value || defaultString, this.state.randomize )
            });

        });

    }

    render() {
        const { value, randomize } = this.state;

        return <div>
            <div className={ styles.wrap }>
                <img
                    alt="Emoji Ransom Generator"
                    src={ require( '../../logo.jpg' ) }
                    width="100%"
                />
                <textarea
                    className={ styles.input }
                    placeholder={ defaultString }
                    onChange={ this.onChange }
                    type="text"
                    value={ this.state.value }
                />
                <label
                    className={ styles.label }
                >
                    Randomize Emojis when there's more than one option?
                    <input
                        type="checkbox"
                        checked={ randomize }
                        onChange={ this.onRandomizeToggle }
                    />
                </label>
                <div className={ styles.outputWrap }>
                    <div
                        className={ styles.outputBlind }
                        dangerouslySetInnerHTML={{
                            __html: this.state.output
                                .replace( / /g, '&nbsp;' )
                                .replace( /\n/g, '<br />' )
                        }}
                    />
                    <textarea
                        onFocus={ this.onFocus }
                        resizable={ false }
                        className={ styles.output }
                        placeholder="Emoji Text Here"
                        onChange={ this.onChange }
                        type="text"
                        value={ this.state.output }
                    />
                </div>
                <div className={ styles.howTo }>
                    Click once to select, then copy!
                </div>
            </div>
            <div className={ styles.footer }>
                <div className={ styles.footerContent }>
                    by <a href="https://twitter.com/andrewray" target="_blank">@andrewray</a> |{' '}
                    <a href="https://github.com/delvarworld/emoji-ransom-generator" target="_blank">github repository</a> |{' '}
                    <a href="https://www.coinbase.com/andrewray" target="_blank">buy me coffee? :)</a>
                </div>
            </div>
        </div>;
    }

}
