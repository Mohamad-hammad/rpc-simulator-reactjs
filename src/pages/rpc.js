import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Modal from '../components/modal';
import { useNavigate } from 'react-router-dom';
const IMAGES = [
  '/images/rock.png',
  '/images/paper.png',
  '/images/scissor.jpg',
];

const OBJECT_SIZE = 50;

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * (window.innerWidth - OBJECT_SIZE)),
  y: Math.floor(Math.random() * (window.innerHeight - OBJECT_SIZE)),
});



const getNewImage = (index1, index2) => {
  
  if(index1 === index2)
  {
    return index1;
  }
  else if((index1 === 0 && index2 === 1) || (index1 === 1 && index2 === 0)){
    //rock vs paper
    console.log("rock vs paper = paper")
    return 1;
  }
  else if((index1 === 0 && index2 === 2) || (index2 === 0 && index1 === 2)){
    //rock vs scissor
    console.log("rock vs scissor = rock")
    return 0;
  }
  else if((index1 === 1 && index2 === 2) || (index2 === 1 && index1 === 2)){
    //paper vs scissor
    console.log("scissor vs paper = scissor")
    return 2;
  }
  else
  {
    console.log("in else of getimaetg")
    return index2;
  }
  

};

const Rpc = ({totalObjects}) => {
  const [objects, setObjects] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const createObject = index => ({
      id: index,
      imageid: index%3,
      image: IMAGES[index % 3],
      position: getRandomPosition(),
      direction: { x: 2, y: 2 },
    });
    
    const interval = setInterval(() => {
      setObjects(prevObjects => {
        if (prevObjects.length < location.state.totalObject) {
          const index = prevObjects.length;
          return [...prevObjects, createObject(index)];
        }

        const newObjects = prevObjects.map(obj => {
          const newPosition = {
            x: obj.position.x + obj.direction.x,
            y: obj.position.y + obj.direction.y,
          };

          if (
            newPosition.x + OBJECT_SIZE >= window.innerWidth ||
            newPosition.x <= 0
          ) {
            obj.direction = { ...obj.direction, x: -obj.direction.x };
          }

          if (
            newPosition.y + OBJECT_SIZE >= window.innerHeight ||
            newPosition.y <= 0
          ) {
            obj.direction = { ...obj.direction, y: -obj.direction.y };
          }

          return { ...obj, position: newPosition };
        });
        let isAllSame = true;
        for(let i=1;i<newObjects.length;i++) {
          if(newObjects[i].imageid !== newObjects[0].imageid) {
            isAllSame = false;
            break;
          }
        }

        if(isAllSame) {
          clearInterval(interval);
          let winnerObject = '';
          if(newObjects[0].imgaeid === 0)
            winnerObject = 'Rock';
          else if(newObjects[0].imageid===1)
            winnerObject = 'Paper';
          else
            winnerObject = 'Scissor';
          navigate("/TheEnd", {
            state: {
                winner: winnerObject
            },
        });
          // <ModalDialog/>
        }
        for (let i = 0; i < newObjects.length; i++) {
          const obj1 = newObjects[i];

          for (let j = i + 1; j < newObjects.length; j++) {
            const obj2 = newObjects[j];

            const obj1Right = obj1.position.x + OBJECT_SIZE;
            const obj1Bottom = obj1.position.y + OBJECT_SIZE;
            const obj2Right = obj2.position.x + OBJECT_SIZE;
            const obj2Bottom = obj2.position.y + OBJECT_SIZE;

            if (
              obj1.position.x < obj2Right &&
              obj1Right > obj2.position.x &&
              obj1.position.y < obj2Bottom &&
              obj1Bottom > obj2.position.y
            ) {
              const newImageIndex = getNewImage(obj1.imageid, obj2.imageid);
              const newImage = IMAGES[newImageIndex];
              newObjects[i] = { ...obj1, image: newImage, imageid:newImageIndex };
              newObjects[j] = { ...obj2, image: newImage, imageid:newImageIndex };
            }
          }
        }

        return newObjects;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);



  return (
    <>
      {objects.map(obj => (
        <img
          key={obj.id}
          src={obj.image}
          alt="object"
          style={{
            position: 'absolute',
            left: obj.position.x,
            top: obj.position.y,
            width: OBJECT_SIZE,
            height: OBJECT_SIZE,
          }}
        />
      ))}
    </>
);
};

export default Rpc;    