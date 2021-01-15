module.exports = {
  purge: ['src/pages/**/*.tsx', 'src/components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      IbmPlexSans: ['IBM Plex Sans'],
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      outline: ['active'],
    },
  },
  plugins: [],
};
