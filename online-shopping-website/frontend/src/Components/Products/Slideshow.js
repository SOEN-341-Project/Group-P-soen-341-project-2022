import * as React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from "react-slideshow-image";



export const Slideshow = () => {
    return (
        <div>
        <Slide easing="ease">
          <div className="each-slide">
            <div style={{'background-color': `#dd8484`}}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'background-color': `#dd8484`}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'background-color': `#dd8484`}}>
              <span>Slide 3</span>
            </div>
          </div>
        </Slide>
      </div>
    )
}