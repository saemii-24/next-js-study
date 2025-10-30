module.exports = {
	experimental: {
		useCache: true,
	},
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.namu.wiki',
				port: '',
				pathname: '/**',
				search: '',
			},
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
				port: '',
				pathname: '/**',
				search: '',
			},
		],
	},
};
