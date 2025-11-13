/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  
      fontFamily:{
        mukta : ['Mukta' , 'san-serif'],
        outfit : ['Outfit']
      },
      backgroundImage:{
        'headerI' : "url('./header_img.png')"
      },
      fontSize: {
        'ss':['max(4.5vw , 22px)' ,
          {
            lineHeight : '5vmax'
          }
        ],
        'ss1':'max(1vw , 13px)',
        'ss2':'max(1.4vw,16px)'
      },
      animation:{
        fade:'fade 3s ',
        fade2:'fade2 2s ease'

      },
      keyframes:{
        fade:{
          '0%' :{opacity:'0'},
          '100%': {opacity:'1'}
        },
        fade2:{
          '0%' :{opacity:'0'},
          '100%': {opacity:'1'}
        }
      },
      gridTemplateColumns:{
        'list':'repeat(auto-fill,minmax(240px,1fr))',
      },
      screens: {
        'phone': '375px',
      }
    },
  },
  plugins: [],
}