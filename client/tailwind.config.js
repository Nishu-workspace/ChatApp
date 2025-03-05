/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'poppins':['Poppins']
      },
      colors:{
      primary:"#00adb5",
      secondary:"#0bcbd4",
      purple1:"#7E25C6",
      purple2:"#E6C8FF"
      },
      keyframes: {
       
        
      },
      animation: {
      
      },
      
    },
  },
  plugins: [],
}

