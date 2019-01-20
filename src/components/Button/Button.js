import React, { Component } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';

export default class Button extends Component {
	render() {
		const { 
			autoFocus, 
			disabled, 
			nativeType, 
			type,
			children,
			...restProps
		} = this.props;

		const btnTypeClassname = type ? `sp-button--${type}` : '';
		const btnClassnames = classnames('sp-button', btnTypeClassname, {
			'sp-button--disabled': disabled
		});

		return (
			<button
				autoFocus={autoFocus}
				disabled={disabled}
				type={nativeType}
				className={btnClassnames}
				{...restProps}
			>
				{ children }
			</button>
		);
	}
}

Button.propTypes = {
	autoFocus: propTypes.bool,
	disabled: propTypes.bool,
	type: propTypes.string,
	nativeType: propTypes.oneOf(['button', 'submit', 'reset']),
	children: propTypes.node
	// icon: propTypes.string,
	// loading: propTypes.bool
};

Button.defaultProps = {
	autoFocus: false,
	disabled: false,
	type: '',
	nativeType: 'button',
	children: null  
	// icon: '',
	// loading: false
};
