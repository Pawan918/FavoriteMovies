import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Appalling',
  1: 'Horrible',
  1.5: 'Very Bad',
  2: 'Bad',
  2.5: 'Average',
  3: 'Fine',
  3.5: 'Good',
  4: 'Very Good',
  4.5: 'Great',
  5: 'MasterPiece',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const [value, setValue] = React.useState(4.5);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        border: ".05px solid #2d2d2d",
        width: 240,
        height:120,
        display: 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        flexDirection:"column",
        // justifyContent:"center",
        fontSize:30,
      }}
    >
      <Rating
        size='large'
    //   defaultValue={7}
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" color="#2d2d2d"/>}
      />
      <hr style={{border:'.05px solid #2d2d2d',height:'0.1px',width:'100%'}}></hr>
      {value !== null && (
        <Box sx={{ ml: 2,color: '#6d6d6d' }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}