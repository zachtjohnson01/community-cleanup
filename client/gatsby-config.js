module.exports = {
  siteMetadata: {
    title: "Community Cleanup",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-theme-apollo",
    {
      resolve: "gatsby-plugin-chakra-ui",
      options: {
        isUsingColorMode: false,
      },
    },
  ],
};
