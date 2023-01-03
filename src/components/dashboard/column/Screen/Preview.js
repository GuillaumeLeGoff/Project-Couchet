import React, { useEffect, useState } from 'react';

function Preview() {
    
  const [imageUrl, setImageUrl] = useState(`/media/preview.png?t=${Date.now()}`);
  const [isValid, setIsValid] = useState(true);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setIsValid(true)
      setImageUrl(`/media/preview.png?t=${Date.now()}`);
    }, 4000); // mettre à jour l'URL tous les 4 secondes

    return () => clearInterval(interval);
  }, []);
 
   

  return (
    <div >
       {isValid ? (
         <img src={imageUrl} onError={() => (setIsValid(false))} alt="preview" />
      ) : (
        <img src="/media/fullscreenBlack.png" alt="chargement" />
      )}
       
    </div>
  )
}

export default Preview