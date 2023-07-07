
module.exports = {
    entry: './src/main.jsx',
    module: {
      rules: [
        //...
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    //...
  };