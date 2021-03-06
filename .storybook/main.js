const path = require('path')

module.exports = {
  stories:['../src/welcome.stories.tsx'].concat([
    '../src/**/*.stories.tsx'
  ]),
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]]
          }
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
          options: {
            shouldExtractLiteralValuesFromEnum: true, // 只列出用户自定义属性
            propFilter: (prop) => {
              if(prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
              return true
            }
          }
        }
      ]
    })
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.extensions.push('.ts', '.tsx')
    return config
  }
}