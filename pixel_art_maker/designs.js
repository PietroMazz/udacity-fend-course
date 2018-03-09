// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
var pixel_canvas = $('#pixel_canvas');

function makeGrid(rows, columns)
{
  pixel_canvas.find('*').remove();
  var i;
  for (i = 0; i < rows; i++)
  {
    pixel_canvas.append('<tr></tr>');
  }
  for (i = 0; i < columns; i++)
  {
    pixel_canvas.find('tr').append('<td></td>');
  }
};

function inputHeight()
{
  return Number($('#input_height').val());
};

function inputWidth()
{
  return Number($('#input_width').val());
};

$('#submit').click(function (event)
{
  event.preventDefault();
  makeGrid(inputHeight(), inputWidth());
  console.log($('td'));
  $('td').click(function (event)
  {
    $(this).css('background-color', colorSwitch());
  })
});

function colorSwitch()
{
  return String($('#colorPicker').val());
};