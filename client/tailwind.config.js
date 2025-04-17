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
      primary:"#9B5DE5",
      secondary:"#F3E8FF",
      purple1:"#7E25C6",
      purple2:"#E6C8FF",
      accent:"#F15BB5",
      graylight:"#F7F7F8",
      graymedium:"#D1D5DB",
      graydark:"#374151",
      success:"#4ADE80"
      },
      keyframes: {
       
        
      },
      animation: {
      
      },
      
    },
  },
  plugins: [],
}

