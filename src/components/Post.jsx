<<<<<<< HEAD
import React from 'react';
import Surface from './Surface.jsx';


export default function Post({ title, user, image, description }) {
    return (
        <Surface>
            <h2>{ title }</h2>
            <h3>{ user }</h3>
            {/* add image when i know where they'll be stored */}
            <p>{ description }</p>
        </Surface>
    );
}
=======
import React from 'react';
import Surface from './Surface.jsx';


export default function Post({ title, user, image, description }) {    
  return (
    <Surface>
      <h2>{ title }</h2>
      <h3>{ user }</h3>
      {/* add image when i know how they'll be stored */}
      <p>{ description }</p>
    </Surface>
  );
}
>>>>>>> 2fba7bfcc3b8cf1580b71148a0dd72770a8a547b
