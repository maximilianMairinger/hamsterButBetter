const InjectPlugin = require('webpack-inject-plugin').default;

module.exports = () => {
    return {
        entry: './src/index.ts',
        output: {
            filename: 'dist/main.bundle.js',
            chunkFilename: 'dist/[name].js',
            path: __dirname,
            publicPath: "/"
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|svg|jpeg|gif)$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.pug$/,
                    loader: ['raw-loader', 'pug-html-loader']
                }
            ]
        }
    }
};
