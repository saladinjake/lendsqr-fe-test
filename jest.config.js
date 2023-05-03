module.exports = {
	testEnvironment: 'jsdom',
	preset: 'ts-jest',
	moduleNameMapper: {
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
		  "^.+\\.svg": "<rootDir>/tests/mocks/svgMock.jsx"
	},
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	 "modulePaths": [
      "<rootDir>/src"
    ]
	
	
};
