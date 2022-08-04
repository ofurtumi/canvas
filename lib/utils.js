const EPSILON = 0.00000001

const areEqual = (one, other, epsilon = EPSILON) =>
  Math.abs(one - other) < epsilon

const toDegrees = radians => (radians * 180) / Math.PI
const toRadians = degrees => (degrees * Math.PI) / 180
const sum = arr => arr.reduce((acc, value) => acc + value, 0)
const withoutElementAtIndex = (arr, index) => [ ...arr.slice(0, index), ...arr.slice(index + 1) ]

function setNav() {
  let header = document.createElement("header");
    let nav = document.createElement("nav");
    let ul = document.createElement("ul");
    let home = document.createElement("li");
    let proj = document.createElement("li");
    let cv = document.createElement("li");
    let aHome = document.createElement("a");
    aHome.setAttribute("href", "/");
    aHome.textContent = "heim";
    let aProj = document.createElement("a");
    aProj.setAttribute("href", "/verkefni");
    aProj.textContent = "verkefni";
    let aCv = document.createElement("a");
    aCv.setAttribute("href", "/ferilskra.pdf");
    aCv.textContent = "ferilskrá";
    home.appendChild(aHome);
    proj.appendChild(aProj);
    cv.appendChild(aCv);
    ul.append(home, proj, cv);
    nav.appendChild(ul);
    header.appendChild(nav);
    document.querySelector("body").prepend(header);
}

export {
  areEqual,
  toDegrees,
  toRadians,
  sum,
  withoutElementAtIndex,
  setNav
}