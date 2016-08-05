// Demo component
// this is only example component
// you can find tests in __test__ folder

import React from 'react';

// class MyComponent extends React.Component {
//     componentDidMount() {
//         // some logic here - we only test if the method is called
//     }
//     render() {
//         return (
//             <div className="my-component">
//                 <i className="icon-test"></i>
//                 <i className="icon-test"></i>
//                 <i className="icon-test"></i>
//                 <button onClick={this.props.handleClick} type="button">here is your package</button>
//             </div>
//         )
//     }
// };

export class Swapper extends Component {

    static Proptypes = {
        max: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: 0
        };
    }

    componentWillMount() {
        window.addEventListener('resize', () => this.handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        this.setState({ windowWidth: window.innerWidth });
    }

    _getMaxComponent(components) {
        return components.reduce((res, c) => {
            let defaultKey = Object.keys(c).includes('default');
            let max = c.props.max;
            if (max <= this.state.windowWidth) {
                if (res.props.max < max) {
                    return c;
                } else {
                    return res;
                }
            } else if (res.props.max === null) {
                return c;
            } else {
                return res;
            }

            if (defaultKey && res.props.max === null) {
                return c;
            }

            }, {props: {max: null}});


    }

    render() {
        const { children } = this.props;
        let components = children;
        if (Array.isArray(components)) {
            components = this._getMaxComponent(components)
        }

        return (
            <div>
                {components}
            </div>
        );
    }
}

export class Swap extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
