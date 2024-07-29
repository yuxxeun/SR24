import React from "react";
import AnimatedCursor from "react-animated-cursor"

export default function Cursor() {
  return (
    <div className="App">
    <AnimatedCursor
      innerSize={10}
      outerSize={12}
      color='51, 255, 255'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
    </div>
  );
}