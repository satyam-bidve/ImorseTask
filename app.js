const ovelvalues = [];   
const corevalues = [];
const ovelX = [];
const ovelY = [];
const coreX = [];
const coreY = [];
//------------------------------------------------------------------------------------ BESIC VALUES
const intersections = [];  // SHELL CIRCUMFERANCE CO-ORDINATES / MY BE LETTER AREA  
let coreCount = 0;      // hOW MANY CORE USER CREATED 
let maxWidthCore = 0;    // cORE SHELL FIT LOGIC TOTAL MAX WIDTH IS TAKING BY ALL CORES
let maxHeightCore = 0;  // cORE SHELL FIT LOGIC TOTAL MAX HEIGHT IS TAKING BY ALL CORES
let foundOvelX = 0;   // FOUNDED VALUES OF FINAL SHELL WIDTH
let foundOvelY = 0;   // FOUNDED VALUES OF FINAL SHELL hEIGHT
let major = 0;         // FOUNDED VALUES OF FINAL SHELL MAJOR LENGTH AXIS
let minor = 0;         // FOUNDED VALUES OF FINAL SHELL MINOR LENGTH AXIS
let maxXintersections = -Infinity; // MAX OF X IN INTERSECTION
let minXintersections = Infinity;  // MIN OF X IN INTERSECTION
let maxYintersections = -Infinity; // MAX OF Y IN INTERSECTION
let minYintersections = Infinity;  // MIN OF Y IN INTERSECTION
let draggRotateSwitch = true;
let isRotating = false;
//-------------------------------------------------------------------------------------------lOGICAL vALUES







//################################################################################### start of $Doc.ready
$(document).ready(function(){
  //$(document).on('dblclick', '.draggable', rotateMe);
    // lets change ovels shape here user value 
// access that ovel div -> change css property width and height
// take care of array index to match correctly with ovel x and y values :)
    // getting values x -y  from the number input for creating shell
    $("#btngetVal").click(function(){ // letter optimize this function as of cores 

    
      var box = document.getElementById("showOvels");
      var htmlString = ""
       for(var i = 1 ; i <= 6 ; i++){
           htmlString = `
                    <div class="oval" id="ovel${i}" style = "width :${$(`#ox${i}`).val()}; height :${$(`#oy${i}`).val()};"></div>
                  
                  `
                      box.innerHTML += htmlString;
                      ovelvalues.push($(`#ox${i}`).val());
                      ovelX.push($(`#ox${i}`).val());
                      ovelvalues.push($(`#oy${i}`).val());
                      ovelX.push($(`#oy${i}`).val());
                      
       };
       $("#pBar").css({"width": "30%"});
    
  })

   

    
    

  
  
// here we get the user value of how many core he wants
// Function to create table dynamically so that we get all cores diamention
 $("#btnGetCoreCount").click(function(){
  coreCount = $("#getCoreCount").val()
    var table = document.getElementById("DynamicTable");
     for(var i = 1 ; i <= coreCount ; i++){
        var row = `
                    <tr>
                    <td>core ${i}</td>
                    <td><input type="number" id="cx${i}"></td>
                    <td><input type="number" id="cy${i}"></td>
                    </tr>
                    `
            table.innerHTML += row;
     }
    })

    // now need to make this dynamic
    // function to display the created cores with given diamension
    $("#btnCreateCore").click(function(){
        var box = document.getElementById("coreBox");
        var htmlString = ""
         for(var i = 1 ; i <= coreCount ; i++){
             htmlString = `
                      <div class="core" id="core${i}" style = "width :${$(`#cx${i}`).val()}; height :${$(`#cy${i}`).val()};"></div>
                    
                    `
                        box.innerHTML += htmlString;
                        corevalues.push($(`#cx${i}`).val());
                        coreX.push($(`#cx${i}`).val());
                        corevalues.push($(`#cy${i}`).val());
                        coreY.push($(`#cy${i}`).val());
                        
         };
         $("#pBar").css({"width": "60%"});
        
        })


      

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@_Main Logic_@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   // STEP 3  on click find max area all cores - fit to the ovel --
   $("#btnfindOvel").click(function(){
    // Here we will find the max length - and width X -Y in cores sums 
    // check if the max width (sum of x) of cores is less than the width of leasr ovel 
    // same goes with height

    // sum of x core and y 
    maxWidthCore = coreX.reduce((partialSum, a) => Number(partialSum) + Number(a), 0);
    maxHeightCore = coreY.reduce((partialSum, a) => Number(partialSum)+ Number(a), 0);
    //console.log(maxWidthCore);
    //console.log(maxHeightCore);
    
    // now check the ovel which have more x than maxWidthCore && more Y than maxHeightCore
    let found = false; // to break the loop at required point
     for(let i = 0 ; i < ovelvalues.length ; i+=2){
        //console.log(ovelvalues[i]);  <- here we get the values of width 
        console.log(ovelvalues[i]);
        for(let j = 1 ; j < ovelvalues.length ;j +=2){
            if(ovelvalues[i] > maxWidthCore && ovelvalues[j] > maxHeightCore){
                 // make to sure that all cores are place  in a row horizontal or verticl it shoud fit ** page 832 problem
                 console.log(ovelvalues[j]);
                if(ovelvalues[i] > maxHeightCore && ovelvalues[j] > maxWidthCore){  
                    foundOvelX = ovelvalues[i] / 2.0;  // rx -ry radius to width and height make it half
                    foundOvelY = ovelvalues[j] / 2.0;
                    found = true;
                    console.log(ovelvalues[i] + " and "+ ovelvalues[j]);
                    
                    major  = foundOvelX > foundOvelY ? foundOvelX : foundOvelY > foundOvelX ? foundOvelY : 0; // in case to find eclkips equation corners 
                    minor = foundOvelX < foundOvelY ? foundOvelX : foundOvelY < foundOvelX ? foundOvelY : 0;  // use in minor asix as a limot for resizing core
                    break;
                }

            }
           
        }
        if(found) {
          break; // Exit the outer loop if the condition was met
      }
     }
     // if no shell is there tofit requred core
     if(foundOvelX == 0 && foundOvelY == 0){
        alert("No shell found here to fit all cores");
        location.reload(); // clear everything
     }
    
    // if shell found then change shell diamensions of found one
    $("ellipse").css({"rx":foundOvelX , ry:foundOvelY}) //<- change the eclips diamention here 


   
     $("#pBar").css({"width": "100%"});
   });
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


   // on click we create the svg of cores  dynamically inside of shell
  $("#btnCreateCoreSVG").click(function() {

    var box = document.getElementById("dynamicCores");
    var htmlString = "";
    for (var i = 1; i <= coreCount; i++) {
        htmlString += `
            <rect class="draggable" id="myRect${i}" x="${400}" y="${400}" width="${$('#cx' + i).val()}" height="${$('#cy' + i).val()}" style="fill: rgb(147, 153, 163);" onclick="resizeme()"/>
        `;
    }
    box.innerHTML += htmlString;
   
      // other functions call after the step 3 is done
    detectIntersections();
    
});

                    
//--------------------------------------||| working thodasa -----------------------------------------------------------
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% rotate V2
// function rotateMe(evt) {
//   if (evt.button === 0) { // Left mouse button
//       isRotating = true;
//       draggRotateSwitch = false;
//       // Calculate the initial rotation angle based on the mouse position
//       const core = evt.target;
//       const centerX = parseInt(core.getAttribute('x')) + core.getAttribute('width') / 2;
//       const centerY = parseInt(core.getAttribute('y')) + core.getAttribute('height') / 2;
//       const dx = evt.clientX - centerX;
//       const dy = evt.clientY - centerY;
//       const initialRotationAngle = Math.atan2(dy, dx) * 180 / Math.PI;
//       // Store the initial rotation angle for later use
//       core.dataset.initialRotationAngle = initialRotationAngle;
//   }

//   $(document).on('mousemove', function(evt) {
//     if (isRotating) {
//         const core = evt.target;
//         const centerX = parseInt(core.getAttribute('x')) + core.getAttribute('width') / 2;
//         const centerY = parseInt(core.getAttribute('y')) + core.getAttribute('height') / 2;
//         const dx = evt.clientX - centerX;
//         const dy = evt.clientY - centerY;
//         const currentRotationAngle = Math.atan2(dy, dx) * 180 / Math.PI;
//         // Calculate the rotation angle difference
//         const rotationAngleDifference = currentRotationAngle - parseFloat(core.dataset.initialRotationAngle);
//         // Apply the rotation
//       //   if (isNaN(rotationAngleDifference) || isNaN(centerX) || isNaN(centerY)) {
//       //     console.error('Invalid values for rotation:', rotationAngleDifference, centerX, centerY);
//       //     return;
//       //  }
//       // baba = getMousePosition(evt);
//       // console.log(baba.x + "--" + evt.clientX);
      

//         core.setAttribute('transform', `rotate(${rotationAngleDifference}, ${centerX}, ${centerY})`);
//     }
//   });


//   $(document).on('mouseup', function(evt) {
//     if (evt.button === 0) { // Left mouse button
//         isRotating = false;
//     }
//   });

  
// }



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% rotate v3 on buttons
function getCurrentRotationAngle(element) {
  const transform = element.getAttribute('transform');
  if (transform) {
      const match = transform.match(/rotate\(([^,]+),/);  //geting previous rotating angle
      return match ? parseFloat(match[1]) : 0;
  }
  return 0;
}

// Function to set the rotation angle
function setRotationAngle(element, angle) {
  const centerX = parseInt(element.getAttribute('x')) + element.getAttribute('width') / 2;
  const centerY = parseInt(element.getAttribute('y')) + element.getAttribute('height') / 2;
  element.setAttribute('transform', `rotate(${angle}, ${centerX}, ${centerY})`);
}

// Event listeners for the buttons
document.getElementById('increaseRotation').addEventListener('click', function() {
  console.log("babloo increase rotatoon");
  const core = document.querySelector('.draggable'); // Select the SVG element you want to rotate
  const currentAngle = getCurrentRotationAngle(core);
  const newAngle = currentAngle + 10; // Increase the angle by 10 degrees
  setRotationAngle(core, newAngle);
});

document.getElementById('decreaseRotation').addEventListener('click', function() {
  console.log("nanu decrease rotatoon");
  const core = document.querySelector('.draggable'); // Select the SVG element you want to rotate
  const currentAngle = getCurrentRotationAngle(core);
  const newAngle = currentAngle - 10; // Decrease the angle by 10 degrees
  setRotationAngle(core, newAngle);
});






  
});
//################################################################################### End of $Doc.ready


// ******************************************* resizeing core logic
function resizeme() {
    var svg = document.getElementById('dynamicCores');  // access element
  
    svg.addEventListener('mousedown', function(e) {
      var targetRect = e.target.closest('.draggable'); // GET TARGETED   rect fromothetr
      if (!targetRect) return;  // if not close here
  
      var isResizing = false; 
      var resizeDirection = '';
  
      // Get initial values and offsets for accurate resizing
      var initialX = parseFloat(targetRect.getAttribute('x'));
      var initialY = parseFloat(targetRect.getAttribute('y'));
      var initialWidth = parseFloat(targetRect.getAttribute('width'));
      var initialHeight = parseFloat(targetRect.getAttribute('height'));
      var offsetX = e.clientX - initialX;
      var offsetY = e.clientY - initialY;
  
      var rectBounds = targetRect.getBoundingClientRect();
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      
      
      // Determine resize direction based on clicked area relative to the specific core
      if (mouseX < rectBounds.left + 10 && mouseY > rectBounds.top + 10 && mouseY < rectBounds.bottom - 10) {
        resizeDirection = 'left';
      } else if (mouseX > rectBounds.right - 10 && mouseY > rectBounds.top + 10 && mouseY < rectBounds.bottom - 10) {
        resizeDirection = 'right';
      } else if (mouseY < rectBounds.top + 10) {
        resizeDirection = 'top';
      } else if (mouseY > rectBounds.bottom - 10) {
        resizeDirection = 'bottom';
      } else {
        resizeDirection = '';
      }
  
      if (resizeDirection) {
        isResizing = true;
        // Optional visual feedback: change cursor style during resize
        svg.style.cursor = 'resize'; // Adjust cursor style as needed
      }
  
      svg.addEventListener('mousemove', function(e) {
        if (!isResizing) return;
  
        mouseX = e.clientX;
        mouseY = e.clientY;
   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ main resizing logic setting limit of 30 - minor ovel letter change on requrement
        if (resizeDirection === 'left') {
            var newWidth = Math.max(30, Math.min(minor, initialWidth - (mouseX - offsetX - initialX)));
            targetRect.setAttribute('width', newWidth);
          } else if (resizeDirection === 'right') {
            var newWidth = Math.max(30, Math.min(minor, mouseX - offsetX - initialX));
            targetRect.setAttribute('width', newWidth);
          } else if (resizeDirection === 'top') {
            var newHeight = Math.max(30, Math.min(minor, initialHeight - (mouseY - offsetY - initialY)));
            targetRect.setAttribute('height', newHeight);
          } else if (resizeDirection === 'bottom') {
            var newHeight = Math.max(30, Math.min(minor, mouseY - offsetY - initialY));
            targetRect.setAttribute('height', newHeight);
          }
          
      });
  
      svg.addEventListener('mouseup', function() {
        isResizing = false;
        resizeDirection = '';
        // Optional: reset cursor style to default
        svg.style.cursor = 'default';
      });
    });
  }
  
// ********************************************************************************************* resizeing core logic



//=================================================================================================== To make core dragg
//........................................
function makeDraggable(evt) {
  
  if(draggRotateSwitch){
    
    var svg = evt.target;  //selected object in this
    var selectedElement = false;  // to test whether element is selected or not 
    svg.addEventListener('mousedown', startDrag);  // on each target track mouse events 
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
       
    
    
        // if mouse is click 
        function startDrag(evt) {
          if (evt.target.classList.contains('draggable')) { // checkimg here that the parents chile actualy contain the class list of draable
            selectedElement = evt.target;
          }
        }
            
               
            
               
        function drag(evt) {
            if (selectedElement) {  
                
      
                evt.preventDefault();
                var dragX = evt.clientX;
                var dragY = evt.clientY;
                var coord = getMousePosition(evt);  // call to function fix cursur offset
               if (isMouseCoordInIntersections(coord ,evt)) {   // shell wall code -> needs to be inside the shell then set new coord
                  selectedElement.setAttributeNS(null, "x", coord.x);
                  selectedElement.setAttributeNS(null, "y", coord.y);
                } 
                  
              }
        }

        function endDrag(evt) {
            selectedElement = null;
           
        }
    
        function getMousePosition(evt) {
            var CTM = svg.getScreenCTM();  //to chang from screen cordinate system to svg cordinate system
            return {
              x: Math.floor(evt.clientX - CTM.e) / CTM.a, // standerd formula to change cordinate offset
              y: Math.floor(evt.clientY - CTM.f) / CTM.d
            };
          }

  }
  }
//......................................................................

  //=================================================================================================== To make core dragg
  
  function isMouseCoordInIntersections(coord,evt) {
     findMaxMin(intersections);
   // checking if the selected rect width and height
   if(evt.target instanceof SVGRectElement){
     widthCX = evt.target.width.animVal.value;
     heightCY = evt.target.height.animVal.value;
   
   }
    for (let i= 0; i < intersections.length ; i++) {
      // Here we letter check the logic base on the direction it travelss
      if (coord.x >= minXintersections && coord.x <= (maxXintersections - widthCX) &&
        coord.y >= minYintersections && coord.y <= (maxYintersections - heightCY)) {
        return true; // Mouse coordinate is within one of the intersections
    }
        
    }
    return false; // Mouse coordinate is not within any of the intersections
}

function findMaxMin(coordinates) {

  coordinates.forEach(point => {
      if (point.x > maxXintersections) maxXintersections = point.x;
      if (point.x < minXintersections) minXintersections = point.x;
      if (point.y > maxYintersections) maxYintersections = point.y;
      if (point.y < minYintersections) minYintersections = point.y;
  });

  return { maxXintersections, minXintersections, maxYintersections, minYintersections };
}


  // -------------------------------------------------------------------shell Wall
  function detectIntersections() {
    const ellipse = document.getElementById('ellipse');  // get eclipse data
    const rx = foundOvelX
    const ry =foundOvelY
    const cx = 400
    const cy = 400
   
    const gridSize = 10; // stepping by 10 as grid box is 10 X 10
    
   
    for (let x = 0; x <= 800; x += gridSize) {
       for (let y = 0; y <= 800; y += gridSize) {
         const dx = x - cx;
         const dy = y - cy;
         const isInside = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) == 1; //  if pass the eclipse equation
   
         if (isInside) {
           intersections.push({ x, y });
           var box = document.getElementById("dynamicCores");
            var htmlString = `<circle cx="${x}" cy="${y}" r="2" fill="#e01010" />`; // visual check
            box.innerHTML += htmlString;
            
          }
            
        }
      }
     
    }
        
            
   //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 
   