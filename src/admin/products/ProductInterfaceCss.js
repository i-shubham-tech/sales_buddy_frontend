import makeStyles from '@mui/styles/makeStyles';

const useStyle= makeStyles(()=>({

     root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems:"center",
  
   

  },


    box:{
        width:500,
        height:'auto',
        border: '1px Solid ,#38ada9',
        borderRadius:5,
        padding:1
        
    },

    title:{
          width:'100%',
          background:'#079992',
          height:70,
          borderTopRightRadius:5,
          borderTopLeftRadius:5,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
    },

    logo_style:{
        width:200,
        height:65,
        objectFit:'contain',
    },

    title_style:{
    fontSize:22,
    color:'#fff',
    fontWeight:'bold'

    },

    report_style:{
        maxWidth:100,
        height:60,
        objectFit:'cover',
    },

    image_style:{
      maxWidth:100,
      height:60,
      objectFit:'cover',
      borderRadius:8
    },

    button_style:{
            width:200,
            background:'#079992'
    },

      
    center:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
    },  
    
    helperTextStyle:{
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 400,
        fontSize:'0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        textAlign: 'left',
        marginTop: '3px',
        color: '#d32f2f'
  },
  


}));

export default useStyle;