document.head.insertAdjacentHTML(
  "afterend",
  `
  <style>
    #digit {
      width: .5em;
      overflow: hidden;
      font: 32px monospace;
      cursor: pointer;
    }

    #stripe {
      display: inline-block
    }

    #stripe.animate {
      transform: translate(-90%);
      transition-property: transform;
      transition-duration: 9s;
      transition-timing-function: steps(9, end));
    }
  </style>
`
);

document.body.innerHTML = `
Click below to animate:

  <div id="digit"><div id="stripe">0123456789</div></div>
`;

export default () => {
  digit.onclick = function () {
    stripe.classList.add("animate");
  };
};
