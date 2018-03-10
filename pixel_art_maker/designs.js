//pixel_canvas is the only variable I need, because I'll use it many times

var pixel_canvas = document.getElementById('pixel_canvas');

/*
I need a makeGrid() function that create a grid of the
input_width and input_height dimensions
*/

function makeGrid()
{
  //If there is any table I delete it
  while (pixel_canvas.firstChild)
  {
    pixel_canvas.removeChild(pixel_canvas.firstChild);
  };

  //Then I get the user input
  let input_width = document.getElementById('input_width').value;
  let input_height = document.getElementById('input_height').value;
  //I create a cycle for the rows
  for (let i = 0; i < input_height; i++)
  {
    const row = pixel_canvas.insertRow(i);
    // And a cycle for the columns
    for (let j = 0; j < input_width; j++)
    {
      const cell = row.insertCell(j);
      //Then for each cell I add an eventListener for left click and right click
      cell.addEventListener("click", function ()
      {
        cell.style.backgroundColor = document.getElementById('primaryColorPicker').value;
      });
      cell.addEventListener("contextmenu", function (event)
      {
        event.preventDefault();
        cell.style.backgroundColor = document.getElementById('secondaryColorPicker').value;
      });

    }
  }
}

//First of all I need to prevent submit defaul behaviour on click
document.getElementById('submit').addEventListener("click", function (event)
{
  event.preventDefault();
  makeGrid();
})