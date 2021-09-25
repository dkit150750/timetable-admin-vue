const { propertyOrdering, selectorOrdering } = require('stylelint-semantic-groups');

module.exports = {
	root: true,
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended', 'stylelint-config-prettier'],
	plugins: ['stylelint-order', 'stylelint-color-format', 'stylelint-declaration-block-no-ignored-properties'],
	rules: {
		'color-format/format': {
			format: 'hsl',
		},
		'plugin/declaration-block-no-ignored-properties': true,
		'order/order': selectorOrdering,
		'order/properties-order': propertyOrdering,
		'declaration-empty-line-before': [
			'always',
			{
				ignore: ['after-comment', 'after-declaration', 'first-nested', 'inside-single-line-block'],
			},
		],
	},
};
