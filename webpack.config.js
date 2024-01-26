module.exports = {
    module: {
        rules: [
            // SASS has different line endings than SCSS
            // and cannot use semicolons in the markup

            // SCSS has different line endings than SASS
            // and needs a semicolon after the import.
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {

                        // Requires sass-loader@^9.0.0
                        options: {
                            // This is the path to your variables
                            additionalData: "@import '@/src/sass/variables.scss';"
                        },
                    },
                ],
            },
        ],
    },
}